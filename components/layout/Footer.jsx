import styled from "styled-components";
import Link from "next/link";
import Anchor from "../ui/buttons/Anchor";
import Container from "../ui/containers/Container";
import Icon from "../ui/icons/Icon";

const FaixaFooter = styled.footer`
  background: url("/static/images/background_footer.png") no-repeat center top;
  background-size: cover;
  width: 100%;
  padding: 5rem 0 1rem;
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  font-size: 1.3rem;
  font-weight: 600;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Coluna = styled.div`
  width: 33%;
  @media (max-width: 900px) {
    text-align: center;
    width: 48%;
    margin-bottom: 2rem;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  color: ${(props) => props.theme.client.colors.branco};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    align-items: center;
  }

  p {
    font-weight: 400;
  }
`;

const RedesWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InfosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const FooterLink = styled.div`
  text-align: center;
  font-size: 1.7rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
  a {
    color: ${(props) => props.theme.client.colors.branco};
    font-size: 1.7rem;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
`;

const LinkWrapper = styled.div`
  margin: 2rem 0;
`;

const AnchorFooter = styled(Anchor)`
  &:hover {
    border: solid 1px ${(props) => props.theme.client.colors.branco};
  }
`;

const FooterTitle = styled.h1`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const FooterP9 = styled.div`
  color: ${(props) => props.theme.client.colors.branco};
  width: 100%;
  padding: 4rem 0 0;
  text-align: center;

  font-size: 1.3rem;

  a {
    color: ${(props) => props.theme.client.colors.branco};
  }
`;

const LogoAbf = styled.img``;

const Footer = () => {
  return (
    <FaixaFooter>
      <Container>
        <FooterWrapper>
          <Coluna>
            <TextWrapper>
              <LogoContainer>
                <Logo
                  src="/static/images/logo_branco.png"
                  alt="Logo AF Energy"
                />
              </LogoContainer>
              <p>
                A AF Energy presta assessoria financeira, disponibilizando
                soluções como crédito consignado e diversos tipos de consórcio
                que possibilitam organizar e alavancar as finanças e promover
                conquistas.
              </p>
              <LinkWrapper>
                <Link href="/" passHref>
                  <AnchorFooter
                    backColor="buttonSecundario"
                    backHoverColor="buttonPrimario"
                    fontColor="azul"
                    fontHoverColor="branco"
                  >
                    Faça um Orçamento!
                  </AnchorFooter>
                </Link>
              </LinkWrapper>
              <picture>
                <source
                  srcSet="/static/images/logo_abf.webp"
                  type="image/webp"
                />
                <LogoAbf src="/static/images/logo_abf.png" alt="Logo ABF" />
              </picture>
            </TextWrapper>
          </Coluna>
          <Coluna>
            <TextWrapper>
              <Link href="/" passHref>
                <FooterLink>PÁGINA INICIAL</FooterLink>
              </Link>
              <Link href="/sobre" passHref>
                <FooterLink>SOBRE</FooterLink>
              </Link>
              <Link href="/servicos" passHref>
                <FooterLink>SERVIÇOS</FooterLink>
              </Link>
              <Link href="/parceiros" passHref>
                <FooterLink>PARCEIROS</FooterLink>
              </Link>
              <Link href="/blog" passHref>
                <FooterLink>BLOG</FooterLink>
              </Link>
              <Link href="/contato" passHref>
                <FooterLink>CONTATO</FooterLink>
              </Link>
              <Link href="/unidades" passHref>
                <FooterLink>ENCONTRAR UNIDADE</FooterLink>
              </Link>
              {/* <FooterLink>
                <a href="https://franquiadecreditos.com.br/" target="_blank">
                  SEJA UM FRANQUEADO
                </a>
              </FooterLink> */}
              <InfosWrapper>
                <p>Termos e condições</p>
                <p>Copyright AF Energy Ldta.</p>
                <p>CNPJ: 17.814.862/0001-50</p>
              </InfosWrapper>
              <RedesWrapper>
                <a
                  href="https://www.facebook.com/afcredito.brasil"
                  target="_blank"
                >
                  <Icon
                    className="hover"
                    icon="facebook"
                    cor="#fff"
                    tamanho="3rem"
                    tipo="svg"
                  />
                </a>
                <a href="https://www.instagram.com/afcredito/" target="_blank">
                  <Icon
                    className="hover"
                    icon="instagram"
                    cor="#fff"
                    tamanho="3rem"
                    tipo="svg"
                    margem="0 0 0 1rem"
                  />
                </a>
              </RedesWrapper>
            </TextWrapper>
          </Coluna>
          <Coluna>
            <TextWrapper>
              <FooterTitle>SEDE</FooterTitle>
              <p>Antonio de Godoy 4050, Centro</p>
              <p>CEP: 15.015-100</p>
              <p>S. J. do Rio Preto/SP</p>
              <br />
              <FooterTitle>CONTATOS</FooterTitle>
              <p>(17) 3212-5929</p>
              <p>contato@afcredito.com.br</p>
              <p>Razão Social: AF 360 Franquias LTDA</p>
            </TextWrapper>
          </Coluna>
        </FooterWrapper>
        <FooterP9>
          <p>
            Com ♥ por{" "}
            <strong>
              <a
                href="https://p9.digital"
                title="Marketing Digital"
                target="_blank"
                rel="noopener noreferrer"
              >
                P9 Digital
              </a>
            </strong>
          </p>
        </FooterP9>
      </Container>
    </FaixaFooter>
  );
};

export default Footer;
