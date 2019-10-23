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
    // position
    position: "",
    // content
    listData: [],
    title: "",
    lineContent: "",
    // constrain tooltip width and height
    toolTipContainerWidth: 0,
    toolTipContainerHeight: 0
  }
};

export default class TooltipProvider extends React.Component {
  state = {
    ...defaultTooltipState
  };
  updateTooltip = payload => {
    let updatedTooltipState = { ...this.state.tooltip };
    for (let key in payload) {
      updatedTooltipState[key] = payload[key];
    }
    this.setState({
      tooltip: updatedTooltipState
    });
  };
  render() {
    return (
      <Provider
        value={{
          tooltip: this.state.tooltip,
          updateTooltip: this.updateTooltip
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
