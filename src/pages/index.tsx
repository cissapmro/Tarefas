import styles from "../../styles/home.module.css";
import Image from "next/image";
import heroImage from "../../public/assets/hero.png";
import Head from "next/head";


export default function Home() {
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
          <span>12 posts</span>
      </section>
      <section className={styles.box}>
          <span>14 posts</span>
      </section>
    </div>
 </main>
   </div>
  );
}
