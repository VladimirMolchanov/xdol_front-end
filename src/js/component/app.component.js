import React, { Component, createRef  } from "react";
import Scrollbar from "react-scrollbars-custom";

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
        onScroll={values => {
          console.log(this.scrollbarRef.current)
          // console.log(this.scrollbarRef.current.scrollerElement)

          // this.scrollbarRef.current.scrollTo(0,1000)
        }}
        noScrollX
        style={style} 
        trackClickBehavior = "step"
        disableTracksMousewheelScrolling 
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
    )
  }
}
export default MyComponent;