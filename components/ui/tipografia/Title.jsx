import styled from 'styled-components';

const Title = styled.h1`
  font-size: 3.2rem;
  color: ${(props) => (props.fontColor
    ? props.theme.client.colors[props.fontColor]
    : props.theme.client.colors.azul)};

  margin: ${props => (props.margem ? props.margem : '0')};
  line-height: 1.2;

  span{
    color: ${(props) => (props.spanColor
    ? props.theme.client.colors[props.spanColor]
    : props.theme.colors.black)};
  }

  @media (max-width: 600px){
    font-size: 2.8rem;
  }
`;

export default Title;
