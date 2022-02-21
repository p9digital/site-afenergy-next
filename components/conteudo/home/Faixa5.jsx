import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Container from '../../ui/containers/Container';

import Paragraph from '../../ui/tipografia/Paragraph';

import {
  FaixaWrapperSimples,
  FaixaTextos,
} from './Faixa1';

const FaixaWrapper5 = styled(FaixaWrapperSimples)`
  @media (max-width: 600px) {
    padding: 0;
  }
`;

const PostsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin: 4rem 0 0;
`;

const Post = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 2rem;
  margin: 0 3rem 5rem;
  text-align: left;

  border-radius: 15px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  position: relative;

  &:hover {
    cursor: pointer;
    transition-duration: 0.3s;
    transform: scale(1.02);
  }

  @media (max-width: 600px) {
    margin: 0 0 5rem;

    &:hover {
      cursor: initial;
      transform: initial;
    }
  }

  span {
    background: ${(props) => props.theme.client.colors.azul};
    color: ${(props) => props.theme.client.colors.branco};
    border-radius: 10px;

    position: absolute;
    right: 35px;
    top: 42%;

    padding: 0.5rem;
    height: 5rem;
    width: 5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 1;
  }
  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  h1 {
    font-weight: 800;
    font-size: 1.6rem;
    color: ${(props) => props.theme.client.colors.azul};
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  a {
    font-size: 1.6rem;
    &:hover {
      text-decoration: underline;
    }
  }
  img {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const Faixa5 = ({ posts }) => {
  const formatDataPost = (data) => {
    let dataPost = new Date(data);
    dataPost = format(dataPost, 'dd MMM', { locale: pt }).toUpperCase();

    return dataPost;
  };
  return (
    <FaixaWrapper5>
      <Container>
        <FaixaTextos>
          <Paragraph>
            <strong>Informações Úteis</strong>
          </Paragraph>
          <PostsWrapper>
            {posts.slice(0, 3).map((item, index) => (
              <Link href={`posts/${item.path}`} key={index}>
                <Post>
                  <img
                    src="/static/images/home/post0.png"
                    alt={item.titulo}
                  />
                  <span>{formatDataPost(item.data_noticia)}</span>
                  <h2>{item.categoria}</h2>
                  <h1>{item.titulo}</h1>
                  <p>{item.resumo}</p>
                  <a>Saiba mais</a>
                </Post>
              </Link>
            ))}
          </PostsWrapper>

          {/* <Paragraph>
            Encontre a AF Energy mais próxima de você e<br /> faça agora sua
            simulação!
          </Paragraph>
          <ButtonWrapper>
            <Link href="/unidades" passHref>
              <ButtonHome
                backColor="buttonPrimario"
                backHoverColor="buttonSecundario"
              >
                Faça uma Simulação
              </ButtonHome>
            </Link>
          </ButtonWrapper> */}
        </FaixaTextos>
      </Container>
    </FaixaWrapper5>
  );
};

Faixa5.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    titulo: PropTypes.string.required,
    path: PropTypes.string.required,
    resumo: PropTypes.string,
    categoria: PropTypes.string,
    data_noticia: PropTypes.string,
  })).isRequired
};

Faixa5.defaultProp = {
  posts: []
};

export default Faixa5;
