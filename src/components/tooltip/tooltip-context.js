import React from "react";
const { Provider, Consumer } = React.createContext();

export { Consumer as TooltipConsumer };

export const defaultTooltipState = {
  tooltip: {
    show: false,
    type: "default", // "error", "warning", "success"
    disabled: false,
    offsetLeft: 0,
    offsetTop: 0,
    position: "",
    listData: [],
    title: "",
    lineContent: "",
    // constrain tooltip width and height
    toolTipContainerWidth: 0,
    toolTipContainerHeight: 0
  }
};

const TooltipProvider = (props) => {
  const [tooltipState, setTooltipState] = React.useState(defaultTooltipState);

  const updateTooltip = payload => {
    let updatedTooltipState = { ...tooltipState };
    for (let key in payload) {
      updatedTooltipState[key] = payload[key];
    }
    setTooltipState(updatedTooltipState);
  };

  return (
    <Provider
      value={{
        tooltip: tooltipState,
        updateTooltip: updateTooltip
      }}
    >
      {props.children}
    </Provider>
  );
}

export default TooltipProvider;
