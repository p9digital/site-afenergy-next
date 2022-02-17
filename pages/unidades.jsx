import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Container from "../components/ui/containers/Container";
import FormularioEncontrar from "../components/formulario/FormularioEncontrar";
import FormularioSelectEncontrar from "../components/formulario/FormularioSelectEncontrar";
import Paragraph from "../components/ui/tipografia/Paragraph";
import Icon from "../components/ui/icons/Icon";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;

  @media (max-width: 900px) {
    text-align: center;
  }
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  margin: 4rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BuscaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Unidade = styled.div`
  width: 100%;
  max-width: 350px;

  padding: 2rem;
  margin: 1rem 1rem 2rem;
  border-radius: 15px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  background: ${(props) => props.theme.client.colors.brancoForm};

  &:hover {
    cursor: pointer;
  }
  p {
    font-size: 1.4rem;
    text-align: left;
  }
  a {
    color: ${(props) => props.theme.client.colors.azul};
    font-size: 1.4rem;
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
    }
  }

  .implantacao {
    font-size: 1.2rem;
    font-weight: bold;
    color: #f59e42;
  }
  .titulo {
    font-size: 1.6rem;
  }
`;

export default function Encontrar() {
  const [unidadesFiltradas, setUnidadesFiltradas] = useState(null);
  const [status, setStatus] = useState();

  const getUnidades = (unidades) => {
    if (Object.keys(unidades).length !== 0) {
      setUnidadesFiltradas(unidades);
      setStatus(false);
    } else {
      setStatus("No momento não há unidades AF Energy na sua cidade.");
      setUnidadesFiltradas(false);
    }
  };

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
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <Paragraph margem="2rem 0 0">
              <strong>Encontre a AF Energy mais próxima de você!</strong>
            </Paragraph>
            <FormWrapper>
              <FormularioEncontrar getUnidades={getUnidades} />
              <Paragraph margem="2rem 0">Ou use os filtros abaixo:</Paragraph>
              <FormularioSelectEncontrar getUnidades={getUnidades} />
            </FormWrapper>
            <BuscaContainer>
              {unidadesFiltradas &&
                unidadesFiltradas.map((unidade) => {
                  return (
                    <Link href={"/unidades/" + unidade.path} key={unidade.id}>
                      <Unidade>
                        <Paragraph margem="0 0 1rem 0" className="titulo">
                          <strong>AF Energy {unidade.bairro}</strong>
                        </Paragraph>
                        {!unidade.agendamento && (
                          <Paragraph margem=".5rem 0" className="implantacao">
                            Unidade em fase de implantação!
                          </Paragraph>
                        )}
                        <Paragraph>
                          {unidade.telefones.map((telefone) => {
                            return (
                              <span key={telefone.telefone}>
                                {telefone.telefone + " "}
                                {telefone.tipo == "2" ? (
                                  <Icon
                                    icon="whatsapp"
                                    cor="#353535"
                                    tamanho="1.2rem"
                                    tipo="svg"
                                  />
                                ) : (
                                  ""
                                )}
                              </span>
                            );
                          })}
                        </Paragraph>
                        <Paragraph>{unidade.cidade.nome}</Paragraph>
                        {unidade.modelo_franquia == "street" && (
                          <>
                            <Paragraph>{unidade.endereco}</Paragraph>
                            <Paragraph>{unidade.bairro}</Paragraph>
                            <Paragraph margem="0 0 1rem 0">
                              {unidade.cep}
                            </Paragraph>
                          </>
                        )}
                        <a>
                          <Icon
                            icon="keyboard_arrow_right"
                            cor="#143562"
                            tamanho="2rem"
                            tipo="svg"
                          />
                          <strong>Mais informações dessa unidade</strong>
                        </a>
                      </Unidade>
                    </Link>
                  );
                })}
              {status && <Paragraph>{status}</Paragraph>}
            </BuscaContainer>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}
