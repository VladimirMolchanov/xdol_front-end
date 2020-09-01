import React, { Component, createRef  } from "react";
import Scrollbar from "react-scrollbars-custom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/src/ScrollToPlugin";
import ReactFullpage from '@fullpage/react-fullpage';


gsap.registerPlugin(ScrollToPlugin)
// // Import Swiper React components
// import SwiperCore, { Virtual, Mousewheel, Keyboard, Navigation, Pagination, Scrollbar, Parallax } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// // SwiperCore.use([mousewheel]);
// // install Virtual module
// SwiperCore.use([Virtual, Mousewheel, Keyboard, Navigation, Pagination, Scrollbar, Parallax]);



class CustomScrollBar extends Component {
  constructor(props) {
    super(props);

    this.scrollbarRef = createRef();
  }

  // scrollToTop = () => {
  //   const scrollOffsetTop = this.scrollbarRef.current.scrollTop;

  //   if (scrollOffsetTop !== 0) {
  //     this.scrollbarRef.current.scrollToTop();
  //   }
  // };

  render() {
    const { style, ...props } = this.props;
    // console.log(this.scrollbarRef)

    // this.scrollbarRef.current.scrollTo(0,1000)
    return (
      <Scrollbar 
        ref={this.scrollbarRef}
        createContext={false} 
        wrapperProps={{
          renderer: props => {
            const { elementRef, style, ...restProps } = props;
            return (
              <span
                {...restProps}
                ref={elementRef}
                style={{ ...style, right: 0, bottom: 0 }}
              />
            );
          }
        }}
        trackYProps={{
          renderer: props => {
            const { elementRef, style, ...restProps } = props;
            return (
              <span
                {...restProps}
                ref={elementRef}
                style={{
                  ...style,
                  width: '6px',
                  right: '4px'
                }}
              />
            );
          }
        }}
        onScroll={(values, prev) => {
          console.log(new Date)
          // console.log(prev)
          if( values.scrollTop - prev.scrollTop >= 0 ) {
            if(values.scrollTop <= values.clientHeight) {
              let that = this
              this.scrollbarRef.current.scrollerElement.style.overflowY = "hidden"
              gsap.to(this.scrollbarRef.current.scrollerElement, {
                duration: 0.8,
                scrollTo: { y: values.clientHeight }
              })
              setTimeout(function() {
                that.scrollbarRef.current.scrollerElement.style.overflowY = "scroll"
              }, 800)
            }
          } else {
            if(values.scrollTop < values.clientHeight) {
              let that = this
              this.scrollbarRef.current.scrollerElement.style.overflowY = "hidden"
              gsap.to(this.scrollbarRef.current.scrollerElement, {
                duration: 0.8,
                scrollTo: { y: 0 }
              })
              setTimeout(function() {
                that.scrollbarRef.current.scrollerElement.style.overflowY = "scroll"
              }, 800)
            }
          }
          
          // console.log(this.scrollbarRef.current.scrollerElement)

          // this.scrollbarRef.current.scrollTo(0,1000)
        }}
        noScrollX
        style={style} 
        trackClickBehavior = "step"
        disableTracksMousewheelScrolling={true}
        disableTrackYMousewheelScrolling ={true}
        scrollDetectionThreshold = {0}
        {...props}/>
    )
  }
}

class MyComponent extends Component {
  render() {
    return (
      // <MyScrollbar disableTracksWidthCompensation style={{ width: "100vw", height: "100vh" }} >
      //   <section style={{ background: "red", width: "100%", height: "100vh"}}></section>
      //   <section style={{ background: "blue", width: "100%", height: "100vh"}}></section>
      //   <section style={{ background: "#eee", width: "100%", height: "100vh"}}></section>
      //   <section style={{ background: "#000", width: "100%", height: "100vh"}}></section>
      // </MyScrollbar>

      <CustomScrollBar style={{ width: "100vw", height: "100vh" }}>
        <div className="jsx-1516242326" style={{ background: "red", width: "100%", height: "100vh"}}></div>
        <div className="jsx-1516242326" style={{ background: "blue", width: "100%", height: "100vh"}}></div>
        <div className="jsx-1516242326" style={{ background: "#eee", width: "100%", height: "100vh"}}></div>
        <div className="jsx-1516242326" style={{ background: "#000", width: "100%", height: "100vh"}}></div>
      </CustomScrollBar>

      // <Swiper spaceBetween={50} slidesPerView={3} virtual>
      //   {slides.map((slideContent) => {
      //     <SwiperSlide key={slideContent}>{slideContent}</SwiperSlide>;
      //   })}
      // </Swiper>

      // <ReactFullpage scrollingSpeed = {1000} scrollOverflow={true}

      // render={({ state, fullpageApi }) => {
      //   return (
      //     <ReactFullpage.Wrapper>
      //       <div className="section">
      //         <p>Section 1 (welcome to fullpage.js)</p>
      //         <button onClick={() => fullpageApi.moveSectionDown()}>
      //           Click me to move down
      //         </button>
      //       </div>
      //       <div className="section">
      //         <div style={{ background: "red", width: "100%", height: 2000}}>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //           <p>1</p>
      //         </div>
      //       </div>
      //     </ReactFullpage.Wrapper>
      //   );
      // }}
      // />
    )
  }
}
export default MyComponent;

// export default () => {
//   // Create array with 1000 slides
//   const slides = Array.from({ length: 10 }).map((el, index) => `Slide ${index + 1}`);
  
//   const items = slides.map((slideContent, index) => {
//     return (
//       <SwiperSlide key={index}>
//         <div className="main-section">{slideContent}</div>
//       </SwiperSlide>
//     )
//   })
//   console.log(items)

//   return (
//     <Swiper direction={'vertical'}  autoHeight>
//       {items}
//     </Swiper>
//   );
// };