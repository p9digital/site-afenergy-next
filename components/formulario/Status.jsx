import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '../ui/icons/Icon';

const StatusConteudo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .status {
    &__texto {
      font-weight: bold;
      font-size: 1.8rem;
      text-align: center;

      &--erro {
        color: ${(props) => props.theme.colors.black};
      }

      &--sucesso {
        color: ${(props) => props.theme.colors.black};
      }
    }

    &__link {
      font-weight: bold;
      font-size: 1.8rem;
      border-bottom: 4px solid transparent;
      text-align: center;

      transition: all 0.3s;

      &--erro {
        &:hover {
          border-color: ${(props) => props.theme.colors.red};
        }
      }

      &--sucesso {
        &:hover {
          border-color: ${(props) => props.theme.colors.highlightGreen};
        }
      }
    }
  }
`;

const StatusIconWrapper = styled.div`
  margin-bottom: 1rem;
`;

const StatusComponent = ({ infos }) => (
  <StatusConteudo>
    <StatusIconWrapper>
      <Icon
        cor={infos.tipo === 'erro' ? '#f22323' : '#71d946'}
        tamanho="6rem"
        tipo="svg"
        icon={infos.tipo === 'erro' ? 'error' : 'check-circle'}
      />
    </StatusIconWrapper>
    <p
      className={
        infos.tipo === 'erro'
          ? 'status__texto status__texto--erro'
          : 'status__texto status__texto--sucesso'
      }
    >
      {infos.texto}
    </p>
    <Link href={infos.href}>
      <a
        className={
          infos.tipo === 'erro'
            ? 'status__link status__link--erro'
            : 'status__link status__link--sucesso'
        }
      >
        {infos.linkTexto}
      </a>
    </Link>
  </StatusConteudo>
);

export default StatusComponent;

StatusComponent.propTypes = {
  infos: PropTypes.shape({
    linkTexto: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    texto: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};
