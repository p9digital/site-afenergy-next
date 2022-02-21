// eslint-disable-next-line linebreak-style
import Head from "next/head";
import styled from "styled-components";
// import Link from "next/link";
// import { useState } from "react";

import FormularioExpansao from "../components/formulario/FormularioExpansao";
import Container from "../components/ui/containers/Container";
import Paragraph from "../components/ui/tipografia/Paragraph";
import Title from "../components/ui/tipografia/Title";
import Banner from "../components/layout/Banner";
import { ButtonWrapper } from "../components/conteudo/home/Faixa1";
// import { servicos, beneficiosServicos } from "../helpers/dados";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
  @media (max-width: 900px) {
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  ${ButtonWrapper} {
    margin: 5rem 0 0;
    @media (max-width: 900px) {
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

// const PaineisWrapper = styled.div`
//   margin: 5rem 0;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   @media (max-width: 900px) {
//     justify-content: center;
//   }
//   img {
//     width: 100%;
//     max-width: 250px;
//   }
// `;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export default function Expansao() {
  return (
    <>
      <Head>
        <title>AF Energy</title>
        <meta name="description" key="description" content="AF Energy" />
        <meta name="keywords" content="af energy, energia solar" />
        <meta property="og:title" key="og:title" content="AF Energy" />
        <meta
          property="og:description"
          key="og:description"
          content="AF Energy"
        />
      </Head>
      <Banner background="/static/images/sobre/background.png">Seja um Franqueado</Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <Title margem="0 0 2rem">
              Invista no lucrativo serviço de energia fotovoltaica. Seja
              franqueado AF Energy e tenha segurança no mercado.
            </Title>
            <Paragraph margem="0 0 5rem">
              Ofereça o que há de melhor no segmento de energia solar com sua
              franquia AF Energy! Preencha o formulário para receber mais
              informações e entrar em contato conosco.
            </Paragraph>
          </FaixaTextos>
          <FaixaTextos>
            <FormWrapper id="form">
              <FormularioExpansao />
            </FormWrapper>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}
