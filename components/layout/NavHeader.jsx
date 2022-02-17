import styled, { StyledComponent } from 'styled-components';
import Container from '../ui/containers/Container';
import Icon from '../ui/icons/Icon';

const FaixaWrapper = styled.div`
  width: 100%;
  height: 4rem;
  background: ${props => props.theme.client.colors.azul};
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;

  overflow: hidden;
`;

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    color: ${props => props.theme.client.colors.branco};
  }
`;

const SideDiv = styled.div`
  background: ${props => props.theme.client.colors.azulEscuro};
  position: absolute;
  right: -2rem;
  bottom: 0;
  z-index: 1;

  height: 100%;
  width: 40rem;

  padding-left: 5rem;

  display: flex;
  align-items: center;

  transform: skew(-45deg);

  a {
    transform: skew(45deg);
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 600px) {
    width: 30rem;
  }

  @media (max-width: 400px) {
    width: 25rem;
    font-size: 1.2rem;
  }
`;

const RedesSociais = styled.div`
  padding: 1rem 3rem 1rem;
  display: flex;
  a {
    display: flex;
    margin: 0 1rem;
  }

  border-left: solid 2px rgba(255, 255, 255, 0.2);
  height: 100%;
  margin-right: 40rem;

  position: absolute;
  right: 0;
  bottom: 0;

  @media (max-width: 900px) {
    border-left: none;
  }
  @media (max-width: 600px) {
    margin-right: 30rem;
  }
  @media (max-width: 400px) {
    margin-right: 22rem;
  }
`;

const NavHeader = () => {
  return (
    <FaixaWrapper>
      <Container>
        <FaixaConteudo>
          <RedesSociais>
            <a href="https://www.facebook.com/afcredito.brasil" target="_blank">
              <Icon
                className="hover"
                icon="facebook"
                cor="#fff"
                tamanho="2rem"
                tipo="svg"
              />
            </a>
            <a href="https://www.instagram.com/afcredito/" target="_blank">
              <Icon
                className="hover"
                icon="instagram"
                cor="#fff"
                tamanho="2rem"
                tipo="svg"
              />
            </a>
          </RedesSociais>
          <SideDiv>
          </SideDiv>
        </FaixaConteudo>
      </Container>
    </FaixaWrapper>
  );
};

export default NavHeader;
