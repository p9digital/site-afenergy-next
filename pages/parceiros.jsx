import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import Container from "../components/ui/containers/Container";
import Banner from "../components/layout/Banner";
import { ButtonWrapper, ButtonHome } from "../components/conteudo/home/Faixa1";
import { parceiros } from "../helpers/dados";

const FaixaConteudo = styled.div`
  width: 100%;
  padding: 4rem 0;
`;

const FaixaTextos = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  width: 100%;
`;

const Parceiro = styled.img`
  max-width: 100px;
  margin: 4rem;
`;

const ButtonWrapperParceiros = styled(ButtonWrapper)`
  margin:auto;
`;

export default function Parceiros() {
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
      <Banner background="/static/images/parceiros/background.png">
        Parceiros
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            {parceiros.map((item, index) => (
              <Parceiro
                src={`/static/images/parceiros/${item.img}.png`}
                alt={item.title}
                key={`parceiro${index}`}
              />
            ))}
          </FaixaTextos>

          <ButtonWrapperParceiros>
            <Link href="/servicos" passHref>
              <ButtonHome
                backColor="buttonPrimario"
                backHoverColor="buttonSecundario"
                fontHoverColor="buttonPrimario"
              >
                TODOS OS SERVIÇOS +
              </ButtonHome>
            </Link>
          </ButtonWrapperParceiros>
        </FaixaConteudo>
      </Container>
    </>
  );
}
