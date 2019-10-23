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
                {tooltip.customComponent}
              </TooltipDisplayWrapper>
            );
          } else {
            return (
              <TooltipDisplayWrapper style={style}>
                <tooltip.customComponent />
              </TooltipDisplayWrapper>
            );
          }
        } else if (tooltip.listData && tooltip.listData.length) {
          return (
            <TooltipDisplayWrapper style={style}>
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
              {tooltip.lineContent}
            </TooltipDisplayWrapper>
          );
        }
      }}
    </TooltipConsumer>
  );
};

const TooltipDisplayWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  border: 1px solid #ccc;
  border-radius: 3px;
  background: white;
  padding: 0.3rem;
`;

export default TooltipDisplayer;