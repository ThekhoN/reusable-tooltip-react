import React from "react";
import styled from "styled-components";

const Center = props => {
  return (
    <CenterWrapper className="center-wrapper-storybook-util">
      {props.children}
    </CenterWrapper>
  );
};

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Center;
