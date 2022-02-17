import styled from 'styled-components';
import Anchor from '../ui/buttons/Anchor';
import Icon from '../ui/icons/Icon';
import Container from '../ui/containers/Container';
import Link from 'next/link';
import MenuItem from './MenuItem';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const FaixaNav = styled.div`
  width: 100%;
  background: #fefefe;
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const Menu = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuLinks = styled.div`
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;

  @media (max-width: 900px) {
    display: none;
  }
`;

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

const MenuResponsive = styled.div`
  display: none;
  margin: 0 2rem;
  @media (max-width: 900px) {
    display: initial;
  }
`;

const OpenButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  position: absolute;
  top: 30px;
  right: 30px;
`;

const MenuLinksResponsive = styled.div`
  width: 100%;
  height: 100%;
  max-width: 600px;
  background: #fefefe;
  box-shadow: -10px 0px 10px 1px rgb(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;

  position: fixed;
  right: -100%;
  top: 0;
  z-index: 50;

  &.open {
    right: 0;
    transition: right 1000ms ease;
  }

  &.close {
    right: -100%;
    transition: right 1000ms ease;
  }

  div {
    padding: 1rem 0;
  }

  @media (max-width: 900px) {
    display: flex;
  }
`;

const LinkResponsivo = styled.a`
  padding: 1rem 0;
  font-size: 2.4rem;
`;

const LogoContainer = styled.div`
  padding: 2rem 0;

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
  }
`;

const LogoLink = styled.a``;

const Logo = styled.img`
  height: 50px;
  width: auto;
  @media (max-width: 1100px) {
    height: 39px;
    margin-top: 5px;
    width: 150px;
  }
`;

const NavbarHome = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  return (
    <>
      <FaixaNav>
        <Container>
          <Menu>
            <LogoContainer>
              <LogoLink href="/">
                <Logo src="/static/images/logo.png" alt="Logo AF Energy" />
              </LogoLink>
            </LogoContainer>
            <MenuLinks>
              <MenuItem nome="Home" link="/" />
              <MenuItem nome="Sobre" link="/sobre" />
              <MenuItem nome="Serviços" link="/servicos" />
              <MenuItem nome="Blog" link="/blog" />
              <MenuItem nome="Encontrar Unidade" link="/unidades" />
              <MenuItem nome="Contato" link="/contato" />
              {/* <Link href="#">
                <MenuLink className="icone">
                  <img
                    src="/static/images/icons/faq.png"
                    alt="Perguntas frequentes"
                  />
                </MenuLink>
              </Link> */}
            </MenuLinks>
            <MenuResponsive>
              <OpenButton onClick={() => toggleMenu()}>
                <Icon icon="menu" cor="#353535" tamanho="3rem" tipo="svg" />
              </OpenButton>
            </MenuResponsive>
          </Menu>
        </Container>
      </FaixaNav>
      <MenuLinksResponsive className={isMenuOpen ? 'open' : 'close'}>
        <CloseButton onClick={() => toggleMenu()}>
          <Icon icon="clear" cor="#353535" tamanho="5rem" tipo="svg" />
        </CloseButton>
        <Link href="/" passHref>
          <LinkResponsivo>Home</LinkResponsivo>
        </Link>
        <Link href="/sobre" passHref>
          <LinkResponsivo>Sobre</LinkResponsivo>
        </Link>
        <Link href="/servicos" passHref>
          <LinkResponsivo>Procedimentos</LinkResponsivo>
        </Link>
        <Link href="/blog" passHref>
          <LinkResponsivo>Blog</LinkResponsivo>
        </Link>
        <Link href="/unidades" passHref>
          <LinkResponsivo>Encontrar Unidade</LinkResponsivo>
        </Link>
        <Link href="/contato" passHref>
          <LinkResponsivo>Contato</LinkResponsivo>
        </Link>
      </MenuLinksResponsive>
    </>
  );
};

export default NavbarHome;
