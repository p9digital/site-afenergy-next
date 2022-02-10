import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

import Paragraph from "../../components/ui/tipografia/Paragraph";
import Title from "../../components/ui/tipografia/Title";

import Container from "../../components/ui/containers/Container";
import Banner from "../../components/layout/Banner";

import FormularioAgendamentoVeiculosFinal from "../../components/formulario/FormularioAgendamentoVeiculosFinal";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
  }
`;

export default function Post({ currentServico }) {
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
      <Banner background="/static/images/blog/background_post.png">
        {currentServico.nome}
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <FormWrapper>
              <FormularioAgendamentoVeiculosFinal />
            </FormWrapper>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.API_URL}locais/servicos/veiculos`
  );
  const data = await response.json();

  return {
    props: {
      currentServico: data,
    },
  };
}
