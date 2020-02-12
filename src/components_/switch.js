import React from "react";
import styled from "styled-components";

const Switch = ({ onChange, checked, switchFor, defaultBg, toggledBg }) => {
  return (
    <SwitchWrapper>
      <input
        id={switchFor}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={switchFor}>Toggle</label>
    </SwitchWrapper>
  );
};

export default Switch;

const SwitchWrapper = styled.div`
  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  label {
    background: ${props => {
      return props.defaultBg || props.theme.colors.lightGrey;
    }}    
    cursor: pointer;
    text-indent: -9999px;
    width: 100px;
    height: 50px;
    display: block;
    border-radius: 100px;
    position: relative;
  }
  label:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  input:checked + label {
    background: ${props => {
      return props.defaultBg || props.theme.colors.dark;
    }} 
  }
  input:checked + label:after {
    left: calc(100% - 3px);
    transform: translateX(-100%);
  }
  label:active:after {
    width: 130px;
  }
  /* credit ~ "All-CSS Toggle Swtich" https://codepen.io/mburnette/pen/LxNxNg */
`;
