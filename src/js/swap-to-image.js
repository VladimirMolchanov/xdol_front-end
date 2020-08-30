import $ from 'jquery';
import { gsap } from "gsap";
import * as THREE from './three.module.js';

/* Utils ------------------------------------------ */
const textureLoader = new THREE.TextureLoader()

/* Scene Subjects ----------------------------------------- */
class PlaneSubject {
    textures = []
    raycaster = new THREE.Raycaster()
    scene = null

    tween = null
    queuedSwap = null

    currentIndex = 0
    mode = null
    tweenValues = null

    constructor(options) {
        var n = this
        this.mode = void 0 !== options.mode ? options.mode : "horizontal"
        this.uniforms = this.createTextures(options)
        this.uniforms = {
            ...this.uniforms,
            dispFactor: {
                type: 'f',
                value: 0.0
            },
            direction: {
                type: 'f',
                value: 0.0
            },
            opacity: {
                type: 'f',
                value: 1.0
            },
        }

        const geometry = new THREE.PlaneBufferGeometry(1, 0.7)
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv; 

                void main() {
                    vUv = uv;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                precision mediump float;

                varying vec2 vUv;

                uniform sampler2D map1;
                uniform sampler2D map2;
                uniform sampler2D dispMap;

                uniform float dispFactor;
                uniform float direction;
                uniform float opacity;

                void main() {
                    float displacementFactor = 1.0;

                    vec4 dispTexel = texture2D(dispMap, vUv);
                    vec4 mapTexel1 = vec4(0.0);
                    vec4 mapTexel2 = vec4(0.0);

                    float disp1 = dispTexel.r * displacementFactor * dispFactor;
                    float disp2 = dispTexel.r * displacementFactor * (1.0 - dispFactor);

                    if (direction < 0.0) {
                        mapTexel1 = texture2D(map1, vec2(vUv.x, vUv.y + disp1));
                        mapTexel2 = texture2D(map2, vec2(vUv.x, vUv.y - disp2));
                    } else if (direction < 0.5) {
                        mapTexel1 = texture2D(map1, vec2(vUv.x + disp1, vUv.y));
                        mapTexel2 = texture2D(map2, vec2(vUv.x - disp2, vUv.y));
                    } else if (direction > 0.5) {
                        mapTexel1 = texture2D(map1, vec2(vUv.x, vUv.y - disp1));
                        mapTexel2 = texture2D(map2, vec2(vUv.x, vUv.y + disp2));
                    }

                    vec4 color = mix(mapTexel1, mapTexel2, dispFactor);

                    color.a *= opacity;

                    gl_FragColor = color;
                }
            `,
            uniforms: this.uniforms
        })
        material.transparent = true
        const mesh = new THREE.Mesh(geometry, material)

        options.scene.add(mesh)

        this.scene = options.scene
        this.mesh = mesh

        var i = this.createTextures(options);
        Object.keys(i).forEach(function(t) {
            n.textures.push(i[t])
        })
        this.tweenValues = {
            swapProgress: 0
        }
        this.tween = gsap.to(this.tweenValues, {
            swapProgress: 1,
            onUpdate: () => {
                n.uniforms.dispFactor.value = n.tweenValues.swapProgress
            },
            ease: "expo.out",
            duration: options.duration
        }).pause()
    }

    update(delta, time) {}

    createTextures = (t) => {
        var e = this,
            n = {};
        
        t.images.forEach(function(t, r) {
            n["map" + (r + 1)] = {
                type: 't',
                value: textureLoader.load(t)
            }
        })
        n.dispMap = {
            type: 't',
            value: textureLoader.load(t.displacementMap)
        }
        return n
    }

    swapToImage = (t) => {
        t !== this.currentIndex && (t > this.currentIndex && "vertical" === this.mode ? this.uniforms.direction.value = 1 : t < this.currentIndex && "vertical" === this.mode ? this.uniforms.direction.value = -1 : "horizontal" === this.mode && (this.uniforms.direction.value = 0), this.swap(this.textures[this.currentIndex], this.textures[t]), this.currentIndex = t)
    }

    swap = (t, e) => {
        var n = this;
        this.uniforms.map1 = t
        this.uniforms.map2 = e
        n.tweenValues.swapProgress = 0
        if(!this.tween.isActive()) {
            this.tween.restart().play().then(() => {
                n.tweenValues.swapProgress = 0
                n.uniforms.map1 = e
            })
        } else {
            this.tween.pause()
            this.tween.restart().play()
        }
    }

    resizeHandler = (w,h) => {
        this.mesh.geometry.parameters.width = 1
        this.mesh.geometry.parameters.height = h/w
    }
}

/* Scene Manager ------------------------------------------------ */
class SceneManager {
    clock = new THREE.Clock()
    mouse = new THREE.Vector2()

    buildScene = () => {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#111')

        return scene
    }

    buildRender = ({ width, height }) => {
        const { canvas } = this

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true
        })
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
        renderer.setPixelRatio(DPR)
        renderer.setSize(width, height)

        renderer.gammaInput = true
        renderer.gammaOutput = true

        return renderer
    }

    buildCamera = ({ width, height }) => {
        const aspectRatio = width / height
        const fieldOfView = 35
        const nearPlane = 1
        const farPlane = 10000
        const camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        )
        camera.position.z = 1

        return camera
    }

    createSceneSubjects = options => {
        const sceneSubjects = [new PlaneSubject(options)]

        return sceneSubjects
    }

    constructor(options) {
        this.canvas = options.canvas
        this.screenDimentions = {
            width: this.canvas.width,
            height: this.canvas.height
        }

        this.scene = this.buildScene()
        this.renderer = this.buildRender(this.screenDimentions)
        this.camera = this.buildCamera(this.screenDimentions)
        options.scene = this.scene
        this.sceneSubjects = this.createSceneSubjects(options)
    }

    update() {
        const delta = this.clock.getDelta()
        const elapsed = this.clock.getElapsedTime()

        this.sceneSubjects.map(s => (s.update ? s.update(delta, elapsed) : null))

        this.renderer.render(this.scene, this.camera)
    }

    resizeHandler() {
        const { width, height } = this.canvas

        this.screenDimentions = { width, height }

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(width, height)

        this.sceneSubjects.map(s =>
            s.resizeHandler ? s.resizeHandler(width,height) : null
        )
    }

    swapToImage(id) {
        this.sceneSubjects.map(s =>
            s.swapToImage ? s.swapToImage(id) : null
        )
    }
}

/* Init stuff */
const sceneManager = new SceneManager({
    canvas: document.getElementById('canvas'),
    images: ["./uploads/image.png", "./uploads/1.jpg", "./uploads/2.jpg", "./uploads/3.jpg", "./uploads/4.jpg"],
    displacementMap: "/uploads/clouds.jpg",
    duration: 0.750,
})

const resizeCanvas = () => {
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    sceneManager.resizeHandler()
}

const bindEvents = () => {
    window.onresize = resizeCanvas
    resizeCanvas()
}

const render = () => {
    window.requestAnimationFrame(render)
    sceneManager.update()
}

bindEvents()
render()


$(document).ready(function() {
    $("#img1").on("mouseover", function(e) {
        sceneManager.swapToImage(0)
    })
    $("#img2").on("mouseover", function(e) {
        sceneManager.swapToImage(1)
    })
    $("#img3").on("mouseover", function(e) {
        sceneManager.swapToImage(2)
    })
    $("#img4").on("mouseover", function(e) {
        sceneManager.swapToImage(3)
    })
    $("#img5").on("mouseover", function(e) {
        sceneManager.swapToImage(4)
    })
    $("#img6").on("mouseover", function(e) {
        sceneManager.swapToImage(1)
    })
});