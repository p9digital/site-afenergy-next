import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

import Status from './Status';
import Loader from './Loader';
import Input from './Input';

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

const ButtonEncontrar = styled(FormButton)`
  background: transparent;
  box-shadow: none;
  color: ${props => props.theme.client.colors.azul};

  border-left: solid 1px ${props => props.theme.client.colors.cinza};
  border-radius: initial;

  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  &:hover {
    background: transparent;
    color: ${props => props.theme.client.colors.azul};

    text-decoration: underline;
  }

  @media (max-width: 768px) {
    padding: 10px;
    width: 220px;
  }
  @media (max-width: 600px) {
    border-left: 0;
    line-height: 15px;
    width: 225px;
  }
  @media (max-width: 420px) {
    justify-content: center;
    width: 100%;
  }
`;

const CampoBusca = styled.div`
  align-items: center;
  display: flex;

  div {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 55%;
  }
  @media (max-width: 600px) {
    max-width: 300px;
    width: 95%;
  }
`;

const InputBusca = styled(Input)`
  @media (max-width: 768px) {
    width: 45%;
  }
`;

const ButtonEncontrarIcon = styled(Icon)`
  @media (max-width: 600px) {
    margin-right: 0 !important;
    width: 30px;
  }
`;

export default function FormularioEncontrar({ getUnidades }) {
  const router = useRouter();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [lead, setLead] = useState({
    busca: '',
  });

  const [unidades, setUnidades] = useState([]);

  const [controleForm, setControleForm] = useState({
    carregando: 'dias',
    valido: true,
    enviando: false,
    erro: false,
    sucesso: false,
  });

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });

    const unidadesEncontradas = [];
    unidades.map(item => {
      //removendo caracteres especiais
      const itemUf = item.cidade.estado_id
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w]/g, '');
      const itemCidade = item.unidade_nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w]/g, '');
      const itemBairro = item.bairro
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w]/g, '');
      const itemBusca = item.busca_fulltext
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w]/g, '');
      const itemNome = item.cidade.nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w]/g, '');
      const valorLimpo = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^\w]/g, '');

      if (
        (itemUf.includes(valorLimpo) ||
          itemCidade.includes(valorLimpo) ||
          itemBairro.includes(valorLimpo) ||
          itemBusca.includes(valorLimpo) ||
          itemNome.includes(valorLimpo)) &&
        valorLimpo.length > 2
      ) {
        unidadesEncontradas.push(item);
      }
    });

    console.log(unidadesEncontradas);
    getUnidades(unidadesEncontradas);
  };

  const handleSubmit = async e => {
    e.preventDefault();
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
        getUnidades(data);
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getUnidadesWithCidades = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}locais/unidades/localizacao`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    getUnidadesWithCidades().then(async data => {
      setUnidades(data);
    });
  }, []);

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
          <FormBusca onSubmit={handleSubmit} className="form-encontrar">
            <CampoBusca>
              <Icon
                margem="0 1rem 0 0"
                icon="search"
                cor="#143562"
                tamanho="3rem"
                tipo="svg"
              />
              <InputBusca
                nome="busca"
                placeholder="Busque por sua cidade ou bairro"
                handleInput={handleInput}
                valor={lead.busca}
                valido={controleForm.valido}
                className="select-input--encontrar"
                tipo="text"
              />
            </CampoBusca>
            <ButtonEncontrar
              type="button"
              backColor="buttonPrimario"
              backHoverColor="buttonSecundario"
              onClick={() => getUnidadesWithLocation()}
            >
              <ButtonEncontrarIcon
                icon="location"
                cor="#143562"
                tamanho="2rem"
                tipo="svg"
              />
              Usar minha localização
            </ButtonEncontrar>
          </FormBusca>
        </>
      )}
    </>
  );
}
