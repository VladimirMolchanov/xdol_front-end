np = function() {
    function t(e) {
        var n = this;
        ! function(t, e) {
            if(!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, t), this.textures = [], this.displacementMap = null, this.currentIndex = 0, this.queuedSwap = null, this.mode = void 0 !== e.mode ? e.mode : "horizontal", this.autoRender = e.autoRender, this.element = e.canvas, this.context = this.element.getContext("webgl") || this.element.getContext("experimental-webgl"), this.aspect = e.aspect, this.pixelRatio = e.maxPixelRatio ? Math.min(e.maxPixelRatio, window.devicePixelRatio) : 1;
        var r = this.context;
        this.programInfo = ep.createProgramInfo(r, [Zf.a, Qf.a]);
        this.bufferInfo = ep.createBufferInfoFromArrays(r, {
            position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
            texcoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]
        }), ep.resizeCanvasToDisplaySize(r.canvas, this.pixelRatio), r.viewport(0, 0, r.canvas.width, r.canvas.height);
        var i = this.createTextures(e);
        Object.keys(i).forEach(function(t) {
            n.textures.push(i[t])
        }), this.uniforms = {
            opacity: 1,
            scale: 1,
            direction: 0,
            map1: i.map1,
            map2: i.map2,
            displacementMap: i.dispMap,
            swapProgress: 0
        }, r.useProgram(this.programInfo.program), ep.setBuffersAndAttributes(this.context, this.programInfo, this.bufferInfo), e.transparent && (r.enable(r.BLEND), r.blendFunc(r.SRC_ALPHA, r.ONE)), this.tween = new Vf.Tween, this.tweenValues = {
            swapProgress: 0
        }
    }
    var e, n, r;
    return e = t, (n = [{
        key: "setSize",
        value: function(t) {
            var e = t / this.aspect;
            this.element.width = t * this.pixelRatio, this.element.height = e * this.pixelRatio, this.element.style.width = t + "px", this.element.style.height = e + "px", this.context.viewport(0, 0, this.context.canvas.width, this.context.canvas.height)
        }
    }, {
        key: "setScale",
        value: function(t) {
            this.uniforms.scale = t
        }
    }, {
        key: "setOpacity",
        value: function(t) {
            this.uniforms.opacity = t
        }
    }, {
        key: "createTextures",
        value: function(t) {
            var e = this,
                n = {};
            return t.images.forEach(function(t, r) {
                n["map" + (r + 1)] = {
                    src: Yf[t],
                    flipY: !0,
                    wrap: e.context.CLAMP_TO_EDGE,
                    min: e.context.LINEAR_MIPMAP_LINEAR
                }
            }), n.dispMap = {
                src: Yf[t.displacementMap],
                flipY: !0,
                min: this.context.LINEAR_MIPMAP_LINEAR
            }, ep.createTextures(this.context, n)
        }
    }, {
        key: "swapToImage",
        value: function(t) {
            t !== this.currentIndex && (t > this.currentIndex && "vertical" === this.mode ? this.uniforms.direction = 1 : t < this.currentIndex && "vertical" === this.mode ? this.uniforms.direction = -1 : "horizontal" === this.mode && (this.uniforms.direction = 0), this.swap(this.textures[this.currentIndex], this.textures[t]), this.currentIndex = t)
        }
    }, {
        key: "swap",
        value: function(t, e) {
            var n = this;
            this.uniforms.map1 = t, this.uniforms.map2 = e, this.tweenValues.swapProgress = 0, this.tween.stop().reset(this.tweenValues).to({
                swapProgress: 1
            }, 750).easing(Vf.Easing.Exponential.Out).onUpdate(function() {
                n.uniforms.swapProgress = n.tweenValues.swapProgress, n.autoRender || n.render()
            }).onComplete(function() {
                n.uniforms.map1 = e, n.uniforms.swapProgress = 0, null !== n.queuedSwap && (n.swapToImage(n.queuedSwap), n.queuedSwap = null)
            }).start()
        }
    }, {
        key: "render",
        value: function() {
            this.context.clearColor(0, 0, 0, 0), this.context.clear(this.context.COLOR_BUFFER_BIT), ep.setUniforms(this.programInfo, this.uniforms), ep.drawBufferInfo(this.context, this.bufferInfo)
        }
    }, {
        key: "update",
        value: function() {
            this.autoRender && this.render()
        }
    }]) && tp(e.prototype, n), r && tp(e, r), t
}();


var test = new np({
    canvas: i.element.querySelector("canvas"),
    aspect: 780 / 743,
    maxPixelRatio: 1.5,
    images: o,
    displacementMap: "/resources/common/clouds.jpg",
    mode: "vertical",
    transparent: !0,
    autoRender: !0
})