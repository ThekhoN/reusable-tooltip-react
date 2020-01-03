import React from "react";
import { TooltipConsumer } from "./tooltip-context";
import styled from "styled-components/macro";

// Features - TODO - tooltipProps.tooltip
/*******************************************************************/
// based on lineContent, list, title, customComponent
/*******************************************************************/
// should render
// # lineContent (DEFAULT)
// # list
// # title (if defined)

/****************************************/
// based on position
/****************************************/
// should be customisable for
// # bottom-left
// # bottom-right (DEFAULT)
// # top-left
// # top-right

/****************************************/
// based on type
/****************************************/
// should be customisable for
// # normal
// # warning
// # error
// # success

/*******************************************************************/
// based on toolTipContainerWidth and toolTipContainerHeight
/*******************************************************************/
// should be able to constrain width and height of tooltip display

const TooltipDisplayer = () => {
  return (
    <TooltipConsumer>
      {tooltipProps => {
        const { tooltip } = tooltipProps;
        if (!tooltip.show || tooltip.disabled) {
          return null;
        }
        const style = {
          top: `${tooltip.offsetTop}px`,
          left: `${tooltip.offsetLeft}px`
        };
        if (tooltip.customComponent) {
          if (typeof tooltip.customComponent === "string") {
            return (
              <TooltipDisplayWrapper style={style}>
                <TooltipArrow />
                {tooltip.customComponent}
              </TooltipDisplayWrapper>
            );
          } else {
            return (
              <TooltipDisplayWrapper style={style}>
                <TooltipArrow />
                <tooltip.customComponent />
              </TooltipDisplayWrapper>
            );
          }
        } else if (tooltip.listData && tooltip.listData.length) {
          return (
            <TooltipDisplayWrapper style={style}>
              <TooltipArrow />
              <ul>
                {tooltip.listData.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TooltipDisplayWrapper>
          );
        } else {
          return (
            <TooltipDisplayWrapper style={style}>
              <TooltipArrow className={tooltip.type} />
              <LineContentWrapper>{tooltip.lineContent}</LineContentWrapper>
            </TooltipDisplayWrapper>
          );
        }
      }}
    </TooltipConsumer>
  );
};

const LineContentWrapper = styled.span`
  white-space: nowrap;
`;

const TooltipArrow = styled.div`
  position: relative;

  &.default:after {
    left: -10px;
  }

  &.bottom-right:after {
    right: -10px;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: -22px;
    /* right: -10px; */
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-right: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    transform: rotate(-135deg);
  }
`;

const TooltipDisplayWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  padding: 1rem;
  border: 1px solid #f2f2f2;
  background: white;
  /* width: 100%;
  min-width: 220px;
  max-width: 320px; */
  border-radius: 3px;
  font-size: 12px;
  z-index: 7;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.14902), 0 0 1px rgba(0, 0, 0, 0.04706);
  font-weight: bold;
`;

export default TooltipDisplayer;
