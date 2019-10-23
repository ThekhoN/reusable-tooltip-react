import React from "react";
import styled from "styled-components/macro";
import withTooltip from "./components/tooltip/with-tooltip";
import TooltipProvider from "./components/tooltip/tooltip-context";
import TooltipDisplayer from "./components/tooltip/tooltip-displayer";

// hoc
const smallContent = "Hello";
const content = "What's up with that?";
const newContent = "There will be blood...";

const TextContainer = ({ content, fontSize }) => (
  <TextContainerWrapper>{content}</TextContainerWrapper>
);
const TextContainerWrapper = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

// default render ~ renders tooltip for overflowing content
function App() {
  return (
    <TooltipProvider>
      <TooltipDisplayer />
      <div className="App">
        <br />
        <div style={{ width: "120px" }}>
          {withTooltip(<TextContainer content={content} />, {
            // lineContent: content,
            contentPropsKey: "content"
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

// listData render ~ renders a <ul> with <li>{listData[index]}</li> [Could be removed - use customComponent instead]
// function App() {
//   return (
//     <TooltipProvider>
//       <TooltipDisplayer />
//       <div className="App">
//         <br />
//         <div style={{ width: "120px" }}>
//           {withTooltip(<TextContainer content={content} />, {
//             listData: ["One", "Two", "Three"],
//           })}
//         </div>
//       </div>
//     </TooltipProvider>
//   );
// }

// customComponent render ~ renders CustomComponent
// function App() {
//   return (
//     <TooltipProvider>
//       <TooltipDisplayer />
//       <div className="App">
//         <br />
//         <div style={{ width: "120px" }}>
//           {withTooltip(<TextContainer content={smallContent} />, {
//             customComponent: CustomComponent // pass as CustomComponent and NOT as <CustomComponent />
//           })}
//         </div>
//       </div>
//     </TooltipProvider>
//   );
// }
// const CustomComponent = () => <h2>Mother of God</h2>;

export default App;
