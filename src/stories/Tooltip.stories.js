import React from 'react';
import withTooltip from "../components/tooltip/with-tooltip";
import TooltipProvider from "../components/tooltip/tooltip-context";
import TooltipDisplayer from "../components/tooltip/tooltip-displayer";
import styled from "styled-components/macro";
import "./style.css";

export default {
    title: 'Tooltip',
};

const extremeRightPositionStyles = { border: "1px solid grey", display: "inline-block", padding: "1rem", position: "absolute", right: 0 };

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

// right extreme
export const defaultTooltipAtTheEdgeOfTheScreen = () => {
    const content = "What's up with that........?" // simple text
    return (
        <TooltipProvider>
            <TooltipDisplayer />
            {/* Note that parent wrapper's width cannot fit the content */}
            <ParentDiv style={extremeRightPositionStyles}>
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

// const content = `Hello`
// const content = `Hello my friends, we meet again...It's been a`
const content = `Hello my friends, we meet again... It's been a while and where should we begin`

const CustomComponent = () => <h2 style={{ "whiteSpace": "nowrap", fontSize: "1rem" }}>{content}</h2>;

export const TooltipForRenderingCustomComponentAtTheEdgeOfTheScreen = () => {
    const customStyle = { border: "1px solid grey", display: "inline-block", padding: "1rem" };
    return (
        <TooltipProvider>
            <TooltipDisplayer />
            {withTooltip(<span style={extremeRightPositionStyles}>show custom component on mouseover...</span>, {
                customComponent: CustomComponent // pass as CustomComponent and NOT as <CustomComponent /> // TODO - accept both
            })
            }
        </TooltipProvider >
    )
}
