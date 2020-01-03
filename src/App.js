import React from "react";
import withTooltip from "./components/tooltip/with-tooltip";
import TooltipProvider from "./components/tooltip/tooltip-context";
import TooltipDisplayer from "./components/tooltip/tooltip-displayer";

const content = "What's up with that?";

function App() {
  return (
    <React.Fragment>
      <TooltipProvider>
        <TooltipDisplayer />
        <div style={{ width: "120px", position: "absolute", right: 0 }}>
          {withTooltip(content, { lineContent: content })}
        </div>
      </TooltipProvider>
      <TooltipProvider>
        <TooltipDisplayer />
        <div style={{ width: "120px" }}>
          {withTooltip(content, { lineContent: content })}
        </div>
      </TooltipProvider>
    </React.Fragment>
  );
}

export default App;
