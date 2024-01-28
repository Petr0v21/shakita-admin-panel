import styled from 'styled-components';

export const StyledPill = styled.div<{ background?: string }>`
  width: 280px;
  max-height: 64px;
  border-radius: 8px;
  background: ${(props) => props.background ?? '#121212'};
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.35;
  }
  .content {
    color: white;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    h4 {
      font-weight: 500;
      margin: 0;
    }
    span {
      font-weight: 400;
      font-size: 12px;
    }
  }
`;
