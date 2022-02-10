import styled from 'styled-components';
import Link from 'next/link';

const Anchor = styled.a`
  background-color: ${(props) =>
    props.backColor
      ? props.theme.client.colors[props.backColor]
      : props.theme.colors.black};
  color: ${(props) =>
    props.fontColor
      ? props.theme.client.colors[props.fontColor]
      : props.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: ${(props) => props.center || 'initial'};
  font-size: 1.6rem;
  font-weight:700;
  padding: 1rem 4rem;
  transition: all 0.2s ease 0s;
  text-transform: ${(props) => (props.upper ? 'uppercase' : 'initial')};
  
  svg {
    margin-right: 1rem;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.lightGrey};
    pointer-events: none;
  }
  text-align: center;
  &:hover {
    background-color: ${(props) =>
      props.backHoverColor
        ? props.theme.client.colors[props.backHoverColor]
        : props.theme.client.colors[props.backColor]};
    color: ${(props) =>
      props.fontHoverColor
        ? props.theme.client.colors[props.fontHoverColor]
        : props.theme.client.colors.preto};
  }
`;

export default Anchor;
