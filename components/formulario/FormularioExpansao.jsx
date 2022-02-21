import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import queryString from "query-string";
import styled from "styled-components";

import Status from "./Status";
import Loader from "./Loader";
import Input from "./Input";
import InputMasked from "./InputMasked";
import TextArea from "./TextArea";
import SelectCidade from "./SelectCidade";
import Icon from "../ui/icons/Icon";

import { Form, FormButton, StatusWrapper } from "../ui/formulario/FormStyles";
import Paragraph from "../ui/tipografia/Paragraph";

import {
  validaNomeCompleto,
  validaTelefone,
  infosErro,
  validacaoExpansao
} from "../../helpers/formulario";
import { capitais } from "../../helpers/dados";

export default function FormularioAgendamento() {
  const router = useRouter();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [lead, setLead] = useState({
    nome: "",
    email: "",
    celular: "",
    uf: "",
    cidade: "",
    profissao: "",
    capital: "",
    porque: "",
  });

  const [controleForm, setControleForm] = useState({
    carregando: "dias",
    valido: true,
    enviando: false,
    erro: false,
    sucesso: false,
  });

  useEffect(() => {
    async function getEstados() {
      try {
        const res = await fetch(
          `${process.env.API_URL}locais/unidades/estados`
        );
        const data = await res.json();
        data.map((uf) => {
          uf.nome = uf.id;
          return uf;
        });

        setControleForm({ ...controleForm, carregando: "dias" });
        setEstados(data);
      } catch (error) {
        setControleForm({
          ...controleForm,
          sucesso: false,
          enviando: false,
          erro: true,
        });
      }
    }

    getEstados();
  }, []);

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });
  };

  const handleEstado = async ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value, cidade: "" });
    setControleForm({ ...controleForm, carregando: "cidade" });
    setCidades([]);

    try {
      const res = await fetch(`${process.env.API_URL}locais/cidades/${value}`);
      const data = await res.json();

      setControleForm({ ...controleForm, carregando: "dias" });
      setCidades(data);
    } catch (error) {
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
  };

  const handleCidade = async ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value, unidade: "" });
    setControleForm({ ...controleForm, carregando: "unidade" });

    try {
      const res = await fetch(
        `${process.env.API_URL}locais/cidades/unidades/${value}`
      );
      const data = await res.json();

      if (data) {
        data.map((unidade) => {
          unidade.nome = unidade.bairro;
          return unidade;
        });
      }
      setControleForm({ ...controleForm, carregando: "dias" });
    } catch (error) {
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validacaoExpansao(lead) || !validaTelefone(lead.celular)) {
      setControleForm({
        ...controleForm,
        valido: false,
      });

      return false;
    }

    setControleForm({
      ...controleForm,
      enviando: true,
    });

    const queryParams = queryString.parse(window.location.search);

    try {
      const response = await fetch(`${process.env.API_URL}expansao/leads`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: lead.nome,
          email: lead.email,
          celular: lead.celular,
          estado_id: lead.uf,
          cidade_id: lead.cidade,
          profissao: lead.profissao,
          capital: lead.capital,
          porque: lead.porque,
          referrer: document.referrer,
          ...queryParams,
        }),
      });
      const result = await response.json();

      if (result.save) {
        setControleForm({
          ...controleForm,
          sucesso: true,
        });

        router.push("expansao?enviado=true", "expansao/sucesso", { shallow: true });
      } else {
        setControleForm({
          ...controleForm,
          sucesso: false,
          enviando: false,
          erro: true,
        });
      }
    } catch (err) {
      console.log(err);
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }

    return false;
  };

  return (
    <>
      {controleForm.enviando && !controleForm.erro && (
        <StatusWrapper>
          <p>
            <strong>Carregando...</strong>
          </p>
          <Loader />
        </StatusWrapper>
      )}
      {controleForm.erro && !controleForm.sucesso && (
        <StatusWrapper>
          <Status infos={infosErro} />
        </StatusWrapper>
      )}
      {!controleForm.erro && controleForm.sucesso && (
        <StatusWrapper>
          <p>
            <strong>Agendamento feito com sucesso!</strong>
          </p>
          <Icon
            icon="check_circle_outline1"
            cor="#52b24a"
            tamanho="5rem"
            tipo="svg"
          />
        </StatusWrapper>
      )}
      {!controleForm.enviando && !controleForm.erro && !controleForm.sucesso && (
        <Form onSubmit={handleSubmit} className="form-agendamento">
          <FormHeader>
            <Paragraph>
              ABRA SUA FRANQUIA AF ENERGY!
              <br />
              Preencha o formulário e receba informações
            </Paragraph>
          </FormHeader>
          <Input
            nome="nome"
            placeholder="Seu nome completo"
            handleInput={handleInput}
            valor={lead.nome}
            valido={controleForm.valido}
            className="select-input--agendamento"
            tipo="text"
            custom={lead.nome ? validaNomeCompleto(lead.nome) : true}
          />
          <InputMasked
            mask="tel/cel"
            nome="celular"
            placeholder="Celular com DDD"
            handleInput={handleInput}
            valor={lead.celular}
            valido={controleForm.valido}
            className="select-input--agendamento"
            tipo="tel"
            custom={lead.celular ? validaTelefone(lead.celular) : true}
          />
          <Input
            nome="email"
            placeholder="Seu melhor e-mail"
            handleInput={handleInput}
            valor={lead.email}
            valido={controleForm.valido}
            className="select-input--agendamento"
            tipo="email"
          />
          <FormRow>
            <SelectCidade
              nome="uf"
              placeholder="UF"
              handleInput={handleEstado}
              valor={lead.uf}
              valores={estados}
              valido={controleForm.valido}
              className="select-input--agendamento tiny"
            />
            <SelectCidade
              nome="cidade"
              placeholder="Agora escolha uma cidade"
              handleInput={handleCidade}
              valor={lead.cidade}
              valores={cidades}
              valido={controleForm.valido}
              className="select-input--agendamento medium"
            />
          </FormRow>
          <Input
            nome="profissao"
            placeholder="Profissão"
            handleInput={handleInput}
            valor={lead.profissao}
            valido
            className="select-input--agendamento"
            tipo="text"
          />
          <Input
            nome="capital"
            placeholder="Capital disponível para investimento"
            handleInput={handleInput}
            valor={lead.capital}
            valido
            className="select-input--agendamento"
            tipo="text"
          />
          {/* <SelectCidade
            nome="capital"
            placeholder="Capital disponível para investimento"
            handleInput={handleInput}
            valor={lead.capital}
            valores={capitais}
            valido
            className="select-input--agendamento"
          /> */}
          <TextArea
            nome="porque"
            placeholder="Por que você quer ser franqueado?"
            handleInput={handleInput}
            valor={lead.porque}
            valido
            className="text-area--expansao select-input--agendamento"
          />

          <ButtonWrapper>
            <FormButton
              type="submit"
              backColor="azul"
              backHoverColor="azulEscuro"
              fontHoverColor="#fff"
              className="button-contato"
            >
              Seja um Franqueado
            </FormButton>
          </ButtonWrapper>
        </Form>
      )}
    </>
  );
}

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const FormHeader = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
  text-align: center;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 450px) {
    flex-direction: column;
    justify-content: center;
  }
`;
