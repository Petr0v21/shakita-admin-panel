import styled from 'styled-components';

type ButtonProps = {
  padding?: string;
  margin?: string;
  design?: string;
  backcolor?: string;
  backcolor_hover?: string;
  backcolor_active?: string;
  borderHover?: string;
  border?: string;
  border_active?: string;
  radius_border?: string;
  widthMax?: string;
  widthMin?: string;
  fontSize?: string;
  slowed?: string;
  content_before?: string;
  content_after?: string;
  size?: string;
  space_between?: string;
  dropdown?: string;
  opacity_hover?: string;
  opacity_active?: string;
};

const ButonLink = styled.button`
  padding: 0.75em 1.5em;
  // width: calc(280px - 2em);
  max-height: 52px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(253, 48, 48, 1);
  display: flex;
  justify-content: center;
  gap: 1em;
  text-align: center;
  align-items: center;
  margin: 1em;
  color: white;
  cursor: pointer;
  span {
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  img {
    width: 24px;
    height: 24px;
  }
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 0.35;
  }
`;

export const ButtonListItem = styled(ButonLink)`
  margin: 0;
  padding: 8px 16px;
  border-radius: 8px;
  span {
    color: white;
    font-size: 14px;
    font-weight: 550;
  }
  background: #292929;
  border: 1px solid #292929;
`;

export const Button = styled(ButonLink)<ButtonProps>`
  transition: all ${(props) => (props.slowed ? props.slowed : '')}s ease;
  &:before {
    content: ${(props) => props.content_before ?? ''};
  }
  &:after {
    content: ${(props) => props.content_after ?? ''};
  }
  &:hover {
    background-color: ${(props) => props.backcolor_hover ?? ''};
    border: ${(props) => props.border_active ?? ''};
    opacity: ${(props) => props.opacity_hover ?? ''};
  }
  &:active {
    background-color: ${(props) => props.backcolor_active ?? ''};
    border: ${(props) => props.border_active ?? ''};
    opacity: ${(props) => props.opacity_active ?? ''};
  }
`;
