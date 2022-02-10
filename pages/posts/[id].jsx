import Head from "next/head";
import styled from "styled-components";
import Link from "next/link";

import Paragraph from "../../components/ui/tipografia/Paragraph";
import Title from "../../components/ui/tipografia/Title";

import Container from "../../components/ui/containers/Container";
import Banner from "../../components/layout/Banner";

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
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const PostsContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const TextoWrapper = styled.div`
  width: 60%;

  @media (max-width: 900px) {
    margin-bottom: 4rem;
    width: 100%;
  }
`;

const TitleRecentes = styled(Title)`
  max-width: 300px;
  text-align: left;
  width: 100%;
`;

const PostsWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
  }
  @media (max-width: 900px) {
    align-items: center;
    width: 100%;
  }
`;

const PostCard = styled.div`
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

const PostConteudo = styled.div`
  p {
    margin-bottom: 1rem;
  }
`;

export default function Post({ posts, currentPost }) {
  const formatDataPost = (data) => {
    let dataPost = new Date(data);
    dataPost = format(dataPost, "dd MMM", { locale: pt }).toUpperCase();

    return dataPost;
  };
  return (
    <>
      <Head>
        <title>AF Crédito</title>
        <meta name="description" key="description" content="AF Crédito" />
        <meta
          name="keywords"
          content="af crédito, af crédito franquia, franquia de crédito, franquia home office, franquia financeira home office, af credito franqueado, af crédito faturamento, af crédito valor de investimento, af crédito soluções financeiras, franquia crédito consignado home office, franquia mini agência bancária, franquia financeira barata, franquia financeira retorno"
        />
        <meta property="og:title" key="og:title" content="AF Crédito" />
        <meta
          property="og:description"
          key="og:description"
          content="AF Crédito"
        />
      </Head>
      <Banner background="/static/images/blog/background_post.png">
        {currentPost.titulo}
      </Banner>
      <Container>
        <FaixaConteudo>
          <FaixaTextos>
            <TextoWrapper>
              <Title margem="0 0 4rem 0">{currentPost.titulo}</Title>
              <PostConteudo
                dangerouslySetInnerHTML={{ __html: currentPost.corpo }}
              />
            </TextoWrapper>
            <PostsWrapper>
              <TitleRecentes margem="0 0 2rem 0">
                Últimas postagens
              </TitleRecentes>
              <PostsContainer>
                {posts.slice(0, 2).map((item, index) => {
                  return (
                    <Link href={`${item.path}`} key={index}>
                      <PostCard>
                        <img
                          src="/static/images/home/post0.png"
                          alt={item.titulo}
                        />
                        <span>{formatDataPost(item.data_noticia)}</span>
                        <h2>{item.categoria}</h2>
                        <h1>{item.titulo}</h1>
                        <p>{item.resumo}</p>
                        <a>Saiba mais</a>
                      </PostCard>
                    </Link>
                  );
                })}
              </PostsContainer>
            </PostsWrapper>
          </FaixaTextos>
        </FaixaConteudo>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch(process.env.API_URL + "locais/noticias");
  const data = await response.json();

  const paths = data.map((post) => {
    return {
      params: { id: post.path.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const response = await fetch(process.env.API_URL + "locais/noticias");
  const data = await response.json();

  const id = context.params.id;
  const currentPost = data.find((post) => post.path == id);

  return {
    props: {
      posts: data,
      currentPost,
    },
  };
};
