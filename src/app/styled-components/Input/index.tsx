import React from 'react';
import styled from 'styled-components';
import { deviceMax as device } from '../size';
import Hide from '@images/Hide.svg';
import Show from '@images/Show.svg';

export type InputProps = {
  hideArrows?: boolean;
  size?: string;
  name?: string;
  type?: string;
  text?: string;
  changeHandler?: (event: any) => void;
  eyeHandler?: () => void;
  min?: string;
  max?: string;
  disable?: boolean;
  eye?: boolean;
  img?: boolean;
  invalid?: boolean;
  link?: string;
  val?: any;
  store?: any;
  list?: any;
  valid?: any;
  for?: any;
  children?: React.ReactNode;
  heightauto?: any;
  width?: string;
  color?: string;
  noAdaptive?: boolean;
  labelText?: string;
  errorMessage?: string;
  readOnly?: boolean;
};

export const StyledContainer = styled.div<InputProps & { hasValue: boolean }>`
  // margin: 1em 0 1.5em 0;
  margin: 1em 0; // TODO test this
  position: relative;
  max-width: 400px;
  font-size: 12px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid
    ${(props) => (props.invalid ? 'red' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 8px;
  background: black;
  transition: all 0.2s linear;

  input {
    padding: 8px 2.4em 8px 10px;
    width: 100%;
    border: 0;
    z-index: 2;
    background-color: transparent;
    font: inherit;
    color: white;

    &:focus {
      outline: 0;
    }

    ${(props) => (props.invalid ? 'color: red;' : '')}
    ${(props) => (props.readOnly ? 'cursor: pointer;' : '')}
    &::placeholder {
      color: transparent;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  textarea {
    width: 92%;
    height: 64%;
    padding: 8px 2.4em 8px 10px;
    border: 0;
    z-index: 2;
    background-color: transparent;
    font: inherit;
    resize: none;
    color: white;
    &:focus {
      outline: 0;
    }
    &::placeholder {
      color: transparent;
    }
  }

  img {
    width: 12px;
    height: 12px;
  }

  p {
    position: absolute;
    color: red;
    left: 10px;
    bottom: -1.5em;
    margin: 0;
    height: 1em;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:focus-within {
    border: 2px solid rgba(255, 255, 255, 0.5);
    label {
      transform: ${(props) =>
        props.hasValue ? 'translateY(-75%)' : 'translateY(0%)'};
    }
    input {
      color: white;
    }
    p {
      display: none;
    }
  }
  @media (max-width: 10000px) {
    width: 400px;
    font-size: 18px;
    input,
    textarea {
      padding: 10px;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }

  // @media ${device.desktop} {
  //   width: 400px;
  //   font-size: 18px;
  //   input,
  //   textarea {
  //     padding: 10px;
  //   }
  //   img {
  //     width: 18px;
  //     height: 18px;
  //   }
  // }
  @media ${device.desktop} {
    width: 300px;
    font-size: 14px;
    input {
      padding: 10px;
    }
    img {
      width: 14px;
      height: 14px;
    }
  }

  @media ${device.mobileS} {
    font-size: 12px;
    width: 200px;
    img {
      width: 12px;
      height: 12px;
    }
  }
`;

export const StyledInput = styled.input<InputProps>`
  padding: 8px 2.4em 8px 10px;
  width: 100%;
  border: 0;
  z-index: 2;
  background-color: transparent;
  font: inherit;
  color: white;

  &:focus {
    outline: 0;
  }

  ${(props) => (props.invalid ? 'color: red;' : '')}

  &::placeholder {
    color: transparent;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StyledLabel = styled.label<{ hasValue: boolean }>`
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  background: black;
  padding: 4px;
  left: 10px;
  top: 5px;
  transition: transform 0.2s ease;
  transform: ${(props) =>
    props.hasValue ? 'translateY(-75%)' : 'translateY(0%)'};
  z-index: 1;
  span {
    color: red;
    padding-left: 3px;
  }
`;

export const StyledImg = styled.img`
  position: absolute;
  right: 1em;
  cursor: pointer;
  z-index: 3;
`;

export const InputComponentChildren: React.FC<
  InputProps & { hasValue: boolean }
> = (props) => {
  return (
    <StyledContainer {...props}>
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
      {props.eye === true || props.eye === false ? (
        <StyledImg
          src={props.eye ? Show : Hide}
          alt="img"
          onClick={() => {
            if (props.eyeHandler) {
              props.eyeHandler();
            }
          }}
        />
      ) : undefined}
      <p title={props.errorMessage}>{props.errorMessage}</p>
    </StyledContainer>
  );
};
