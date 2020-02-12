import React from "react";
import Switch from "../components_/switch";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Center from "../components_/center";

export default {
  title: "Switch",
  decorators: [storyFn => <Center>{storyFn()}</Center>, withKnobs]
};

export const defaultSwitch = () => {
  return (
    <Switch
      checked={boolean("checked", false)}
      switchFor="switch-story"
      onChange={action("onChange triggered!")}
    />
  );
};
