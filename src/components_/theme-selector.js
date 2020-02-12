import React from "react";
import Switch from "../components_/switch";

export const ThemeSelector = ({ theme, updateTheme }) => {
  return (
    <React.Fragment>
      <h4>UI theme: {theme}</h4>
      <Switch
        switchFor="theme-selector"
        onChange={updateTheme}
        checked={theme === "dark"}
      />
    </React.Fragment>
  );
};

export default ThemeSelector;
