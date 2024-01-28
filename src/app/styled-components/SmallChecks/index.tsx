import React, { useState } from 'react';
import styled from 'styled-components';

type CheckBoxProps = {
  children?: React.ReactNode;
  color?: string;
  slowed?: string;
  size?: string;
  opacity?: string;
  effect?: string;
};

const CheckBoxDefault = styled.div<CheckBoxProps>`
  font-family: 'Roboto', Arial;
  margin: 0.5em;
  .checkbox {
    --background: #fff;
    --border: #d1d6ee;
    --border-hover: #bbc1e1;
    --border-active: ${(props) => props.color ?? 'black'};
    --tick: #fff;
    position: relative;
    input,
    svg {
      width: 18px;
      height: 18px; // 21
      ${(props) => {
        switch (props.size) {
          case 'small':
            return `
            width: 14px;
            height: 14px; // 21
      `;
          case 'medium':
            return `
            width: 18px;
      height: 18px; 
    `;
          case 'large':
            return `
            width: 21px;
      height: 21px; 
    `;
        }
      }}
      display: block;
    }
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      outline: none;
      background: var(--background);
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      border-radius: 4px;
      transition: box-shadow 0.3s;
      box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
      &:hover {
        --s: 2px;
        --b: var(--border-hover);
      }
      &:checked {
        border: 1px solid white;
        --b: var(--border-active);
      }
    }
    svg {
      pointer-events: none;
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: var(--stroke, var(--border-active));
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      ${(props) => {
        switch (props.size) {
          case 'small':
            return `
            width: 14px;
            height: 14px; // 21
      `;
          case 'medium':
            return `
            width: 18px;
      height: 18px; 
    `;
          case 'large':
            return `
            width: 21px;
      height: 21px; 
    `;
        }
      }}
      transform: scale(var(--scale, 1)) translateZ(0);
    }
    &.path {
      input {
        &:checked {
          --s: 2px;
          transition-delay: 0.4s;
          & + svg {
            --a: 16.1 86.12;
            --o: 102.22;
          }
        }
      }
      svg {
        stroke-dasharray: var(--a, 86.12);
        stroke-dashoffset: var(--o, 86.12);
        transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
      }
    }
    &.bounce {
      --stroke: var(--tick);
      input {
        &:checked {
          --s: 11px;
          & + svg {
            animation: bounce 0.4s linear forwards 0.2s;
          }
        }
      }
      svg {
        --scale: 0;
      }
    }
  }

  @keyframes bounce {
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CheckBoxComponet: React.FC<CheckBoxProps> = (props) => {
  if (props.effect === 'bounce') {
    return (
      <CheckBoxDefault {...props}>
        <label className="checkbox bounce">
          {props.children}
          <svg viewBox="0 0 21 21">
            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
          </svg>
        </label>
      </CheckBoxDefault>
    );
  } else {
    return (
      <CheckBoxDefault {...props}>
        <label className="checkbox path">
          {props.children}
          <svg viewBox="0 0 21 21">
            <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
          </svg>
        </label>
      </CheckBoxDefault>
    );
  }
};

export default CheckBoxComponet;
