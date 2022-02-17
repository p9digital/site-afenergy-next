import Head from "next/head";

import Faixa1 from "../components/conteudo/home/Faixa1";
import Faixa2 from "../components/conteudo/home/Faixa2";
import Faixa3 from "../components/conteudo/home/Faixa3";
import Faixa4 from "../components/conteudo/home/Faixa4";
import Faixa5 from "../components/conteudo/home/Faixa5";

export default function Home({ servicos, posts }) {
  return (
    <>
      <Head>
        <title>AF Energy</title>
        <meta
          name="description"
          key="description"
          content="AF Energy"
        />
        <meta
          name="keywords"
          content="af energy, energia solar"
        />
        <meta
          property="og:title"
          key="og:title"
          content="AF Energy"
        />
        <meta
          property="og:description"
          key="og:description"
          content="AF Energy"
        />
      </Head>
      <Faixa1 servicos={servicos} />
      <Faixa2 servicos={servicos} />
      <Faixa3 />
      <Faixa4 />
      <Faixa5 posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  let response = await fetch(process.env.API_URL + "locais/servicos");
  const servicos = await response.json();

  response = await fetch(process.env.API_URL + "locais/noticias");
  const posts = await response.json();

  return {
    props: { servicos, posts },
  };
};

//redeploy
