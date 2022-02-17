import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

import Container from "../components/ui/containers/Container";
import Banner from "../components/layout/Banner";

import { ButtonWrapper, ButtonHome } from "../components/conteudo/home/Faixa1";
import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";

const FaixaConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;
`;

const FaixaTextos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default function Blog({ posts }) {
  const formatDataPost = (data) => {
    let dataPost = new Date(data);
    dataPost = format(dataPost, "dd MMM", { locale: pt }).toUpperCase();

    return dataPost;
  };
  return (
    <>
      <Head>
        <title>AF Energy</title>
        <meta name="description" key="description" content="AF Energy" />
        <meta
          name="keywords"
          content="af energy, energia solar"
        />
        <meta property="og:title" key="og:title" content="AF Energy" />
        <meta
          property="og:description"
          key="og:description"
          content="AF Energy"
        />
      </Head>
      <Banner background="/static/images/blog/background.png">
        Blog &<br />
        Notícias
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <PostsWrapper>
              {posts.map((item, index) => {
                return (
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
                );
              })}
            </PostsWrapper>
            {/* <ButtonWrapper>
              <Link href="/">
                <ButtonHome
                  backColor="buttonPrimario"
                  backHoverColor="buttonSecundario"
                  fontHoverColor="buttonPrimario"
                >
                  CARREGAR MAIS POSTS
                </ButtonHome>
              </Link>
            </ButtonWrapper> */}
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}

export const getStaticProps = async () => {
  const response = await fetch(process.env.API_URL + "locais/noticias");
  const data = await response.json();

  return {
    props: { posts: data },
  };
};
