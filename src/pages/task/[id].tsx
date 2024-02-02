import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";

export const Task = () => {

    return(
        <div className={styles.container}>
            <Head>
                <title>Detalhes da Tarefa</title>
            </Head>
            <main className={styles.main}>
                <h1>Tarefas</h1>
            </main>
        </div>
       
    )
}
export default Task;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    //pega o id
    const id = params?.id as string;
   // console.log(id);
    //faz conexão com o banco e passa o id da tarefa
    const docRef = doc(db, 'tarefas', id);
    //aguarde para pegar os dados
    const snapshot = await getDoc(docRef);

    if(snapshot.data() === undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    };
    if(!snapshot.data()?.public) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
   console.log(snapshot.data());

    return {
        props: {}
    }

}
