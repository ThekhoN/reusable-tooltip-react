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
      const updatedMousePosY = event.clientY + offsetY;
      const updatedMousePosX = event.clientX + offsetX;

      let absolutePositionOfElementX = 0;
      let windowInnerWidth = 0;
      let shouldHaveDynamicPositioning = false;
      let windowPageXOffset = 0; // scroll offset value
      if (this.state.shouldHaveDynamicPositioning) {
        // dynamic positioning ~ bottom-right
        windowPageXOffset = window.pageXOffset;
        windowInnerWidth = window.innerWidth + windowPageXOffset;
        absolutePositionOfElementX = event.target.getBoundingClientRect().x + windowPageXOffset;

        // handles the case wherein the hovered elements is located to the extreme right edge of the screen
        if (absolutePositionOfElementX / windowInnerWidth * 100 > 65 || windowInnerWidth < 1024) {
          shouldHaveDynamicPositioning = true;
        }
      }

      const paddingForToolDisplayer = 34; // may vary based on styling of tooltipDisplayer, pass via props?
      let idealXPositioning = absolutePositionOfElementX;
      let adjustedXPosOffset = 0;
      let actuaXPositioning = idealXPositioning + this.contentWidthMeasurerRef.offsetWidth;
      // should the tooltipDisplayer overshoot the edge of the screen
      if (actuaXPositioning > windowInnerWidth) {
        const shouldStickToTheExtremeRightOfScreen = false;
        // flag to position tooltipDisplayer at the edge of the screen
        // otherwise position arrow of tooltipDisplayer at the center of hovered element
        adjustedXPosOffset = (actuaXPositioning - windowInnerWidth);
        if (shouldStickToTheExtremeRightOfScreen) {
          adjustedXPosOffset += paddingForToolDisplayer;
        } else {
          adjustedXPosOffset += (event.target.offsetWidth / 2);
        }
      } else {
        adjustedXPosOffset -= (event.target.offsetWidth / 2 - this.contentWidthMeasurerRef.offsetWidth)
      }
      let finalOffsetLeft = shouldHaveDynamicPositioning ? (idealXPositioning - (adjustedXPosOffset) - windowPageXOffset) : updatedMousePosX

      // priority
      // customComponent > lineContent
      if (tooltipOptions.customComponent) {
        updateTooltip({
          show: true,
          offsetLeft: finalOffsetLeft,
          offsetTop: updatedMousePosY,
          customComponent: tooltipOptions.customComponent,
          type: shouldHaveDynamicPositioning ? "bottom-right" : "default"
        });
      } else {
        let lineContentString = tooltipOptions.lineContent;
        if (!lineContentString && tooltipOptions.contentPropsKey) {
          lineContentString =
            ComposedComponent.props[tooltipOptions.contentPropsKey];
        }

        if (shouldHaveDynamicPositioning) {
          finalOffsetLeft += paddingForToolDisplayer;
        }

        updateTooltip({
          show: true,
          offsetLeft: finalOffsetLeft,
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
        !tooltipOptions.lineContent &&
        !tooltipOptions.contentPropsKey
      ) {
        throw new Error("You must pass one of the options customComponent OR lineContent while calling withTooltip");
      }
      this.checkShouldHaveTooltip();
    }
    getRenderContent = () => {
      // handle width calculation for customComponent
      if (tooltipOptions && tooltipOptions.customComponent && typeof tooltipOptions.customComponent === "function") {
        return <tooltipOptions.customComponent />
      }
      if ((ComposedComponent && typeof ComposedComponent === "string") || (ComposedComponent && typeof (ComposedComponent).toString() === "string")) {
        return ComposedComponent;
      }
      if (ComposedComponent && ComposedComponent.props && ComposedComponent.props.content) {
        return ComposedComponent.props.content;
      }
    }
    handleRenderForShowingTooltip = ({ withToolTipClassName, tooltipProps, contentWidthMeasurerStyle }) => {
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
      )
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
        this.state.shouldHaveTooltip || tooltipOptions.customComponent
      ) {
        if (!tooltipOptions.customComponent) {
          return (
            <TooltipConsumer>
              {tooltipProps => {
                return this.handleRenderForShowingTooltip({
                  tooltipProps,
                  withToolTipClassName,
                  contentWidthMeasurerStyle
                })
              }}
            </TooltipConsumer>
          );
        } else {
          return (
            <TooltipConsumer>
              {tooltipProps => {
                return (
                  <div style={{ "display": "flex" }}>
                    {this.handleRenderForShowingTooltip({
                      tooltipProps,
                      withToolTipClassName,
                      contentWidthMeasurerStyle
                    })}
                  </div>
                );
              }}
            </TooltipConsumer>
          );
        }
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


