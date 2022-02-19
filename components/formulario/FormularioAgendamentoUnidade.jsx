import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import Status from './Status';
import Loader from './Loader';
import Input from './Input';
import InputMasked from './InputMasked';
import Select from './Select';
import SelectCidade from './SelectCidade';
import Datepicker from '../layout/Datepicker';
import Icon from '../ui/icons/Icon';

import {
  Form,
  FormFieldWrapper,
  FormButton,
  StatusWrapper,
} from '../ui/formulario/FormStyles';
import Paragraph from '../ui/tipografia/Paragraph';

import {
  validacaoAgendamentoUnidade,
  validaTelefone,
  validaNomeCompleto,
  infosErro,
  formataDias,
  formataFeriados,
  formataHoras,
} from '../../helpers/formulario';

import { format, getDay } from 'date-fns';

const SelectAgendamento = styled(SelectCidade)``;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function FormularioAgendamentoUnidade({ currentUnidade }) {
  const router = useRouter();

  const [diasSemana, setDiasSemana] = useState();
  const [feriados, setFeriados] = useState();
  const [horarios, setHorarios] = useState([]);
  const [horariosPreset, setHorariosPreset] = useState();

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [unidades, setUnidades] = useState([]);

  const [lead, setLead] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    hora: '',
    agendamento: '',
  });

  const [controleForm, setControleForm] = useState({
    carregando: 'dias',
    valido: true,
    enviando: false,
    erro: false,
    sucesso: false,
  });

  const buscaDias = async id => {
    try {
      const response = await fetch(
        `${process.env.API_URL}locais/unidades/dias/${id}`
      );
      const data = await response.json();

      setFeriados(formataFeriados(data.feriados));
      setDiasSemana(formataDias(data.dias_semana));
      setHorariosPreset(data.dias_semana);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscaDias(currentUnidade.id);
  }, []);

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });
  };

  const handleData = data => {
    setLead({ ...lead, ['data']: data });

    const diaSemana = getDay(data) + 1;
    const horarioPreset = horariosPreset.filter(
      horarioPreset => horarioPreset.semana_dia_id === diaSemana
    );

    setHorarios(formataHoras(horarioPreset[0].intervalos));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validacaoAgendamentoUnidade(lead) || !validaTelefone(lead.telefone)) {
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
          cidade_id: currentUnidade.cidade_id,
          unidade_id: currentUnidade.id,
          servico_id: "Energia Solar",
          nome: lead.nome,
          telefone: lead.telefone,
          email: lead.email,
          // agendamento: `${format(lead.data, 'yyyy-MM-dd')} ${lead.hora}`,
          referrer: document.referrer,
          ...queryParams,
        }),
      });

      setControleForm({
        ...controleForm,
        sucesso: true,
      });
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
              Preencha os dados abaixo para confirmar seu pré-agendamento!
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
            nome="telefone"
            placeholder="Celular com DDD"
            handleInput={handleInput}
            valor={lead.telefone}
            valido={controleForm.valido}
            className="select-input--agendamento"
            tipo="tel"
            custom={lead.telefone ? validaTelefone(lead.telefone) : true}
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
          {/* <SelectAgendamento
            nome="servico"
            placeholder="Selecione um serviço"
            handleInput={handleInput}
            valor={lead.servico}
            valores={servicos}
            valido={controleForm.valido}
            className="select-input--agendamento"
          /> */}
          {/* <Datepicker
            feriados={feriados}
            diasSemana={diasSemana}
            handleData={handleData}
            valor={lead.data}
            nome="data"
            className="date-picker-agendamento"
          />
          {lead.data && (
            <Select
              nome="hora"
              placeholder="Selecione um horário"
              handleInput={handleInput}
              valor={lead.hora}
              valores={horarios}
              valido={controleForm.valido}
              className="select-input--agendamento select-input--medium"
            />
          )} */}
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
        </Form>
      )}
    </>
  );
}
