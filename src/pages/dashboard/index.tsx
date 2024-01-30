import Head from "next/head";
import styles from "./styles.module.css"

export const Dashboard = () => {
    return(
        <div className={styles.container}>
        <Head>
        <title>Meu painel de Tarefas +|</title>
        </Head>
            <h1>Página de Dashboard</h1>
        </div>
    )
}
export default Dashboard;