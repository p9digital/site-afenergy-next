import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

import Paragraph from "../components/ui/tipografia/Paragraph";

import Container from "../components/ui/containers/Container";
import Banner from "../components/layout/Banner";
import FormularioContato from "../components/formulario/FormularioContato";
import { ButtonWrapper, ButtonHome } from "../components/conteudo/home/Faixa1";
import Anchor from "../components/ui/buttons/Anchor";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TextosWrapper = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormWrapper = styled.div`
  margin: 2rem 0;
  width: 100%;

  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

const ButtonWrapperContato = styled(ButtonWrapper)`
  width: 100%;
  max-width: 28rem;
`;

const AnchorContato = styled(Anchor)`
  background: ${(props) => props.theme.client.colors.azul};
  flex-direction: column;
  align-items: center;
  line-height: 1.2;

  margin-top: 2rem;
  padding: 2rem 0;

  img {
    width: 5rem;
    margin-bottom: 2rem;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

export default function Contato() {
  return (
    <>
      <Head>
        <title>AF Energy</title>
        <meta name="description" key="description" content="AF Energy" />
        <meta
          name="keywords"
          content="af energy, energia solar"
        />
        <meta property="og:title" key="og:title" content="AF Energy" />
        <meta
          property="og:description"
          key="og:description"
          content="AF Energy"
        />
      </Head>
      <Banner background="/static/images/contato/background.png">
        Fale
        <br />
        Conosco
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <ContentContainer>
              <TextosWrapper>
                <Paragraph margem="0 0 2rem 0">
                  Para suporte, orçamentos e dúvidas, utilize nosso formulário
                  de contato ou de nossos canais de Telefone, WhatsApp e E-mail.
                </Paragraph>
                <FormWrapper>
                  <FormularioContato />
                </FormWrapper>
              </TextosWrapper>
              <TextosWrapper style={{ maxWidth: "280px" }}>
                <Paragraph>
                  <strong>Franchising</strong>
                </Paragraph>
                <p>Antonio de Godoy 4050, Centro</p>
                <p>CEP: 15.015-100</p>
                <Paragraph margem="0 0 4rem 0">S. J. Rio Preto/SP</Paragraph>
                <Paragraph>
                  <strong>Contato</strong>
                </Paragraph>
                <Paragraph>Fone: (17) 3212 5929</Paragraph>
                <Paragraph>contato@afcredito.com.br</Paragraph>
                {/* <ButtonWrapperContato>
                  <AnchorContato
                    fontHoverColor="branco"
                    href="http://franquiadecreditos.com.br/"
                    target="_blank"
                  >
                    <img src="/static/images/contato/franchise.png" />
                    <span>
                      SEJA UM
                      <br /> FRANQUEADO
                      <br /> AF CRÉDITO
                    </span>
                  </AnchorContato>
                </ButtonWrapperContato> */}
                <ButtonWrapperContato>
                  <Link href="/" passHref>
                    <ButtonHome
                      backColor="buttonPrimario"
                      backHoverColor="buttonSecundario"
                      fontHoverColor="buttonPrimario"
                    >
                      Faça um Orçamento!
                    </ButtonHome>
                  </Link>
                </ButtonWrapperContato>
              </TextosWrapper>
            </ContentContainer>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}
