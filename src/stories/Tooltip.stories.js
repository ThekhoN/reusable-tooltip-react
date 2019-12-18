import React from 'react';
import withTooltip from "../components/tooltip/with-tooltip";
import TooltipProvider from "../components/tooltip/tooltip-context";
import TooltipDisplayer from "../components/tooltip/tooltip-displayer";
import styled from "styled-components/macro";

export default {
    title: 'Tooltip',
};

// if parent wrapper cannot fit the text content
// show text that can fit as 'text that can fit. . .'
// show the entire text content via tooltip
const ParentDiv = styled.div`
    width: 110px;
`
export const defaultTooltip = () => {
    const content = "What's up with that........?" // simple text
    return (
        <TooltipProvider>
            <TooltipDisplayer />
            {/* Note that parent wrapper's width cannot fit the content */}
            <ParentDiv>
                {withTooltip(content, { lineContent: content })}
            </ParentDiv>
        </TooltipProvider>
    );
}

export const TooltipForRenderingCustomComponent = () => {
    const customStyle = { border: "1px solid grey", display: "inline-block", padding: "1rem" };
    return (
        <TooltipProvider>
            <TooltipDisplayer />
            {withTooltip(<span style={customStyle}>show custom component on mouseover...</span>, {
                customComponent: CustomComponent // pass as CustomComponent and NOT as <CustomComponent /> // TODO - accept both
            })}
        </TooltipProvider>
    )
}
const CustomComponent = () => <h2>Mother of God</h2>;
