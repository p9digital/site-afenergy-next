import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Container from '../../ui/containers/Container';
import Icon from '../../ui/icons/Icon';
import Title from '../../ui/tipografia/Title';
import Paragraph from '../../ui/tipografia/Paragraph';

import {
  FaixaWrapperSimples,
  FaixaTextos,
  TextosWrapper,
  ButtonWrapper,
  ButtonHome,
} from './Faixa1';

const Faixa2Wrapper = styled(FaixaWrapperSimples)`
  background: url('/static/images/home/faixa2-detalhe.png') no-repeat 20% center;
  padding-top: 5rem;
`;

const Tag = styled.div`
  background: ${props => props.theme.client.colors.branco};
  box-shadow: 0 -12px 24px 0 rgba(0, 0, 0, 0.09);
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: -6rem;

  img {
    width: 5.5rem;
  }
  .hover {
    display: none;
  }
`;

const Seta = styled.img`
  position: absolute;
  bottom: 2rem;
  left: 3rem;

  width: 6rem;
`;

const ServicoConteudo = styled.div`
  display: none;
  color: ${props => props.theme.client.colors.azul};
  font-size: 1.6rem;

  a {
    width: fit-content;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ServicosWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5rem;
`;

const Servico = styled.div`
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  background: url(${props => props.background}) no-repeat;
  background-position: right center;
  background-size: cover;
  position: relative;

  border-radius: 10px;
  width: 320px;
  height: 280px;

  padding: 2rem;
  margin: 0 1rem 5rem;

  text-align: left;
  color: ${props => props.theme.client.colors.branco};

  h2 {
    font-size: 2.4rem;
    padding-bottom: 1rem;
    margin: 2rem 0;
    width: fit-content;
  }

  transition: 0.3s all;
  &:hover {
    background: ${props => props.theme.client.colors.branco};
    color: ${props => props.theme.client.colors.azul};
    width: 320px;
    height: 350px;
    cursor:pointer;

    ${Seta} {
      display: none;
    }
    ${Tag} {
      background: ${props => props.theme.client.colors.azul};

      .default {
        display: none;
      }
      .hover {
        display: block;
      }
    }
    ${ServicoConteudo} {
      display: block;
    }
    h2 {
      border-bottom: solid 2px ${props => props.theme.client.colors.vermelho};
    }
  }
`;

const Ondas = styled.img`
  position: absolute;
  top: 0;
  left: 10%;
  z-index: -1;
  width: 60rem;
`;

const Faixa2 = ({ servicos }) => {
  return (
    <Faixa2Wrapper>
      <Container>
        <FaixaTextos>
          <Paragraph margem="0 0 1rem 0">
            <strong>Nossos Serviços</strong>
          </Paragraph>
          <Paragraph>
            Disponibilizamos para você diversas soluções que irão atender às
            suas necessidades de acordo com seus objetivos:
          </Paragraph>
          <ServicosWrapper>
            {servicos.slice(0, 3).map((item, index) => {
              return (
                <Link href={`/servicos/${item.path}`} key={index}>
                  <Servico
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
                    <ServicoConteudo>
                      <Paragraph margem="0 0 2rem 0">{item.resumo}</Paragraph>
                      <a>Saiba mais</a>
                    </ServicoConteudo>
                    <Seta src="/static/images/servicos/seta_esquerda.png" />
                  </Servico>
                </Link>
              );
            })}
          </ServicosWrapper>
          <ButtonWrapper>
            <Link href="/servicos" passHref>
              <ButtonHome
                backColor="buttonPrimario"
                backHoverColor="buttonSecundario"
                fontHoverColor="buttonPrimario"
              >
                TODOS OS SERVIÇOS +
              </ButtonHome>
            </Link>
          </ButtonWrapper>
        </FaixaTextos>
      </Container>
    </Faixa2Wrapper>
  );
};

export default Faixa2;
