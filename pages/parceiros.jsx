import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import Container from "../components/ui/containers/Container";
import Banner from "../components/layout/Banner";
import { ButtonWrapper, ButtonHome } from "../components/conteudo/home/Faixa1";
import { parceiros } from "../helpers/dados";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding: 2rem;
`;

const Parceiro = styled.img`
  width: 100px;
  margin: 4rem;
`;

export default function Parceiros() {
  return (
    <>
      <Head>
        <title>AF Crédito</title>
        <meta name="description" key="description" content="AF Crédito" />
        <meta
          name="keywords"
          content="af crédito, af crédito franquia, franquia de crédito, franquia home office, franquia financeira home office, af credito franqueado, af crédito faturamento, af crédito valor de investimento, af crédito soluções financeiras, franquia crédito consignado home office, franquia mini agência bancária, franquia financeira barata, franquia financeira retorno"
        />
        <meta property="og:title" key="og:title" content="AF Crédito" />
        <meta
          property="og:description"
          key="og:description"
          content="AF Crédito"
        />
      </Head>
      <Banner background="/static/images/parceiros/background.png">
        Parceiros
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            {parceiros.map((item, index) => {
              return (
                <>
                  <Parceiro
                    src={`/static/images/parceiros/${item.img}.png`}
                    alt={item.title}
                    key={"parceiro" + index}
                  />
                </>
              );
            })}
            <ButtonWrapper>
              <Link href="/servicos" passHref>
                <ButtonHome
                  backColor="buttonPrimario"
                  backHoverColor="buttonSecundario"
                  fontHoverColor="buttonPrimario"
                >
                  TODOS OS SERVIÇOS +
                </ButtonHome>
              </Link>
            </ButtonWrapper>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}
