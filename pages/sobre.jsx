import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import Container from "../components/ui/containers/Container";
import Banner from "../components/layout/Banner";
import Paragraph from "../components/ui/tipografia/Paragraph";

import { ButtonWrapper, ButtonHome } from "../components/conteudo/home/Faixa1";
import { servicos } from "../helpers/dados";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5rem 0;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const FaixaTextos = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ServicoWrapper = styled.div`
  border-bottom: solid 2px ${(props) => props.theme.client.colors.cinzaEscuro};
  margin-bottom: 2rem;
`;

const Servico = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.client.colors.cinzaEscuro};
  border-bottom: solid 4px ${(props) => props.theme.client.colors.azul};

  p {
    font-size: 1.4rem;
    font-weight: 800;
  }
`;

const BigNumbers = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-around;

  @media (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const Number = styled.div`
  line-height: 1.1;
  width: 150px;

  color: ${(props) => props.theme.client.colors.azul};
  margin: 0 1rem 2rem;

  h1 {
    font-size: 7.6rem;
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${(props) => props.theme.client.colors.vermelho};
  }
  h2 {
    font-size: 2.8rem;
    font-weight: 400;
  }
`;

const ValoresWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Valor = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 3rem;
  margin: 0 1rem 2rem;

  background: ${(props) => props.theme.client.colors.branco};
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  border-radius: 15px;

  color: ${(props) => props.theme.client.colors.azul};
  h1 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.6rem;
  }
`;

export default function Sobre() {
  const [clientes, setClientes] = useState(0);
  const [anos, setAnos] = useState(0);
  const [franquias, setFranquias] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let newClientes = clientes;
      setClientes(newClientes < 780 ? newClientes + 1 : newClientes);
    }, 1);

    const interval2 = setInterval(() => {
      let newAnos = anos;
      setAnos(newAnos < 12 ? newAnos + 1 : newAnos);

      let newFranquias = franquias;
      setFranquias(newFranquias < 19 ? newFranquias + 1 : newFranquias);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  });

  return (
    <>
      <Head>
        <title>AF Energy</title>
        <meta name="description" key="description" content="AF Energy" />
        <meta
          name="keywords"
          content="af crédito, af crédito franquia, franquia de crédito, franquia home office, franquia financeira home office, af credito franqueado, af crédito faturamento, af crédito valor de investimento, af crédito soluções financeiras, franquia crédito consignado home office, franquia mini agência bancária, franquia financeira barata, franquia financeira retorno"
        />
        <meta property="og:title" key="og:title" content="AF Energy" />
        <meta
          property="og:description"
          key="og:description"
          content="AF Energy"
        />
      </Head>
      <Banner background="/static/images/sobre/background.png">
        Conheça a <br />
        AF Energy
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <Paragraph margem="0 0 2rem 0">
              <strong>A AF ENERGY FAZ PARTE DA AF 360!</strong>
            </Paragraph>
            <Paragraph margem="0 0 2rem 0">
              A AF 360 é uma holding de franquias e serviços de assessoria
              financeira, disponibilizando soluções como seguros, crédito
              consignado e diversos tipos de consórcio que possibilitam
              organizar e alavancar as finanças e promover conquistas. Através
              de valores como ética, transparência e competência, buscamos
              ampliar nossa atuação no mercado e nos tornamos referência
              nacional, por meio da excelência no atendimento e nos serviços
              prestados.
            </Paragraph>
            <Paragraph margem="0 0 2rem 0">
              Nossa história está atrelada ao know-how de nosso fundador, Fabio
              Donizete da Silva, que vislumbrou no segmento a oportunidade de
              atender uma demanda existente dentro do mercado de franquias,
              proporcionando inúmeras realizações aos clientes, através de seu
              menu de serviços.
            </Paragraph>
            <Paragraph margem="0 0 2rem 0">
              Através de seu sistema de franquias e serviços, a AF 360 apresenta
              ferramentas que viabilizam desempenho comercial, operacional e
              financeiro de excelência, além de inúmeras facilidades,
              realizando, assim, parcerias que construirão uma história de
              sucesso.
            </Paragraph>
          </FaixaTextos>
          <FaixaTextos style={{ maxWidth: "500px" }}>
            {servicos.map((item, index) => {
              return (
                <ServicoWrapper key={index}>
                  <Servico>
                    <p>{item.title}</p>
                    <p>100%</p>
                  </Servico>
                </ServicoWrapper>
              );
            })}
          </FaixaTextos>
        </FaixaConteudo>

        <ButtonWrapper style={{ margin: "0 auto 5rem" }}>
          <Link href="/" passHref>
            <ButtonHome
              backColor="buttonPrimario"
              backHoverColor="buttonSecundario"
              fontHoverColor="buttonPrimario"
            >
              CONHEÇA O SISTEMA SOLAR AF ENERGY
            </ButtonHome>
          </Link>
        </ButtonWrapper>
      </Container>
    </>
  );
}
