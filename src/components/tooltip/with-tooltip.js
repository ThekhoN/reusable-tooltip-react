import React from "react";
import styled from "styled-components/macro";
import { TooltipConsumer, defaultTooltipState } from "./tooltip-context";

const offsetY = 16; // 30
const offsetX = 0;

// we should be able to pass our own tooltipOptions at the time of render
// These options should overwrite the default tooltipOptions
/* 
const tooltipOptions = {
    position: "bottom-right",
    lineContent: "MY OWN CONTENT", // pass your own content
    contentPropsKey: "content" // name of props of the ComposedComponent which holds the textContent(string) 
};
return (
    withTooltip(<TextContainer content={content} />, tooltipOptions)
)
*/

const withToolTipHOC = (ComposedComponent, tooltipOptions) => {
  class WithToolTip extends React.Component {
    state = {
      shouldHaveTooltip: false,
      shouldHaveDynamicPositioning: true
    };
    handleMouseOver({ event, updateTooltip }) {
      let absolutePositionOfElementX = 0;
    	let windowInnerWidth = 0;
    	let shouldHaveDynamicPositioning = false;
    	let windowPageXOffset = 0; // scroll offset value
    	if(this.state.shouldHaveDynamicPositioning) {
    		// dynamic positioning ~ bottom-right
    		windowPageXOffset = window.pageXOffset;
    		windowInnerWidth = window.innerWidth + windowPageXOffset;
        absolutePositionOfElementX = event.target.getBoundingClientRect().x + windowPageXOffset;
        console.log("absolutePositionOfElementX/windowInnerWidth * 100: ", absolutePositionOfElementX/windowInnerWidth * 100);
    		// exceeds 90% of screen
    		if(absolutePositionOfElementX/windowInnerWidth * 100 > 75 /* 90 */ || absolutePositionOfElementX > windowInnerWidth) {
    			shouldHaveDynamicPositioning = true;
    		}
    	}
      
      const updatedMousePosY = event.clientY + offsetY;
      const updatedMousePosX = event.clientX + offsetX;

      // priority
      // customComponent > listData > lineContent
      if (tooltipOptions.customComponent) {
        updateTooltip({
          show: true,
          offsetLeft: updatedMousePosX,
          offsetTop: updatedMousePosY,
          customComponent: tooltipOptions.customComponent,
          type: shouldHaveDynamicPositioning ? "bottom-right" : "default"
        });
      } else if (
        tooltipOptions.listData &&
        Array.isArray(tooltipOptions.listData)
      ) {
        updateTooltip({
          show: true,
          offsetLeft: updatedMousePosX,
          offsetTop: updatedMousePosY,
          listData: tooltipOptions.listData,
          type: shouldHaveDynamicPositioning ? "bottom-right" : "default"
        });
      } else {
        let lineContentString = tooltipOptions.lineContent;
        if (!lineContentString && tooltipOptions.contentPropsKey) {
          lineContentString =
            ComposedComponent.props[tooltipOptions.contentPropsKey];
        }
        updateTooltip({
          show: true,
          offsetLeft: shouldHaveDynamicPositioning ? (absolutePositionOfElementX - (event.target.offsetWidth) - windowPageXOffset) : updatedMousePosX,
          offsetTop: updatedMousePosY,
          lineContent: lineContentString || "",
          type: shouldHaveDynamicPositioning ? "bottom-right" : "default"
        });
      }
    }
    handleMouseLeave({ event, updateTooltip }) {
      updateTooltip(defaultTooltipState.tooltip);
    }
    checkShouldHaveTooltip() {
      // added offset of 5px
      // case wherein tooltip was showing despite the content being fully visible
      if (this.contentWidthMeasurerRef && (this.contentWidthMeasurerRef.parentNode.offsetWidth + 5) > this.contentWidthMeasurerRef.offsetWidth) {
        this.setState({
          shouldHaveTooltip: false
        });
      } else {
        this.setState({
          shouldHaveTooltip: true
        });
      }
    }
    componentDidMount() {
      // make sure one of the vital options are passed
      if (
        !tooltipOptions.customComponent &&
        !tooltipOptions.listData &&
        !tooltipOptions.lineContent &&
        !tooltipOptions.contentPropsKey
      ) {
        throw "You must pass one of the options customComponent OR listData OR lineContent while calling withTooltip";
      }
      this.checkShouldHaveTooltip();
    }
    getRenderContent = () => {
      if ((ComposedComponent && typeof ComposedComponent === "string") || (ComposedComponent && typeof (ComposedComponent).toString() === "string")) {
        return ComposedComponent;
      }
      if (ComposedComponent && ComposedComponent.props && ComposedComponent.props.content) {
        return ComposedComponent.props.content;
      }
    }
    render() {
      let contentWidthMeasurerStyle = {};
      if (tooltipOptions.fontSize) {
        contentWidthMeasurerStyle = {
          fontSize: `${tooltipOptions.fontSize}px`
        };
      }
      const withToolTipClassName = this.state.shouldHaveTooltip
        ? "should-have-tooltip"
        : "";

      if (
        this.state.shouldHaveTooltip ||
        tooltipOptions.listData ||
        tooltipOptions.customComponent
      ) {
        return (
          <TooltipConsumer>
            {tooltipProps => {
              return (
                <WithTooltipWrapper
                  className={withToolTipClassName}
                  onMouseOver={e => {
                    this.handleMouseOver({
                      event: e,
                      updateTooltip: tooltipProps.updateTooltip
                    });
                  }}
                  onMouseLeave={e => {
                    this.handleMouseLeave({
                      event: e,
                      updateTooltip: tooltipProps.updateTooltip
                    });
                  }}
                >
                  {ComposedComponent}
                  <ContentWidthMeasurer
                    style={contentWidthMeasurerStyle}
                    ref={contentWidthMeasurerRef =>
                      (this.contentWidthMeasurerRef = contentWidthMeasurerRef)
                    }
                  >
                    {this.getRenderContent()}
                  </ContentWidthMeasurer>
                </WithTooltipWrapper>
              );
            }}
          </TooltipConsumer>
        );
      } else {
        return (
          <React.Fragment>
            {ComposedComponent}
            <ContentWidthMeasurer
              style={contentWidthMeasurerStyle}
              ref={contentWidthMeasurerRef =>
                (this.contentWidthMeasurerRef = contentWidthMeasurerRef)
              }
            >
              {this.getRenderContent()}
            </ContentWidthMeasurer>
          </React.Fragment>
        );
      }
    }
  }
  return <WithToolTip />;
};

const WithTooltipWrapper = styled.div`
  &.should-have-tooltip {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const ContentWidthMeasurer = styled.span`
  visibility: hidden;
  position: absolute;
  border: 1px solid red;
  top: -9999px;
  left: -9999px;
`;

export default withToolTipHOC;
