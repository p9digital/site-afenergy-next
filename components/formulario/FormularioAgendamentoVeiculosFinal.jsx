import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import Status from './Status';
import Loader from './Loader';
import Input from './Input';
import InputMasked from './InputMasked';
import CurrencyInput from './CurrencyInput ';
import Select from './Select';
import Icon from '../ui/icons/Icon';

import { Form, FormButton, StatusWrapper } from '../ui/formulario/FormStyles';
import { cepMask, cpfMask, rgMask } from '../../helpers/masks';

import { simOuNao } from '../../helpers/dados';

import {
  validaNomeCompleto,
  validacaoVeiculos,
  validaTelefone,
  validaCpf,
  validaCep,
  validaRg,
  infosErro,
} from '../../helpers/formulario';

const SelectAgendamento = styled(Select)``;

const ButtonWrapper = styled.div`
  margin: 2rem auto 0;
  width: 90%;
`;

const ColWrapper = styled.div`
  width: 50%;
`;

export default function FormularioAgendamento() {
  const router = useRouter();
  const [session, setSession] = useState();
  const [lead, setLead] = useState({
    cpf: '',
    rg: '',
    nomePai: '',
    nomeMae: '',
    naturalidade: '',
    endereco: '',
    cep: '',
    telefoneFixo: '',
    residenciaPropria: '',
    tempoMoradia: '',
    empresa: '',
    tempoTrabalho: '',
    profissao: '',
    registrado: '',
    enderecoComercial: '',
    cepComercial: '',
    telefoneComercial: '',
    salario: '',
    telefoneReferencia: '',
    anoVeiculo: '',
    modelo: '',
    preco: '',
    financiamento: '',
    tempoFinanciamento: '',
  });

  const [controleForm, setControleForm] = useState({
    carregando: 'dias',
    valido: true,
    enviando: false,
    erro: false,
    sucesso: false,
  });

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validacaoVeiculos(lead)) {
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
      const response = await fetch(`${process.env.API_URL}agendamentos`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agendamento: session.lead_body.agendamento,
          unidade_id: session.lead_body.unidade_id,
          servico_id: session.lead_body.servico_id,
          cidade_id: session.lead_body.cidade_id,
          telefone: session.lead_body.telefone,
          email: session.lead_body.email,
          nome: session.lead_body.nome,
          campos_veiculo: JSON.stringify(lead),
          referrer: document.referrer,
          ...queryParams,
        }),
      });

      setControleForm({
        ...controleForm,
        sucesso: true,
      });
      localStorage.clear();
    } catch (err) {
      console.log(err);
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
  };

  useEffect(() => {
    async function buscaSession() {
      const storageSession = await JSON.parse(
        localStorage.getItem('@veiculos/session-lead')
      );

      if (!storageSession) {
        router.push('/servicos/veiculos');
      } else {
        setSession(storageSession);
      }
    }

    buscaSession();
  }, []);

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
        <Form onSubmit={handleSubmit} className="form-veiculos">
          <ColWrapper>
            <InputMasked
              mask={cpfMask}
              nome="cpf"
              placeholder="Seu CPF"
              handleInput={handleInput}
              valor={lead.cpf}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
              custom={lead.cpf ? validaCpf(lead.cpf) : true}
            />
            <InputMasked
              mask={rgMask}
              nome="rg"
              placeholder="Seu RG"
              handleInput={handleInput}
              valor={lead.rg}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
              custom={lead.rg ? validaRg(lead.rg) : true}
            />
            <Input
              nome="nomePai"
              placeholder="Nome do pai"
              handleInput={handleInput}
              valor={lead.nomePai}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
              custom={lead.nomePai ? validaNomeCompleto(lead.nomePai) : true}
            />
            <Input
              nome="nomeMae"
              placeholder="Nome da Mãe"
              handleInput={handleInput}
              valor={lead.nomeMae}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
              custom={lead.nomeMae ? validaNomeCompleto(lead.nomeMae) : true}
            />
            <Input
              nome="naturalidade"
              placeholder="Naturalidade"
              handleInput={handleInput}
              valor={lead.naturalidade}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <Input
              nome="endereco"
              placeholder="Endereço"
              handleInput={handleInput}
              valor={lead.endereco}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <InputMasked
              mask={cepMask}
              nome="cep"
              placeholder="CEP"
              handleInput={handleInput}
              valor={lead.cep}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
              custom={lead.cep ? validaCep(lead.cep) : true}
            />
            <InputMasked
              mask="tel/cel"
              nome="telefoneFixo"
              placeholder="Telefone fixo"
              handleInput={handleInput}
              valor={lead.telefoneFixo}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="tel"
              custom={
                lead.telefoneFixo ? validaTelefone(lead.telefoneFixo) : true
              }
            />
            <SelectAgendamento
              nome="residenciaPropria"
              placeholder="Residência própria?"
              handleInput={handleInput}
              valor={lead.residenciaPropria}
              valores={simOuNao}
              valido={controleForm.valido}
              className="select-input--veiculos"
            />
            <Input
              nome="tempoMoradia"
              placeholder="Há quanto tempo mora?"
              handleInput={handleInput}
              valor={lead.tempoMoradia}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <Input
              nome="empresa"
              placeholder="Onde trabalha?"
              handleInput={handleInput}
              valor={lead.empresa}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <Input
              nome="tempoTrabalho"
              placeholder="Há quanto tempo trabalha?"
              handleInput={handleInput}
              valor={lead.tempoTrabalho}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <Input
              nome="profissao"
              placeholder="Qual sua profissão?"
              handleInput={handleInput}
              valor={lead.profissao}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <SelectAgendamento
              nome="registrado"
              placeholder="É registrado?"
              handleInput={handleInput}
              valor={lead.registrado}
              valores={simOuNao}
              valido={controleForm.valido}
              className="select-input--veiculos"
            />
          </ColWrapper>
          <ColWrapper>
            <Input
              nome="enderecoComercial"
              placeholder="Endereço comercial"
              handleInput={handleInput}
              valor={lead.enderecoComercial}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <InputMasked
              mask={cepMask}
              nome="cepComercial"
              placeholder="CEP"
              handleInput={handleInput}
              valor={lead.cepComercial}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
              custom={lead.cepComercial ? validaCep(lead.cepComercial) : true}
            />
            <InputMasked
              mask="tel/cel"
              nome="telefoneComercial"
              placeholder="Telefone comercial"
              handleInput={handleInput}
              valor={lead.telefoneComercial}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="tel"
              custom={
                lead.telefoneComercial
                  ? validaTelefone(lead.telefoneComercial)
                  : true
              }
            />
            <CurrencyInput
              nome="salario"
              placeholder="Salário"
              handleInput={handleInput}
              valor={lead.salario}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <InputMasked
              mask="tel/cel"
              nome="telefoneReferencia"
              placeholder="Telefone de referência pessoal"
              handleInput={handleInput}
              valor={lead.telefoneReferencia}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="tel"
              custom={
                lead.telefoneReferencia
                  ? validaTelefone(lead.telefoneReferencia)
                  : true
              }
            />
            <Input
              nome="anoVeiculo"
              placeholder="Ano do veículo"
              handleInput={handleInput}
              valor={lead.anoVeiculo}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <Input
              nome="modelo"
              placeholder="Modelo"
              handleInput={handleInput}
              valor={lead.modelo}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <CurrencyInput
              nome="preco"
              placeholder="Quanto custa?"
              handleInput={handleInput}
              valor={lead.preco}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <CurrencyInput
              nome="financiamento"
              placeholder="Quanto vai financiar"
              handleInput={handleInput}
              valor={lead.financiamento}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <Input
              nome="tempoFinanciamento"
              placeholder="Quanto tempo"
              handleInput={handleInput}
              valor={lead.tempoFinanciamento}
              valido={controleForm.valido}
              className="select-input--veiculos"
              tipo="text"
            />
            <ButtonWrapper>
              <FormButton
                type="submit"
                backColor="azul"
                backHoverColor="azulEscuro"
                fontHoverColor="#fff"
                className="button-contato"
              >
                Solicitar Orçamento
              </FormButton>
            </ButtonWrapper>
          </ColWrapper>
        </Form>
      )}
    </>
  );
}
