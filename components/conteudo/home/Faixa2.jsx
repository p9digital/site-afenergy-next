import styled, { keyframes } from "styled-components";
import Link from "next/link";
import Container from "../../ui/containers/Container";
import ElasticCarousel from "../../layout/ElasticCarousel";
// import Icon from "../../ui/icons/Icon";
// import Title from "../../ui/tipografia/Title";
// import Paragraph from "../../ui/tipografia/Paragraph";

import {
  FaixaWrapperSimples,
  FaixaTextos,
  // TextosWrapper,
  ButtonWrapper,
  ButtonHome,
} from "./Faixa1";

import { beneficios, ofertas } from "../../../helpers/dados";

const Faixa2Wrapper = styled(FaixaWrapperSimples)`
  background: url("/static/images/home/faixa2-detalhe.png") no-repeat 20% center;
  padding-top: 5rem;
`;

const Tag = styled.div`
  background: ${(props) => props.theme.client.colors.branco};
  box-shadow: 0 -12px 24px 0 rgba(0, 0, 0, 0.09);
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: -6rem;

  img {
    width: 4rem;
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

// const ServicoConteudo = styled.div`
//   display: none;
//   color: ${(props) => props.theme.client.colors.azul};
//   font-size: 1.6rem;

//   a {
//     width: fit-content;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

const BeneficiosWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 5rem;
`;

const Beneficio = styled.div`
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  background: ${(props) => props.theme.client.colors.azul};
  position: relative;

  border-radius: 10px;
  width: 300px;
  height: 250px;

  padding: 2rem;
  margin: 0 1rem 5rem;

  text-align: left;
  color: ${(props) => props.theme.client.colors.branco};

  h2 {
    font-size: 2.3rem;
    line-height: 1.2;
    max-width: 15ch;
    padding-bottom: 1rem;
    margin-top: 3rem;
    width: fit-content;
  }
`;

// const Ondas = styled.img`
//   position: absolute;
//   top: 0;
//   left: 10%;
//   z-index: -1;
//   width: 60rem;
// `;

const OfertasContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const OfertaWrapper = styled.div`
  width: min(100%, 350px);
  padding: 0 5px;
`;

const Faixa2 = () => {
  const breakPoints = [
    { width: 200, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 900, itemsToShow: 3 },
  ];

  return (
    <Faixa2Wrapper>
      <Container>
        <FaixaTextos>
          {/* <Paragraph margem="0 0 1rem 0">
            <strong>Nossos Serviços</strong>
          </Paragraph>
          <Paragraph>
            Disponibilizamos para você diversas soluções que irão atender às
            suas necessidades de acordo com seus objetivos:
          </Paragraph> */}

          <OfertasContainer>
            <ElasticCarousel breakPoints={breakPoints}>
              {ofertas.map((item, index) => (
                <OfertaWrapper key={`oferta${index}`}>
                  <img
                    src={`/static/images/carrossel/oferta${index}.jpeg`}
                    alt={item}
                  />
                </OfertaWrapper>
              ))}
            </ElasticCarousel>
          </OfertasContainer>

          <BeneficiosWrapper>
            {beneficios.map((item, index) => (
              <Beneficio key={index}>
                <Tag>
                  <img
                    src={`/static/images/home/icones/beneficio${index}.png`}
                    className="default"
                    alt=""
                  />
                </Tag>
                <h2>{item}</h2>
                <Seta src="/static/images/servicos/seta_esquerda.png" />
              </Beneficio>
            ))}
          </BeneficiosWrapper>
          <ButtonWrapper>
            <Link href="/" passHref>
              <ButtonHome
                backColor="buttonPrimario"
                backHoverColor="buttonSecundario"
                fontHoverColor="buttonPrimario"
              >
                FAÇA UM ORÇAMENTO
              </ButtonHome>
            </Link>
          </ButtonWrapper>
        </FaixaTextos>
      </Container>
    </Faixa2Wrapper>
  );
};

export default Faixa2;
