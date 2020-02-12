import React from "react";
import Center from "../components_/center";
import AppStateProvider, {
  AppStateConsumer
} from "../context-state-modules/theme";
import ThemeSelector from "../components_/theme-selector";
import { withKnobs, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "ThemeSelector",
  decorators: [storyFn => <Center>{storyFn()}</Center>, withKnobs]
};

export const defaultThemeSelector = () => {
  const themeOptions = {
    light: "light",
    dark: "dark"
  };
  const theme = select("theme", themeOptions, "light", "theme");
  return (
    <ThemeSelector
      theme={theme}
      updateTheme={action("updateTheme triggered!")}
    />
  );
};

export const connectedThemeSelector = () => {
  return (
    <AppStateProvider>
      <AppStateConsumer>
        {props => {
          return (
            <ThemeSelector
              {...props}
              theme={props.theme}
              updateTheme={props.updateTheme}
            />
          );
        }}
      </AppStateConsumer>
    </AppStateProvider>
  );
};
