import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";
import { 
    doc, 
    getDoc,
    getDocs,
    collection,
    where,
    addDoc,
    query

} from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";
import Textarea from "@/src/componentes/textArea";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface TaskProps {
    item: {
        tarefa: string,
        public: boolean,
        created: string,
        user: string,
        taskId: string
    };
    allComments: CommentProps[]
}

interface CommentProps {
    id: string,
    comment: string,
    taskId: string,
    user: string,
    name: string
}
  
export const Task = ({ item, allComments }: TaskProps) => {

    const { data: session } = useSession();

    const [input, setInput] = useState("");

    const [comments, setComments] = useState(allComments || []);

    const handleComment = async(event: FormEvent) => {
      //  alert('teste');
      event.preventDefault();
       if(input === "") return;
        if(!session?.user?.name || !session?.user?.email) return;

        try{
            const docRef = await addDoc(collection(db, 'comments'), {
                comment: input,
                created: new Date(),
                user: session?.user?.email,
                name: session?.user?.name,
                taskId: item?.taskId
            })
             
            setInput('');

        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>Detalhes da Tarefa</title>
            </Head>
            <main className={styles.main}>
                <h1>Tarefa</h1>

                <article className={styles.task}>
                    <p>{item.tarefa}</p>
                </article>
            </main>
            <section className={styles.commentsContainer}>
                <h2>Deixar comentário</h2>
                <form onSubmit={handleComment}>
                <Textarea 
                placeholder="Digite o comentário"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setInput(event.target.value)}
                />
                <button 
                disabled={!session?.user}
                className={styles.button}>Enviar comentário</button>
                </form>
            </section>
            <section className={styles.commentsContainer}>
                    <h2>Todos os comentários</h2>
                    {comments.length === 0 && (
                    <span>Nenhum comentário.</span>
                    )}
                    {comments.map((item) => (
                    <article key={item.id} className={styles.comments}>
                        <div className={styles.headComments}>
                            <label className={styles.commentsLabel}>{item.name}</label>
                            <button>
                                <FaTrash size={18} color="orange" />
                            </button>
                        </div>
                        <p>{item.comment}</p>
                    </article>
                    ))}
            </section>

        </div>

    )
}
export default Task;

//Antes de renderizar a página a função é executada.
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    //pega o id
    const id = params?.id as string;
   // console.log(id);
    //faz conexão com o banco e passa o id da tarefa
    const docRef = doc(db, 'tarefas', id);

    //PEGAR OS COMENTÁRIOS DO BANCO
    const q = query(collection(db, "comments"), where("taskId", "==", id))

    const snapshotComments = await getDocs(q)

    //ARRAY  allComments VAI RECEBER OS DADOS
    let allComments: CommentProps[] = [];
      snapshotComments.forEach((doc) => {
        allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            taskId: doc.data().taskId,
            user: doc.data().user,
            name: doc.data().name
        });
    });

    //console.log(allComments);

    //aguarde para pegar os dados  - 
//snapshot: Como se fosse foto do exato momento da rota.
    const snapshot = await getDoc(docRef);

    //se digitar na url uma tarefa que não existe.
    if(snapshot.data() === undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    };
    //se public for false
    if(!snapshot.data()?.public) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
  // console.log(snapshot.data());

   //converter a data do created porque etá vindo como timestamp
   const milissegundos = snapshot.data()?.created?.seconds * 1000;
 //  const data = new Date(snapshot.data()?.created?.seconds * 1000).toLocaleDateString();
   
   //CRIAR O OBJETO DE COMO EU QUERO QUE SEJA DEVOLVIDO.
   const task = {
    tarefa: snapshot.data()?.tarefa, //? porque pode ser vazio
    public: snapshot.data()?.public,
    created: new Date(milissegundos).toLocaleDateString(),
   // created: data,
    user: snapshot.data()?.user,
    taskId: id
   
   }

 //  console.log(task);

    return {
        props: {
            item: task, //propriedade item vai ter o objeto task que montamos. passar esta propriedade para o componente.
            allComments: allComments
        }
    }

}
