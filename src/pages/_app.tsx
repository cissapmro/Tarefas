import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../componentes/header";
import { SessionProvider } from 'next-auth/react';
import { PageProps } from './../../../DIVERSOS/tarefas/.next/types/app/page';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
    <Header />
    <Component {...pageProps} />
    </SessionProvider>
  )
}
