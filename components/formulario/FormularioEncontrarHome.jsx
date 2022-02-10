import styled from 'styled-components';
import Link from 'next/link';
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

const Unidade = styled.div`
  display: none;
  width: fit-content;
  background: ${props => props.theme.client.colors.azul};
  border-radius: 30px;

  padding: 0.5rem 1rem;
  margin: 1rem;

  a {
    color: ${props => props.theme.client.colors.branco};
    font-size: 1.4rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  &.ativo {
    box-shadow: 0 -12px 24px 0 rgba(0, 0, 0, 0.09);
    display: flex;
    flex-direction: column;

    ${FormBusca} {
      border: none;
    }
    ${Unidade} {
      display: block;
    }
  }
`;

const FormUnidades = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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

export default function FormularioEncontrar() {
  const router = useRouter();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [lead, setLead] = useState({
    busca: '',
  });

  const [unidades, setUnidades] = useState([]);
  const [unidadesEncontradas, setUnidadesEncontradas] = useState();
  const [isFormAtivo, setIsFormAtivo] = useState(false);

  const [controleForm, setControleForm] = useState({
    carregando: 'dias',
    valido: true,
    enviando: false,
    erro: false,
    sucesso: false,
  });

  const handleInput = ({ currentTarget: { name, value } }) => {
    setLead({ ...lead, [name]: value });

    const unidadesFiltradas = [];
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
        unidadesFiltradas.push(item);
      }
    });
    setUnidadesEncontradas(unidadesFiltradas);
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
        setUnidadesEncontradas(data);
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getLocation();

    const concernedElement = document.querySelector('.form-container');
    document.addEventListener('mousedown', e => {
      if (concernedElement.contains(e.target)) {
        setIsFormAtivo(true);
      } else {
        setIsFormAtivo(false);
      }
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
        <FormContainer
          className={isFormAtivo ? 'ativo form-container' : 'form-container'}
        >
          <FormBusca className="form-encontrar">
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
          <FormUnidades>
            {unidadesEncontradas &&
              unidadesEncontradas.map((item, index) => {
                return (
                  <Unidade key={index}>
                    <Link href={`/unidades/${item.path}`}>
                      <a>{`${item.bairro} - ${item.cidade.nome}/${item.cidade.estado_id}`}</a>
                    </Link>
                  </Unidade>
                );
              })}
          </FormUnidades>
        </FormContainer>
      )}
    </>
  );
}
