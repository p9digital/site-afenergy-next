import styled from "styled-components";
import Title from "../../ui/tipografia/Title";
import FormularioHome from "../../formulario/FormularioHome";
import Anchor from "../../ui/buttons/Anchor";
import { useState, useEffect } from "react";

export const FaixaTextos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const TextosWrapper = styled.div`
  @media (max-width: 900px) {
    text-align: center;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &.title-form {
    margin-left: 18rem;
    @media (max-width: 1200px){
      margin-left: 0;
    }
  }
`;

export const FaixaWrapperSimples = styled.div`
  padding: 0 1rem 5rem;
  position: relative;
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
  margin: 2rem 0;

  @media (max-width: 900px) {
    margin: 2rem auto;
  }
`;
export const ButtonHome = styled(Anchor)`
  padding: 0.8rem 4rem;

  @media (max-width: 600px) {
    padding: 0.8rem 2rem;
  }
`;

const Faixa1Wrapper = styled(FaixaWrapperSimples)`
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  padding: 5rem 1rem;

  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    background-color: #ececf1;
    background-image: none;
    flex-direction: column;
    padding: 0 0 5rem;
  }
`;

const BannerMobile = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  display: none;
  height: 50vw;
  margin-bottom: 50px;
  max-height: 300px;
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const TextosContainer = styled.div`
  display: flex;
  img {
    width: 200px;
    margin-left: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BigTitle = styled(Title)`
  font-size: 3.8rem;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    span {
      display: none;
    }
  }
  @media (max-width: 600px) {
    font-size: 3.6rem;
  }
`;

const SubTitle = styled(Title)`
  font-size: 2.1rem;

  img {
    width: 25px;
    margin-bottom: -1rem;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

const FormWrapper = styled.div`
  padding: 3rem 0;
  margin-left: 18rem;

  @media (max-width: 1200px) {
    margin: 0;
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ColTextos = styled.div`
  width: 50%;

  @media (max-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const MiniImagemBanner = styled.img`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Faixa1 = ({ servicos }) => {
  const [currentBanner, setCurrentBanner] = useState(1);
  const [currentMiniBanner, setCurrentMiniBanner] = useState(2);

  // setTimeout(() => {
  //   if (currentBanner === 1 && currentMiniBanner === 2) {
  //     setCurrentBanner(currentBanner + 1);
  //     setCurrentMiniBanner(currentMiniBanner - 1);
  //   } else if (currentBanner === 2 && currentMiniBanner === 1) {
  //     setCurrentBanner(currentBanner - 1);
  //     setCurrentMiniBanner(currentMiniBanner + 1);
  //   }
  // }, 5000);

  return (
    <Faixa1Wrapper
      background={`/static/images/home/banner.png`}
    >
      <BannerMobile background={`/static/images/home/banner1-mobile.png`} />
      <ColTextos>
        <TextosContainer>
          <TextosWrapper className="title-form">
            <BigTitle>
              INSTALE PAINÉIS
              <br /> SOLARES AF ENERGY
              <br /> NO SEU IMÓVEL
            </BigTitle>
            <SubTitle>
              Solicite seu orçamento:
              <img src="/static/images/icons/arrow.png" alt="Seta para baixo" />
            </SubTitle>
          </TextosWrapper>
          {/* <MiniImagemBanner
            src={`/static/images/home/mini-banner${currentMiniBanner}.png`}
          /> */}
        </TextosContainer>
        <TextosContainer>
          <FormWrapper>
            <FormularioHome />
          </FormWrapper>
        </TextosContainer>
      </ColTextos>
    </Faixa1Wrapper>
  );
};

export default Faixa1;
