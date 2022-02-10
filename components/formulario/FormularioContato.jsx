import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

import Status from "./Status";
import Loader from "./Loader";
import Input from "./Input";
import TextArea from "./TextArea";
import {
  Form,
  FormFieldWrapper,
  FormButton,
  StatusWrapper,
} from "../ui/formulario/FormStyles";
import Icon from "../ui/icons/Icon";

import { validacaoContato, infosErro } from "../../helpers/formulario";

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

export default function FormularioContato() {
  const router = useRouter();

  const [lead, setLead] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [controleForm, setControleForm] = useState({
    carregando: "dias",
    valido: true,
    enviando: false,
    erro: false,
    sucesso: false,
  });

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validacaoContato(lead)) {
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
      const response = await fetch(`${process.env.API_URL}contato`, {
        method: "POST",
        mode: 'cors',
        headers: {
          credentials: "same-origin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: lead.nome,
          email: lead.email,
          assunto: lead.assunto,
          mensagem: lead.mensagem,
          ...queryParams,
        }),
      });

      setControleForm({
        ...controleForm,
        sucesso: true,
      });
    } catch (err) {
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
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
            <strong>Mensagem enviada com sucesso!</strong>
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
        <Form onSubmit={handleSubmit} className="form-contato">
          <Input
            nome="nome"
            placeholder="Seu nome completo"
            handleInput={handleInput}
            valor={lead.nome}
            valido={controleForm.valido}
            className="select-input--contato"
            tipo="text"
            custom={true}
          />
          <Input
            nome="email"
            placeholder="Seu e-mail"
            handleInput={handleInput}
            valor={lead.email}
            valido={controleForm.valido}
            className="select-input--contato"
            tipo="text"
            custom={true}
          />
          <Input
            nome="assunto"
            placeholder="Assunto"
            handleInput={handleInput}
            valor={lead.assunto}
            valido={controleForm.valido}
            className="select-input--contato"
            tipo="text"
            custom={true}
          />
          <TextArea
            nome="mensagem"
            placeholder="Sua mensagem"
            handleInput={handleInput}
            valor={lead.mensagem}
            valido={controleForm.valido}
            className="text-area text-area--contato"
            tipo="text"
          />
          <ButtonWrapper>
            <FormButton
              type="submit"
              backColor="buttonPrimario"
              backHoverColor="buttonSecundario"
            >
              ENVIAR
            </FormButton>
          </ButtonWrapper>
        </Form>
      )}
    </>
  );
}
