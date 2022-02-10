import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props =>
    props.backColor
      ? props.theme.client.colors[props.backColor]
      : props.theme.colors.black};
  color: ${props =>
    props.fontColor
      ? props.theme.client.colors[props.fontColor]
      : props.theme.colors.white};

  border-radius: 8px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 4rem;

  display: flex;
  align-items: ${props => props.center || 'initial'};

  text-transform: ${props => (props.upper ? 'uppercase' : 'initial')};
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.2s ease 0s;

  svg {
    margin-right: 1rem;
  }
  &:disabled {
    background-color: ${props => props.theme.colors.lightGrey};
    color: ${props => props.theme.client.colors.azul};
    pointer-events: none;
  }
  &:hover {
    background-color: ${props =>
      props.backHoverColor
        ? props.theme.client.colors[props.backHoverColor]
        : props.theme.client.colors[props.backColor]};
    color: ${props =>
      props.fontHoverColor
        ? props.theme.client.colors[props.fontHoverColor]
        : props.theme.client.colors.preto};
  }
`;

export default Button;
