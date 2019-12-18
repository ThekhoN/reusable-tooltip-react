import React from "react";
import withTooltip from "./components/tooltip/with-tooltip";
import TooltipProvider from "./components/tooltip/tooltip-context";
import TooltipDisplayer from "./components/tooltip/tooltip-displayer";

const content = "What's up with that?";

function App() {
  return (
    <TooltipProvider>
      <TooltipDisplayer />
      <div style={{ width: "120px" }}>
        {withTooltip(content, { lineContent: content })}
      </div>
    </TooltipProvider>
  );
}

export default App;
