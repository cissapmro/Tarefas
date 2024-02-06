import styles from "../../styles/home.module.css";
import Image from "next/image";
import heroImage from "../../public/assets/hero.png";
import Head from "next/head";
import { GetStaticProps } from "next";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";

interface HomePosts {
  posts: number;
  comments: number;
}

export default function Home({ posts, comments}: HomePosts) {
  return (
   <div className={styles.container}>
    <Head>
      <title>Tarefas +| Organize as tarefas</title>
    </Head>
    <main className={styles.main}>
    <div className={styles.logoContent}>
      <Image  
        className={styles.hero}
        src={heroImage}
        alt="Logo Tarefas+"
        priority
      /> 
    </div>
    <h1 className={styles.title}>
    Sistema feito pra você organizar <br />
    seus estudos e tarefas.
    </h1>
    <div className={styles.infoContent}>
      <section className={styles.box}>
          <span>{posts} Posts</span>
      </section>
      <section className={styles.box}>
          <span>{comments} Comentários</span>
      </section>
    </div>
 </main>
   </div>
  );
}

//PAGINA ESTÁTICA - pega os dados do banco
export const getStaticProps: GetStaticProps = async() => {

  const commentRef = collection(db, "comments");
  const commentSnapshot = await getDocs(commentRef);

  const postRef = collection(db, "tarefas");
  const postSnapshot = await getDocs(postRef);

  return {
    props: {
      posts: postSnapshot.size || 0,
      comments: commentSnapshot.size || 0,
    },
    revalidate: 60 //revalidada a cada 60 segundos
  };
};
