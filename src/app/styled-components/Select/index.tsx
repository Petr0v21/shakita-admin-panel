import React from 'react';
import styled from 'styled-components';
import { InputProps, StyledContainer, StyledImg, StyledLabel } from '../Input';
import ArrowDownWhite from '@images/ArrowDownWhite.svg';

export const StyledDropDownContainer = styled(StyledContainer)<
  InputProps & { hasValue: boolean }
>`
  .drop-down-content {
    display: none;
    width: 100%;
    position: absolute;
    overflow-y: scroll;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-top: 0;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    right: -2px;
    height: 120px;
    z-index: 10;
    bottom: -120px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    background: black;
    transition: all 0.2s linear 0s;
    ::-webkit-scrollbar {
      height: 2px;
      width: 2px;
      border: 1px solid black;
    }
    ::-webkit-scrollbar-track {
      background: rgb(16, 16, 16);
    }
    span {
      width: calc(100% - 5px);
      padding: 12px 0 12px 5px;
      color: white;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  &:active {
    .drop-down-content {
      display: flex;
    }
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    // border-bottom: 0;
    align-items: flex-start;
  }

  &:focus-within {
    .drop-down-content {
      display: flex;
    }
    // border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    align-items: flex-start;
  }
`;

export const StyledDropDownImg = styled(StyledImg)`
  top: 1em;
`;

export const DropDownComponentChildren: React.FC<
  InputProps & { hasValue: boolean }
> = (props) => {
  return (
    <StyledDropDownContainer {...props}>
      {props.children}
      {props.labelText && (
        <StyledLabel hasValue={props.hasValue}>
          {props.labelText.split('').map((item, index) => {
            if (item === '*') {
              return (
                <span key={item + index + props.labelText?.length}>{item}</span>
              );
            }
            return item;
          })}
        </StyledLabel>
      )}
      {props.img !== false ? (
        <StyledDropDownImg src={ArrowDownWhite} alt="img" />
      ) : undefined}

      <p title={props.errorMessage}>{props.errorMessage}</p>
    </StyledDropDownContainer>
  );
};
