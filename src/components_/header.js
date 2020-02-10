import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"

const Header = ({title, type}) => {
  return <HeaderWrapper type={type}>{title}</HeaderWrapper>;
};

const HeaderWrapper = styled.h2`
  color: ${props => {
    const { theme } = props;
    switch (props.type) {
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
    type: PropTypes.string
}

export default Header;
