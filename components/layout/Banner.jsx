import styled from 'styled-components';
import Container from '../ui/containers/Container';
import { FaixaWrapperSimples } from '../conteudo/home/Faixa1';

const FaixaBackground = styled(FaixaWrapperSimples)`
  background: url("/static/images/banner-detalhe.png") no-repeat;
  background-position: right center;
  background-size: cover;
  position: relative;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.client.colors.azul};
  text-transform: uppercase;
  text-align: center;
  font-size: 4.8rem;
  line-height: 1.1;
  margin-bottom: 2rem;

  @media (max-width: 1110px) {
    font-size: 3.6rem;
  }
  @media (max-width: 900px) {
    font-size: 3.2rem;
  }
`;

const FaixaBanner = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  text-align: left;

  position: relative;

  @media (max-width: 900px) {
    width: 100%;
    text-align: center;
  }
`;

const Seta = styled.img`
  margin: 0 auto;
  width: 2.5rem;
`;

const SideBackground = styled.img`
  margin-left: -2rem;
  width: 50%;
  height: 100%;
  display: block;
`;

const Banner = ({ children, background }) => {
  return (
    <FaixaBackground background={background}>
      <SideBackground src={background} />
      <FaixaBanner>
        <PageTitle>{children}</PageTitle>
        <Seta src="/static/images/seta.png" alt="Seta para baixo" />
      </FaixaBanner>
    </FaixaBackground>
  );
};

export default Banner;
