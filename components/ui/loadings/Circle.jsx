import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CirculoLoading = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => `${props.tamanho}rem`};
  height: ${(props) => `${props.tamanho}rem`};
  div {
    position: absolute;
    width: ${(props) => `calc(${props.tamanho}rem * 0.8)`};
    height: ${(props) => `calc(${props.tamanho}rem * 0.8)`};
    margin: ${(props) => `${props.tamanho}px`};
    border: ${(props) => `${props.tamanho}px solid #fff`};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => (props.corCliente
    ? props.theme.client.colors[props.corCliente]
    : props.cor)}
      transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Loader = ({
  tamanho, cor, className, corCliente,
}) => (
  <CirculoLoading
    className={className}
    corCliente={corCliente}
    tamanho={tamanho}
    cor={cor}
  >
    <div />
    <div />
    <div />
    <div />
  </CirculoLoading>
);

Loader.propTypes = {
  tamanho: PropTypes.string,
  cor: PropTypes.string,
  corCliente: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: '',
  cor: '#000',
  corCliente: '',
  tamanho: '4',
};

export default Loader;
