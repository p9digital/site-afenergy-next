import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import Paragraph from "../../components/ui/tipografia/Paragraph";
import Title from "../../components/ui/tipografia/Title";

import Container from "../../components/ui/containers/Container";
import Banner from "../../components/layout/Banner";

import FormularioAgendamento from "../../components/formulario/FormularioAgendamento";
import FormularioAgendamentoVeiculos from "../../components/formulario/FormularioAgendamentoVeiculos";

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

const TextoWrapper = styled.div`
  width: 60%;

  @media (max-width: 900px) {
    margin-bottom: 4rem;
    width: 100%;
  }
`;

const FormWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
  }
`;

const ServicoConteudo = styled.div`
  h1 {
    color: ${(props) => props.theme.client.colors.azul};
    font-size: 1.9rem;
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  ul {
    margin-bottom: 2rem;
    padding-left: 2rem;
  }
  ul li {
    list-style-type: square;
  }
`;

export default function Post({ currentServico }) {
  const router = useRouter();
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
      <Banner background="/static/images/blog/background_post.png">
        {currentServico.nome}
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <TextoWrapper>
              <Title margem="0 0 4rem 0">{currentServico.nome}</Title>
              <ServicoConteudo
                dangerouslySetInnerHTML={{ __html: currentServico.texto }}
              />
            </TextoWrapper>
            <FormWrapper>
              {router.asPath === "/servicos/veiculos" ? (
                <FormularioAgendamentoVeiculos servico={currentServico.id} />
              ) : (
                <FormularioAgendamento servico={currentServico.id} />
              )}
            </FormWrapper>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const { id } = query;
  const response = await fetch(`${process.env.API_URL}locais/servicos/${id}`);
  const data = await response.json();

  return {
    props: {
      currentServico: data,
    },
  };
}
