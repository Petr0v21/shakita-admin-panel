import React, { useState } from 'react';
import styled from 'styled-components';
import CopyIcon from '@images/copy-icon.svg';
import { useNavigate, useNavigation } from 'react-router';

export const StyledSpan = styled.span<{
  priority?: 'main' | 'secondly';
  url?: boolean;
}>`
  color: ${(props) =>
    props.priority === 'main' ? 'white' : 'rgba(100, 100, 100, 1)'};
  font-size: 14px;
  font-weight: ${(props) => (props.priority === 'main' ? '400' : '500')};
  margin: 0.25em 0;
  img {
    width: 14px;
    height: 14px;
    margin-left: 1em;
    cursor: pointer;
  }
  ${({ url }) =>
    url
      ? `
  strong {
    transition: all 0.1s linear;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: rgba(100, 100, 100, 1);
    }
  }
  `
      : ''}
`;

export const SpanComponent: React.FC<{
  priority?: 'main' | 'secondly';
  withCopy?: boolean;
  text: string;
  value: string;
  url?: string;
}> = ({ text, priority, withCopy, value, url }) => {
  if (!withCopy) {
    return <StyledSpan priority={priority}>{text}</StyledSpan>;
  }
  const [isCopied, setIsCopied] = useState(false);
  const copyText = (item: string) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const navigate = useNavigate();
  return (
    <>
      <div className={`copy-toast${isCopied ? '-active' : ''}`}>Copied!</div>
      <StyledSpan priority={priority} url={!!url}>
        {text.split(' ').map((item, index) =>
          item === value ? (
            <strong
              key={text + item + index}
              onClick={url ? () => navigate(url) : undefined}
            >
              {item}
            </strong>
          ) : (
            item + ' '
          ),
        )}
        <img alt="copy" src={CopyIcon} onClick={() => copyText(value)} />
      </StyledSpan>
    </>
  );
};
