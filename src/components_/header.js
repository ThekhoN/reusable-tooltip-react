import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"

const Header = ({title, headerType}) => {
  /*
    Use non-html attributes as props when passing to the StyledComponents.
    Because html-attributes (such as "type") will be renderd in the DOM.
    Which is NOT what we want.
  */
  return <HeaderWrapper headerType={headerType}>{title}</HeaderWrapper>;
};

const HeaderWrapper = styled.h2`
  color: ${props => {
    const { theme } = props;
    switch (props.headerType) {
      case "link":
        return theme.colors.link;
      case "error":
        return theme.colors.error;
      default:
        return theme.colors.text;
    }
  }};
`;

Header.propTypes = {
    title: PropTypes.string,
    headerType: PropTypes.string
}

export default Header;
