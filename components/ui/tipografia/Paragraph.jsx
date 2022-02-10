import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  strong {
    font-weight: 800;
  }
  color: ${props =>
    props.fontColor
      ? props.theme.client.colors[props.fontColor]
      : props.theme.client.colors.azul};

  margin: ${props => (props.margem ? props.margem : '0')};
  line-height: 1.5;
`;

export default Paragraph;
