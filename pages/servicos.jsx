import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

import Container from "../components/ui/containers/Container";
import Paragraph from "../components/ui/tipografia/Paragraph";
import Title from "../components/ui/tipografia/Title";
import Banner from "../components/layout/Banner";
import { ButtonWrapper, ButtonHome } from "../components/conteudo/home/Faixa1";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
  @media (max-width: 1110px) {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  ${ButtonWrapper} {
    margin: 5rem 0 0;
    @media (max-width: 1110px) {
    margin: 5rem auto;
    }
  }
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.client.colors.branco};
  box-shadow: 0 -12px 24px 0 rgba(0, 0, 0, 0.09);
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: -6rem;

  img {
    width: 5.5rem;
  }
  .hover {
    display: none;
  }
`;

export const Seta = styled.img`
  position: absolute;
  bottom: 2rem;
  left: 3rem;

  width: 6rem;
`;

export const ServicoConteudo = styled.div`
  display: none;
  color: ${(props) => props.theme.client.colors.azul};
  font-size: 1.6rem;

  a {
    width: fit-content;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ServicosWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5rem;
`;

export const Servico = styled.div`
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  background: url(${(props) => props.background}) no-repeat;
  background-position: right center;
  background-size: cover;
  position: relative;

  border-radius: 10px;
  width: 320px;
  height: 280px;

  padding: 2rem;
  margin: 0 1rem 5rem;

  text-align: left;
  color: ${(props) => props.theme.client.colors.branco};

  h2 {
    font-size: 2.4rem;
    padding-bottom: 1rem;
    margin: 2rem 0;
    width: fit-content;
  }

  transition: 0.3s all;
  &:hover {
    background: ${(props) => props.theme.client.colors.branco};
    color: ${(props) => props.theme.client.colors.azul};
    height: 350px;
    cursor: pointer;

    ${Seta} {
      display: none;
    }
    ${Tag} {
      background: ${(props) => props.theme.client.colors.azul};

      .default {
        display: none;
      }
      .hover {
        display: block;
      }
    }
    ${ServicoConteudo} {
      display: block;
    }
    h2 {
      border-bottom: solid 2px ${(props) => props.theme.client.colors.vermelho};
    }
  }
`;

const PaineisWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  @media (max-width: 1110px) {
    justify-content: center;
  }
  img {
    width: 100%;
    max-width: 250px;
  }
`;

export default function Servicos({ servicos }) {
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
      <Banner background="/static/images/servicos/background.png">
        Serviços
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <Title>INSTALAÇÃO DE PAINÉIS SOLARES EM IMÓVEIS</Title>
            <Paragraph>COM GARANTIA E SUPORTE PÓS-INSTALAÇÃO</Paragraph>

            <ButtonWrapper>
              <Link href="/unidades">
                <ButtonHome
                  backColor="buttonPrimario"
                  backHoverColor="buttonSecundario"
                  fontHoverColor="buttonPrimario"
                >
                  Faça um Orçamento!
                </ButtonHome>
              </Link>
            </ButtonWrapper>
          </FaixaTextos>
          <FaixaTextos>
            <PaineisWrapper>
              <img
                src="/static/images/servicos/paineis0.png"
                alt="painéis solares"
              />
              <img
                src="/static/images/servicos/paineis1.png"
                alt="painéis solares"
              />
            </PaineisWrapper>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch(process.env.API_URL + "locais/servicos");
  const data = await response.json();

  return {
    props: { servicos: data },
  };
};
