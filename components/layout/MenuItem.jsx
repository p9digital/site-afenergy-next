import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuItem = ({
  nome,
  link
}) => (
  <Link href={link} passHref>
    <MenuLink className={useRouter().pathname === link && 'ativo'}>
      {nome}
    </MenuLink>
  </Link>
);

const MenuLink = styled.a`
  align-items: center;
  border-bottom: 3px solid transparent;
  display: flex;
  padding: 2rem 1rem;
  height: 97px;

  text-align: center;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 700;

  color: ${props => props.theme.client.colors.azul};

  &:hover,
  &.ativo {
    border-bottom: 3px solid ${props => props.theme.client.colors.vermelho};
  }
  &.icone {
    padding: 0 1rem;
  }

  img {
    width: 2.5rem;
  }
  @media (max-width: 900px) {
    height: initial;
  }
`;

export default MenuItem;

MenuItem.propTypes = {
  nome: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

MenuItem.defaultProps = {
  nome: '',
  link: '#'
};