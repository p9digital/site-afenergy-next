import styled, { keyframes } from 'styled-components';
import Container from '../../ui/containers/Container';
import Paragraph from '../../ui/tipografia/Paragraph';

import FormularioEncontrarHome from '../../formulario/FormularioEncontrarHome';
import Icon from '../../ui/icons/Icon';
import { FaixaWrapperSimples, FaixaTextos } from './Faixa1';

const LogosWrapper = styled.div`
  width: 100%;
  margin: 5rem 0 5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  img {
    height: 5rem;
    width: auto;
    margin: 2rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin: 3rem 0 5rem;
`;

const RedesWrapper = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0.5rem;
  }
  p {
    margin-right: 2rem;
  }
`;

const Faixa4 = () => {
  return (
    <FaixaWrapperSimples>
      <Container>
        <FaixaTextos>
          <LogosWrapper>
            <img src="/static/images/home/logos/itau.png" alt="Itaú" />
            <img
              src="/static/images/home/logos/caixa.png"
              alt="Caixa Consórcios"
            />
            <img src="/static/images/home/logos/bradesco.png" alt="Bradesco" />
            <img src="/static/images/home/logos/allianz.png" alt="Allianz" />
            <img src="/static/images/home/logos/safra.png" alt="Safra" />
            <img
              src="/static/images/home/logos/santander.png"
              alt="Santander"
            />
          </LogosWrapper>
          <Paragraph>
            <strong>Encontre a AF Crédito mais próxima de você!</strong>
          </Paragraph>
          <FormWrapper>
            <FormularioEncontrarHome/>
          </FormWrapper>
          <RedesWrapper>
            <Paragraph>Siga a AF Crédito nas Redes Sociais:</Paragraph>
            <a href="https://www.facebook.com/afcredito.brasil" target="_blank">
              <Icon
                className="hover"
                icon="facebook-square"
                cor="#143562"
                tamanho="4.5rem"
                tipo="svg"
              />
            </a>
            <a href="https://www.instagram.com/afcredito/" target="_blank">
              <Icon
                className="hover"
                icon="instagram"
                cor="#143562"
                tamanho="4.5rem"
                tipo="svg"
              />
            </a>
          </RedesWrapper>
        </FaixaTextos>
      </Container>
    </FaixaWrapperSimples>
  );
};

export default Faixa4;
