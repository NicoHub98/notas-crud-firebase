import React, { useEffect, useState } from 'react';
import AgregarNota from './AgregarNota';
import ListaNotas from './ListaNotas';
import firebaseApp from '../firebase/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ emailUsuario }) => {
  const [loading, setLoading] = useState(false);
  const [listaNotas, setListaNotas] = useState(null);
  const [btnAgregarNota, setBtnAgregarNota] = useState(false);

  const fakeData = [
    { id: 1, titulo: 'Nota 1', nota: 'Descripción de nota 1' },
    { id: 2, titulo: 'Nota 2', nota: 'Descripción de nota 2' },
  ];
  async function buscarCrearDoc(idDocumento) {
    //  Referencia al doc
    const docRef = doc(firestore, `usuarios/${idDocumento}`);

    //  Buscar
    const consulta = await getDoc(docRef);

    //  Revisar si existe
    if (consulta.exists()) {
      //  Existe
      const infoUsuario = consulta.data();
      return infoUsuario.nota;
    } else {
      //  No existe
      await setDoc(docRef, { nota: [...fakeData] });
      const consulta = await getDoc(docRef);
      const infoUsuario = consulta.data();
      return infoUsuario.nota;
    }
  }

  useEffect(() => {
    async function fetchNotas() {
      setLoading(true);
      const notasFetch = await buscarCrearDoc(emailUsuario);
      setListaNotas(notasFetch);
      setLoading(false);
    }
    fetchNotas();
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <h1>Hola {emailUsuario}!</h1>
          <button className="btn btn-primary" onClick={() => signOut(auth)}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <hr />
      <button
        className="btn btn-dark mb-3"
        onClick={() => setBtnAgregarNota(!btnAgregarNota)}
      >
        Agregar Nota
      </button>
      {btnAgregarNota && (
        <AgregarNota
          listaNotas={listaNotas}
          setListaNotas={setListaNotas}
          emailUsuario={emailUsuario}
        />
      )}
      <hr />
      {listaNotas && (
        <ListaNotas
          listaNotas={listaNotas}
          setListaNotas={setListaNotas}
          emailUsuario={emailUsuario}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Home;
