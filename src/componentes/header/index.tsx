import Link from "next/link";
import styles from "./styles.module.css"
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {

    const { data: session, status } = useSession();
    
    return(
        <header className={styles.header}>
            <section className={styles.content}>
                <nav className={styles.nav}>
                    <Link href="/">
                    <h1 className={styles.logo}>
                        Tarefas<span>+</span>
                        </h1>
                     </Link>
                     {session?.user && (
                        <Link className={styles.link} href="/dashboard">
                            Meu Painel
                        </Link>
                   )}
                      <Link className={styles.link} href="/dashboard">
                            Meu Painel
                        </Link>
                   
                </nav>
                { status === "loading" ? (
                    <></>
                ): session ? (
                    <button onClick={() => signOut()} className={styles.loginButton}>
                        Olá, {session.user?.name}
                    </button>
                ): (
                    <button onClick={() => signIn("google")}className={styles.loginButton}>
                        Acessar
                    </button>
                )}
            </section>
        </header>
    );
}
export default Header;