
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //para conectar ao banco de dados

const firebaseConfig = {
  apiKey: "AIzaSyDR-jFSUB-D18hI4NAawZ8k1irmc-e-g9s",
  authDomain: "tarefasplus-e3634.firebaseapp.com",
  projectId: "tarefasplus-e3634",
  storageBucket: "tarefasplus-e3634.appspot.com",
  messagingSenderId: "59849087105",
  appId: "1:59849087105:web:25c801a747825faa239580"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };

