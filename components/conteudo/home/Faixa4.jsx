import styled, { keyframes } from "styled-components";
import Container from "../../ui/containers/Container";
import Link from "next/link";

import {
  FaixaWrapperSimples,
  FaixaTextos,
  ButtonWrapper,
  ButtonHome,
} from "./Faixa1";

import { servicos } from "../../../helpers/dados";

const ServicosWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;

const Servico = styled.div`
  background: url(${(props) => props.background}) no-repeat center;
  background-size: cover;
  background-color: ${(props) => props.theme.client.colors.branco};
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  border-radius: 15px;
  padding: 2rem 2rem 1rem;

  width: 250px;
  height: 250px;
  text-align: left;
  color: ${(props) => props.theme.client.colors.branco};

  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.9rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.4rem;
    flex: 1;
  }
  .right {
    width: 35px;
  }
  .up {
    display: none;
    width: 15px;
  }
  &:hover {
    cursor: pointer;
    background: none;
    color: ${(props) => props.theme.client.colors.azul};

    .right {
      display: none;
    }
    .up {
      display: initial;
    }
  }
`;

const Faixa4 = () => {
  return (
    <FaixaWrapperSimples>
      <Container>
        <FaixaTextos>
          <ServicosWrapper>
            {servicos.map((item, index) => {
              return (
                <Link href="/" key={"servicos" + index}>
                  <Servico
                    background={`/static/images/home/card${index % 2}.png `}
                  >
                    <h2>{item.title}:</h2>
                    <p>{item.text}</p>
                    <img
                      className="right"
                      src={`/static/images/home/icones/right_arrow.png`}
                    />
                    <img
                      className="up"
                      src={`/static/images/home/icones/up_arrow.png`}
                    />
                  </Servico>
                </Link>
              );
            })}
          </ServicosWrapper>
          <ButtonWrapper style={{ margin: "0 auto" }}>
            <Link href="/">
              <ButtonHome
                backColor="buttonPrimario"
                backHoverColor="buttonSecundario"
                fontHoverColor="buttonPrimario"
              >
                FAZER UM ORÇAMENTO
              </ButtonHome>
            </Link>
          </ButtonWrapper>
        </FaixaTextos>
      </Container>
    </FaixaWrapperSimples>
  );
};

export default Faixa4;
