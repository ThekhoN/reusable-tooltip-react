import React from "react";
import Header from "../components_/header";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Center from "../components_/center";

export default {
  title: "Header"
};

export const defaultHeader = () => {
  return <Header title="This is a custom header!" type="link" />;
};

addDecorator(storyFn => <Center>{storyFn()}</Center>);
addDecorator(withInfo);
