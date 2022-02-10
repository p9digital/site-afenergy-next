import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import Status from './Status';
import Loader from './Loader';
import Input from './Input';
import Select from './Select';
import SelectCidade from './SelectCidade';

import Icon from '../ui/icons/Icon';

import {
  Form,
  FormFieldWrapper,
  FormButton,
  StatusWrapper,
  StatusContainer,
} from '../ui/formulario/FormStyles';

import { validacao, infosErro } from '../../helpers/formulario';

const FormBusca = styled(Form)`
  @media (max-width: 768px) {
    justify-content: space-between !important;
  }
  @media (max-width: 600px) {
    border-radius: 10px !important;
    flex-direction: column !important;
    padding: 5px !important;
  }
`;

const SelectEncontrar = styled(SelectCidade)``;

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

export default function FormularioEncontrar({ getUnidades }) {
  const router = useRouter();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [lead, setLead] = useState({
    estado: '',
    cidade: '',
  });

  const [controleForm, setControleForm] = useState({
    carregando: 'dias',
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
      getUnidades(data);
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

  return (
    <>
      {controleForm.enviando && !controleForm.erro && (
        <StatusContainer>
          <StatusWrapper>
            <p>
              <strong>Carregando...</strong>
            </p>
            <Loader />
          </StatusWrapper>
        </StatusContainer>
      )}
      {controleForm.erro && !controleForm.sucesso && (
        <StatusContainer>
          <StatusWrapper>
            <Status infos={infosErro} />
          </StatusWrapper>
        </StatusContainer>
      )}
      {!controleForm.enviando && !controleForm.erro && !controleForm.sucesso && (
        <>
          <FormBusca className="form-selectencontrar">
            <FormRow>
              <SelectEncontrar
                nome="estado"
                placeholder="UF"
                handleInput={handleEstado}
                valor={lead.estado}
                valores={estados}
                valido={controleForm.valido}
                className="select-input--tiny"
              />
              <SelectEncontrar
                nome="cidade"
                placeholder="Agora escolha uma cidade"
                handleInput={handleCidade}
                valor={lead.cidade}
                valores={cidades}
                valido={controleForm.valido}
                className="select-input--city_size"
              />
            </FormRow>
          </FormBusca>
        </>
      )}
    </>
  );
}
