import React from "react";
import { configure } from "@storybook/react";
import { addDecorator } from "@storybook/react";
// import { withInfo } from '@storybook/addon-info';
// import Center from "../src/components_/center";
import ThemeContainer from "../src/components_/theme-container";

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);

// common theme provider
addDecorator(storyFn => <ThemeContainer>{storyFn()}</ThemeContainer>);
// addDecorator(withInfo);
