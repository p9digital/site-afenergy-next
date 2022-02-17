import styled from 'styled-components';

import Title from '../../ui/tipografia/Title';
import Paragraph from '../../ui/tipografia/Paragraph';

import { FaixaWrapperSimples } from './Faixa1';

import { vantagens } from '../../../helpers/dados';

const Faixa3Wrapper = styled(FaixaWrapperSimples)`
  background-image: url('/static/images/home/background-vantagens.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  padding: 15rem 0;
  margin-bottom: 10rem;

  @media (max-width: 768px) {
    background-image: url('/static/images/home/half_background_mobile.png');
    margin-bottom: 10px;
    padding: 0;
  }
`;

const Faixa3WrapperBannerMobile = styled.div`
  background: url('/static/images/home/personagem_mobile.png') no-repeat center;
  background-size: cover;
  display: none;
  height: 80vw;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SideContainer = styled.div`
  width: 50%;
  position: relative;

  margin-top: 5rem;
  padding: 5rem 0;

  h1 {
    color: ${props => props.theme.client.colors.branco};
    margin-bottom: 3rem;
  }
  p {
    color: ${props => props.theme.client.colors.branco};
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    width: 100%;
  }
`;

const TextosWrapper = styled.div`
  max-width: 500px;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
  }
`;

const Vantagem = styled.div`
  margin-bottom: 4rem;

  img {
    width: 3rem;
  }

  @media (max-width: 768px) {
    margin: 0 auto 40px;
    max-width: 400px;
    text-align: center;
  }
`;

const Legenda = styled.h2`
  bottom: -200px;
  color: #eaebef;
  font-size: 4.6rem;
  left: -380px;
  line-height: 1.2;
  max-width: 250px;
  position: absolute;

  @media (max-width: 768px) {
    bottom: 0;
    left: 0;
    margin: 0 auto 50px;
    position: relative;
    text-align: center;
  }
`;

const Faixa3 = () => {
  return (
    <Faixa3Wrapper>
      {/* <Faixa3WrapperBannerMobile /> */}
      <FaixaConteudo>
        <SideContainer>
          <TextosWrapper>
            <Title margem="0 0 4rem 0">
            VANTAGENS DOS SISTEMAS FOTOVOLTAICOS PARA GERAÇÃO DE ENERGIA:
            </Title>
            {vantagens.map((item, index) => {
              return (
                <Vantagem key={index}>
                  <img
                    src={`/static/images/home/icones/vantagem${index}.png`}
                  />
                  <Paragraph><strong>{item}</strong></Paragraph>
                </Vantagem>
              );
            })}
          </TextosWrapper>
          <Legenda>PENSADO PARA VOCÊ.</Legenda>
        </SideContainer>
      </FaixaConteudo>
    </Faixa3Wrapper>
  );
};

export default Faixa3;
