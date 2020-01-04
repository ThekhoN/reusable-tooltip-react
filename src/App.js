import React from "react";
import withTooltip from "./components/tooltip/with-tooltip";
import TooltipProvider from "./components/tooltip/tooltip-context";
import TooltipDisplayer from "./components/tooltip/tooltip-displayer";

const customStyle = { border: "1px solid grey", display: "inline-block", padding: "1rem", };
function App() {
  return (
    < TooltipProvider >
      <TooltipDisplayer />
      {
        withTooltip(<span style={customStyle}>show custom component on mouseover...</span>, {
          customComponent: CustomComponent
        })
      }
    </TooltipProvider >
  );
}

// const content = `Hello`
const content = `Hello my friends, we meet again... It's been a while and where should we begin`
// const content = `Hello my friends, we meet again...It's been a`

const CustomComponent = () => <h2 style={{ "whiteSpace": "nowrap", fontSize: "1rem" }}>{content}</h2>;

export default App;
