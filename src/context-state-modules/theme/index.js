import React from "react";
const { Provider, Consumer } = React.createContext();

export { Consumer as AppStateConsumer };

export const initialState = {
  theme: "light" // dark
};

export default class ThemeProvider extends React.Component {
  state = {
    ...initialState
  };
  updateTheme = payload => {
    const updatedTheme = this.state.theme === "light" ? "dark" : "light";

    this.setState({
      theme: updatedTheme
    });
  };
  render() {
    return (
      <Provider
        value={{
          theme: this.state.theme,
          updateTheme: this.updateTheme
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
