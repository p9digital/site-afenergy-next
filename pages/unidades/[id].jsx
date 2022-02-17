import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";

import Paragraph from "../../components/ui/tipografia/Paragraph";
import Container from "../../components/ui/containers/Container";
import Banner from "../../components/layout/Banner";
import Icon from "../../components/ui/icons/Icon";

import {
  ButtonWrapper,
  ButtonHome,
} from "../../components/conteudo/home/Faixa1";
import { Servico, ServicoConteudo, Tag, Seta } from "../servicos";
import FormularioAgendamentoUnidade from "../../components/formulario/FormularioAgendamentoUnidade";

import {
  format,
  getDay,
  getMonth,
  getDate,
  getTime,
  getYear,
  getHours,
  setHours,
  setMinutes,
} from "date-fns";
import pt from "date-fns/locale/pt-BR";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 0;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Coluna = styled.div`
  @media (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .implantacao {
    font-weight: bold;
    color: #f59e42;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 65px;
    height: auto;
  }

  @media (max-width: 1024px) {
    width: 600px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const HorariosWrapper = styled.div`
  background: ${(props) => props.theme.client.colors.azul};
  color: ${(props) => props.theme.client.colors.branco};

  width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-bottom: 4rem;

  border-radius: 10px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const HorariosHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .horario-hoje {
    margin: 0 2rem;

    @media (max-width: 420px) {
      display: none;
    }
  }

  img {
    height: 3.5rem;
    width: auto;
    margin-right: 1rem;
  }
  span {
    color: ${(props) => props.theme.client.colors.verdeClaro};
  }
  .fechado {
    color: ${(props) => props.theme.client.colors.vermelho};
  }

  div:last-child {
    &:hover {
      cursor: pointer;
    }
  }
`;

const HorariosBody = styled.div`
  display: ${(props) => (props.ativo ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  padding-top: 2rem;
`;

const DiaWrapper = styled.div`
  p {
    font-size: 1.4rem;
    border-bottom: 1px solid #fff;
  }
  text-align: center;
  margin: 1rem 2rem;
`;

const Mapa = styled.div`
  position: relative;
  margin: 4rem 2rem;

  max-width: 400px;
  width: 100%;
  height: auto;

  aspect-ratio: 4/3;

  @media (max-width: 900px) {
    width: 100%;
  }

  iframe {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const ButtonWhats = styled(ButtonHome)`
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const ServicosWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin: 10rem 0 0;

  @media (max-width: 1024px) {
    margin: 10rem auto 0;
  }
`;

const ServicoConteudoUnidade = styled(ServicoConteudo)`
  p {
    font-size: 1.4rem;
  }
  a {
    font-size: 1.4rem;
  }
`;

const ServicoUnidade = styled(Servico)`
  width: 260px;
  height: 120px;

  &:hover {
    height: 300px;
  }
`;

const SetaUnidade = styled(Seta)`
  top: 6rem;
  left: auto;
  right: 0;

  width: 5rem;
  transform: rotate(90deg);
`;

export default function Unidade({
  servicos,
  currentUnidade,
  feriados,
  dias_semana,
}) {
  const [showHorarios, setShowHorarios] = useState(false);
  const [isAbertoAgora, setAbertoAgora] = useState(true);
  const [hoje, setHoje] = useState({
    dia: getDate(new Date()),
    mes: getMonth(new Date()) + 1,
    diaSemana: getDay(new Date()) + 1,
    horario: new Date(),
  });

  const [horarioHoje, setHorarioHoje] = useState();
  const [whatsAtendimento, setWhatsAtendimento] = useState();

  const getHorarios = () => {
    //checando se hoje a unidade está aberta
    const found = dias_semana.find(
      (item) => item.semana_dia_id === hoje.diaSemana
    );

    dias_semana.map((item) => {
      switch (item.semana_dia_id) {
        case 1:
          item.semana_dia = "DOMINGO";
          break;
        case 2:
          item.semana_dia = "SEGUNDA-FEIRA";
          break;
        case 3:
          item.semana_dia = "TERÇA-FEIRA";
          break;
        case 4:
          item.semana_dia = "QUARTA-FEIRA";
          break;
        case 5:
          item.semana_dia = "QUINTA-FEIRA";
          break;
        case 6:
          item.semana_dia = "SEXTA-FEIRA";
          break;
        case 7:
          item.semana_dia = "SÁBADO";
          break;
      }
      if (item.semana_dia_id == hoje.diaSemana) {
        setHorarioHoje(item);
      }
    });

    //checando se hoje é feriado
    feriados.map((item) => {
      const dia = item.data.split("-")[0];
      const mes = item.data.split("-")[1];

      if ((mes == hoje.mes && dia == hoje.dia) || !found) {
        return setAbertoAgora(false);
      }
    });

    //setando datas pra comparar os horarios
    let foundInicio = new Date();
    foundInicio = setHours(foundInicio, found.intervalos.inicio.split(":")[0]);
    foundInicio = setMinutes(
      foundInicio,
      found.intervalos.inicio.split(":")[1]
    );

    let foundFim = new Date();
    foundFim = setHours(foundFim, found.intervalos.fim.split(":")[0]);
    foundFim = setMinutes(foundFim, found.intervalos.fim.split(":")[1]);

    //comparando o horario de agora com os horarios da unidade
    if (hoje.horario < foundInicio || hoje.horario >= foundFim) {
      return setAbertoAgora(false);
    }
  };

  useEffect(() => {
    getHorarios();
    const whatsapp = currentUnidade.telefones.find(
      (tel) => tel.tipo == 2 && tel.whatsapp == 1
    );
    if (whatsapp) {
      setWhatsAtendimento(whatsapp.telefone);
    }
    console.log(whatsAtendimento);
  }, []);
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
      <Banner background="/static/images/unidades/background.png">
        AF Energy {currentUnidade.unidade_nome}
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <Coluna>
              {!currentUnidade.agendamento && (
                <Paragraph margem="0 0 2rem 0" className="implantacao">
                  Unidade em fase de implantação!
                </Paragraph>
              )}
              <HorariosWrapper>
                <HorariosHead>
                  <div>
                    <img src="/static/images/unidades/relogio.png" />
                    <p>
                      Horário de atendimento
                      <br />
                      <span className={isAbertoAgora ? "" : "fechado"}>
                        <strong>
                          {isAbertoAgora ? "Aberto agora" : "Fechado agora"}
                        </strong>
                      </span>
                    </p>
                  </div>
                  <div className="horario-hoje">
                    {horarioHoje && (
                      <p>
                        {horarioHoje.semana_dia}
                        <br />
                        {horarioHoje.intervalos.inicio.slice(0, 5)}
                        {horarioHoje.intervalos.inicio_fechado !== "00:00:00"
                          ? "/" +
                            horarioHoje.intervalos.inicio_fechado.slice(0, 5)
                          : ""}
                        {horarioHoje.intervalos.inicio_fechado !==
                        "00:00:00" ? (
                          <br />
                        ) : (
                          " - "
                        )}
                        {horarioHoje.intervalos.fim.slice(0, 5)}
                        {horarioHoje.intervalos.fim_fechado !== "00:00:00"
                          ? "/" + horarioHoje.intervalos.fim_fechado.slice(0, 5)
                          : ""}
                      </p>
                    )}
                  </div>
                  <div onClick={() => setShowHorarios(!showHorarios)}>
                    <p>
                      <strong>
                        DIAS DA
                        <br />
                        SEMANA
                      </strong>
                    </p>
                    <Icon
                      icon="keyboard_arrow_down"
                      cor="#fff"
                      tamanho="4rem"
                      tipo="svg"
                    />
                  </div>
                </HorariosHead>
                <HorariosBody ativo={showHorarios}>
                  {dias_semana.map((item, index) => {
                    return (
                      <DiaWrapper key={index}>
                        <p>{item.semana_dia}</p>
                        <span>
                          {item.intervalos.inicio.slice(0, 5)}
                          {item.intervalos.inicio_fechado !== "00:00:00"
                            ? "/" + item.intervalos.inicio_fechado.slice(0, 5)
                            : ""}
                          {item.intervalos.inicio_fechado !== "00:00:00" ? (
                            <br />
                          ) : (
                            " - "
                          )}
                          {item.intervalos.fim.slice(0, 5)}
                          {item.intervalos.fim_fechado !== "00:00:00"
                            ? "/" + item.intervalos.fim_fechado.slice(0, 5)
                            : ""}
                        </span>
                      </DiaWrapper>
                    );
                  })}
                </HorariosBody>
              </HorariosWrapper>
              {currentUnidade.modelo_franquia !== "home" && (
                <Wrapper>
                  <Icon
                    icon="location"
                    cor="#080707"
                    tamanho="5rem"
                    tipo="svg"
                  />
                  <Paragraph margem="0 0 0 2rem">
                    <strong>AF Energy {currentUnidade.unidade_nome}</strong>
                    <br />
                    Endereço: {currentUnidade.endereco}
                    <br />
                    Cep: {currentUnidade.cep}
                  </Paragraph>
                </Wrapper>
              )}
              {currentUnidade.telefones &&
                currentUnidade.telefones.map((tel) => {
                  return (
                    <Wrapper key={tel.id}>
                      {tel.tipo == 2 && tel.whatsapp == 1 ? (
                        <img src="/static/images/unidades/whatsapp.png" />
                      ) : (
                        <img src="/static/images/unidades/phone.png" />
                      )}
                      <Paragraph margem="0 0 0 1rem">
                        <strong>
                          {tel.tipo == 2 && tel.whatsapp == 1
                            ? "WhatsApp"
                            : "Telefone"}
                        </strong>
                        <br />
                        {tel.telefone}
                      </Paragraph>
                    </Wrapper>
                  );
                })}
              {whatsAtendimento && (
                <ButtonWrapper>
                  <ButtonWhats
                    href={`https://wa.me/55${whatsAtendimento.replace(
                      /[^\d]/g,
                      ""
                    )}/?text=${encodeURI("Texto a definir")}`}
                    target="_blank"
                    backColor="verde"
                    fontHoverColor="#fff"
                  >
                    <Icon
                      icon="whatsapp"
                      cor="#fff"
                      tamanho="2rem"
                      tipo="svg"
                    />
                    Atendimento via WhatsApp
                  </ButtonWhats>
                </ButtonWrapper>
              )}
              {currentUnidade.iframe_src &&
                currentUnidade.modelo_franquia !== "home" && (
                  <Mapa>
                    <iframe
                      src={
                        "https://www.google.com/maps/embed" +
                        currentUnidade.iframe_src
                      }
                      loading="lazy"
                    ></iframe>
                  </Mapa>
                )}
            </Coluna>
            <Coluna>
              <FormularioAgendamentoUnidade
                currentUnidade={currentUnidade}
                servicos={servicos}
              />
            </Coluna>
          </FaixaTextos>
          {/* <ServicosWrapper>
            {servicos.map((item, index) => {
              return (
                <Link href={`/servicos/${item.path}`} key={index}>
                  <ServicoUnidade
                    background={`/static/images/servicos/thumb-${item.path_thumb}.png`}
                    key={index}
                  >
                    <Tag>
                      <img
                        src={`/static/images/servicos/${item.path_thumb}.png`}
                        alt="Consórcio"
                        className="default"
                      />
                      <img
                        src={`/static/images/servicos/${item.path_thumb}_branco.png`}
                        alt="Consórcio"
                        className="hover"
                      />
                    </Tag>
                    <h2>{item.nome}</h2>
                    <ServicoConteudoUnidade>
                      <Paragraph margem="0 0 2rem 0">{item.resumo}</Paragraph>
                      <a>Saiba mais</a>
                    </ServicoConteudoUnidade>
                    <SetaUnidade src="/static/images/servicos/seta_esquerda.png" />
                  </ServicoUnidade>
                </Link>
              );
            })}
          </ServicosWrapper> */}
        </FaixaConteudo>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch(process.env.API_URL + "locais/unidades");
  const data = await response.json();

  const paths = data.map((unidade) => {
    return {
      params: { id: unidade.path },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let response = await fetch(process.env.API_URL + "locais/unidades");
  let data = await response.json();

  const id = context.params.id;
  const currentUnidade = data.find((unidade) => unidade.path == id);

  response = await fetch(
    `${process.env.API_URL}locais/unidades/dias/${currentUnidade.id}`
  );
  const { feriados, dias_semana } = await response.json();

  response = await fetch(process.env.API_URL + "locais/servicos");
  const servicos = await response.json();

  return {
    props: { servicos, currentUnidade, feriados, dias_semana },
  };
};
