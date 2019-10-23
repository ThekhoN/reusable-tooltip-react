import React from "react";
import styled from "styled-components/macro";
import { TooltipConsumer, defaultTooltipState } from "./tooltip-context";

const offsetY = 30;
const offsetX = 0;

// we should be able to pass our own tooltipOptions at the time of render
// These options should overwrite the default tooltipOptions
/* 
const tooltipOptions = {
    position: "bottom-right",
    lineContent: "MY OWN MFKEN CONTENT", // pass your own content
    contentPropsKey: "content" // name of props of the ComposedComponent which holds the textContent(string) 
};
return (
    withTooltip(<TextContainer content={content} />, tooltipOptions)
)
*/

const withToolTipHOC = (ComposedComponent, tooltipOptions) => {
  class WithToolTip extends React.Component {
    state = {
      shouldHaveTooltip: false
    };
    handleMouseOver({ event, updateTooltip }) {
      const updatedMousePosY = event.clientY + offsetY;
      const updatedMousePosX = event.clientX + offsetX;

      // priority
      // customComponent > listData > lineContent
      if (tooltipOptions.customComponent) {
        updateTooltip({
          show: true,
          offsetLeft: updatedMousePosX,
          offsetTop: updatedMousePosY,
          customComponent: tooltipOptions.customComponent
        });
      } else if (
        tooltipOptions.listData &&
        Array.isArray(tooltipOptions.listData)
      ) {
        updateTooltip({
          show: true,
          offsetLeft: updatedMousePosX,
          offsetTop: updatedMousePosY,
          listData: tooltipOptions.listData
        });
      } else {
        let lineContentString = tooltipOptions.lineContent;
        if (!lineContentString && tooltipOptions.contentPropsKey) {
          lineContentString =
            ComposedComponent.props[tooltipOptions.contentPropsKey];
        }
        updateTooltip({
          show: true,
          offsetLeft: updatedMousePosX,
          offsetTop: updatedMousePosY,
          lineContent: lineContentString || ""
        });
      }
    }
    handleMouseLeave({ event, updateTooltip }) {
      updateTooltip(defaultTooltipState.tooltip);
    }
    checkShouldHaveTooltip() {
      if (
        this.contentWidthMeasurerRef &&
        this.contentWidthMeasurerRef.parentNode.offsetWidth >
          this.contentWidthMeasurerRef.offsetWidth
      ) {
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
        !tooltipOptions.lineContent
      ) {
        throw "You must pass one of the options customComponent OR listData OR lineContent while calling withTooltip";
      }
      this.checkShouldHaveTooltip();
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
                    {ComposedComponent.props.content}
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
              {ComposedComponent.props.content}
            </ContentWidthMeasurer>
          </React.Fragment>
        );
      }
    }
  }
  return <WithToolTip />;
};

const WithTooltipWrapper = styled.div``;

const ContentWidthMeasurer = styled.span`
  visibility: hidden;
  position: absolute;
  border: 1px solid red;
  top: -9999px;
  left: -9999px;
`;

export default withToolTipHOC;
