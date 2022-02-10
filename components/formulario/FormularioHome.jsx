import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import Loader from './Loader';
import Status from './Status';
import Select from './Select';
import Input from './Input';
import InputMasked from './InputMasked';
import SelectCidade from './SelectCidade';
import Datepicker from '../layout/Datepicker';
import Paragraph from '../ui/tipografia/Paragraph';

import {
  Form,
  FormFieldWrapper,
  FormButton,
  StatusWrapper,
} from '../ui/formulario/FormStyles';

import Icon from '../ui/icons/Icon';

import {
  formataFeriados,
  validaTelefone,
  validaNomeCompleto,
  validacaoHome,
  validacaoEtapa,
  formataDias,
  infosErro,
  formataHoras,
} from '../../helpers/formulario';

import { format, getDay } from 'date-fns';

const FormRow = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const InputHome = styled(Input)``;

const InputMaskedHome = styled(InputMasked)``;

const SelectHome = styled(SelectCidade)`
  margin-bottom: 1rem;
`;

const DatepickerWrapper = styled.div``;

const DatepickerHome = styled(Datepicker)`
  @media (max-width: 768px) {
    max-width: 28vw;
  }
`;

const EtapaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 1rem;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Etapa = styled.p`
  border: solid 1px ${props => props.theme.client.colors.azul};

  background: ${props => props.theme.client.colors.azul};
  color: ${props => props.theme.client.colors.branco};
  font-size: 1.1rem;
  margin: 1rem 0.2rem;

  &.etapa2 {
    background: transparent;
    color: ${props => props.theme.client.colors.azul};
  }

  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonLocalizacao = styled(FormButton)`
  background: transparent;
  border: solid 2px ${props => props.theme.client.colors.azul};
  margin-bottom: 1rem;
  box-shadow: none;

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    svg {
      fill: ${props => props.theme.client.colors.branco};
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function FormularioHome({ servicos }) {
  const router = useRouter();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [diasSemana, setDiasSemana] = useState();
  const [feriados, setFeriados] = useState();
  const [horarios, setHorarios] = useState([]);
  const [horariosPreset, setHorariosPreset] = useState();

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [etapa, setEtapa] = useState(false);

  const [lead, setLead] = useState({
    estado: '',
    cidade: '',
    unidade: '',
    nome: '',
    telefone: '',
    email: '',
    servico: '',
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

  const buscaDias = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}locais/unidades/dias/${lead.unidade}`
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

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });
    console.log(value);
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

    if (!validacaoHome(lead) || !validaTelefone(lead.telefone)) {
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
          cidade_id: lead.cidade,
          unidade_id: lead.unidade,
          servico_id: lead.servico,
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

  useEffect(() => {
    async function getEstados() {
      try {
        const res = await fetch(
          `${process.env.API_URL}locais/unidades/estados`
        );
        const data = await res.json();
        data.map(uf => {
          uf.nome = uf.id;
          return uf;
        });
        setControleForm({ ...controleForm, carregando: 'dias' });
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

  const handleEstado = async ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value, cidade: '' });
    setControleForm({ ...controleForm, carregando: 'cidade' });
    setCidades([]);

    try {
      const res = await fetch(`${process.env.API_URL}locais/cidades/${value}`);
      const data = await res.json();

      setControleForm({ ...controleForm, carregando: 'dias' });
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
    setLead({ ...lead, [name]: value, unidade: '' });
    setControleForm({ ...controleForm, carregando: 'unidade' });

    try {
      const res = await fetch(
        `${process.env.API_URL}locais/cidades/unidades/${value}`
      );
      const data = await res.json();

      if (data) {
        data.map(unidade => {
          unidade.nome = unidade.bairro;
          return unidade;
        });
      }
      setUnidades(data);
      setControleForm({ ...controleForm, carregando: 'dias' });
    } catch (error) {
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
  };

  const getEstados = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}locais/unidades/estados`);
      const data = await res.json();

      data.map(uf => {
        uf.nome = uf.id;
        return uf;
      });
      setControleForm({ ...controleForm, carregando: 'dias' });
      setEstados(data);
    } catch (error) {
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocalização não é compatível com seu navegador');
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  const getCity = async () => {
    try {
      getLocation();
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`
      );
      const data = await response.json();

      return data.address.city;
    } catch (error) {
      console.log(error);
    }
  };

  const getUnidadesWithLocation = () => {
    try {
      getCity().then(async cidade => {
        const encCidade = encodeURI(cidade);
        const response = await fetch(
          `${process.env.API_URL}locais/cidades_nome/unidades/${encCidade}`
        );
        const data = await response.json();

        if (data && data.length > 0) {
          console.info(data);
          const uf = data[0].cidade.estado_id;
          const cidade_id = data[0].cidade.id;
          setLead({ ...lead, estado: uf, cidade: `${cidade_id}` });
          buscaCidadesPorEstado(uf);
          buscaUnidadesPorCidade(cidade_id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const buscaCidadesPorEstado = async value => {
    try {
      const res = await fetch(`${process.env.API_URL}locais/cidades/${value}`);
      const data = await res.json();

      setControleForm({ ...controleForm, carregando: 'dias' });
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

  const buscaUnidadesPorCidade = async value => {
    try {
      const res = await fetch(
        `${process.env.API_URL}locais/cidades/unidades/${value}`
      );
      const data = await res.json();

      if (data) {
        data.map(unidade => {
          unidade.nome = unidade.bairro;
          return unidade;
        });
      }
      setUnidades(data);
      setControleForm({ ...controleForm, carregando: 'dias' });
    } catch (error) {
      setControleForm({
        ...controleForm,
        sucesso: false,
        enviando: false,
        erro: true,
      });
    }
  };

  useEffect(() => {
    getLocation();
    getEstados();
  }, []);

  const nextStep = () => {
    setEtapa(!etapa);
    buscaDias();
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
        <Form onSubmit={handleSubmit}>
          {!etapa && (
            <>
              <FormRow>
                <ButtonLocalizacao
                  type="button"
                  backHoverColor="buttonPrimario"
                  fontColor="azul"
                  fontHoverColor="branco"
                  onClick={() => getUnidadesWithLocation()}
                >
                  <span>
                    <Icon
                      icon="location"
                      cor="#143562"
                      tamanho="2rem"
                      tipo="svg"
                    />
                    Usar minha localização
                  </span>
                </ButtonLocalizacao>
                <Paragraph margem="0 2rem 1rem 2rem">ou</Paragraph>
                <SelectHome
                  nome="estado"
                  placeholder="UF"
                  handleInput={handleEstado}
                  valor={lead.estado}
                  valores={estados}
                  valido={controleForm.valido}
                  className="select-input--uf-home select-input--tiny"
                />
              </FormRow>
              <SelectHome
                nome="cidade"
                placeholder="Agora escolha uma cidade"
                handleInput={handleCidade}
                valor={lead.cidade}
                valores={cidades}
                valido={controleForm.valido}
                className="select-input--home select-input--city_size"
              />
              <SelectHome
                nome="unidade"
                placeholder="Agora escolha a unidade"
                handleInput={handleInput}
                valor={lead.unidade}
                valores={unidades}
                valido={controleForm.valido}
                className="select-input--home select-input--unity_size"
              />
              <ButtonWrapper>
                <FormButton
                  type="button"
                  backColor="buttonPrimario"
                  backHoverColor="buttonSecundario"
                  onClick={() => nextStep()}
                  disabled={!validacaoEtapa(lead)}
                >
                  Próxima etapa
                </FormButton>
              </ButtonWrapper>
            </>
          )}
          {etapa && (
            <>
              <InputHome
                nome="nome"
                placeholder="Seu nome completo"
                handleInput={handleInput}
                valor={lead.nome}
                valido={controleForm.valido}
                className="select-input--home select-input--home-etapa2"
                tipo="text"
                custom={lead.nome ? validaNomeCompleto(lead.nome) : true}
              />
              <InputHome
                nome="email"
                placeholder="Seu melhor e-mail"
                handleInput={handleInput}
                valor={lead.email}
                valido={controleForm.valido}
                className="select-input--home select-input--home-etapa2"
                tipo="email"
              />
              <InputMaskedHome
                mask="tel/cel"
                nome="telefone"
                placeholder="Celular com DDD"
                handleInput={handleInput}
                valor={lead.telefone}
                valido={controleForm.valido}
                className="select-input--home select-input--home-etapa2"
                tipo="tel"
                custom={lead.telefone ? validaTelefone(lead.telefone) : true}
              />
              <SelectHome
                nome="servico"
                placeholder="Selecione um serviço"
                handleInput={handleInput}
                valor={lead.servico}
                valores={servicos}
                valido={controleForm.valido}
                className="select-input--home select-input--home-etapa2"
              />
              {/* <DatepickerWrapper>
                <DatepickerHome
                  feriados={feriados}
                  diasSemana={diasSemana}
                  handleData={handleData}
                  valor={lead.data}
                  nome="data"
                  className="date-picker-home"
                />
              </DatepickerWrapper>
              <Select
                nome="hora"
                placeholder="Selecione um horário"
                handleInput={handleInput}
                valor={lead.hora}
                valores={horarios}
                valido={controleForm.valido}
                className="select-input--home select-input--home-etapa2"
              /> */}
              <ButtonWrapper>
                <FormButton
                  backColor="buttonPrimario"
                  backHoverColor="buttonSecundario"
                >
                  Solicitar Orçamento
                </FormButton>
              </ButtonWrapper>
            </>
          )}
          <EtapaWrapper>
            {etapa && <span onClick={() => nextStep()}>Voltar</span>}
            <Etapa className={etapa ? 'etapa2' : ''}>1</Etapa>
            <Etapa className={!etapa ? 'etapa2' : ''}>2</Etapa>
          </EtapaWrapper>
        </Form>
      )}
    </>
  );
}
