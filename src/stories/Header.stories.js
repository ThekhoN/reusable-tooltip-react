import React from "react";
import Header from "../components_/header";
import Center from "../components_/center";
import { withKnobs, text, select } from "@storybook/addon-knobs";

export default {
  title: "Header",
  decorators: [storyFn => <Center>{storyFn()}</Center>, withKnobs]
};

const options = {
  error: "error",
  link: "link",
  default: ""
};

export const defaultHeader = () => {
  const title = text("title", "This is a custom header!");
  const headerType = select("headerTypes", options, "link", "headerType");

  return <Header title={title} headerType={headerType} />;
};
