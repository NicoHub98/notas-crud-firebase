import React, { useState } from 'react';
import firebaseApp from '../firebase/firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
const firestore = getFirestore(firebaseApp);

const AgregarNota = ({ listaNotas, setListaNotas, emailUsuario }) => {
  const [titulo, setTitulo] = useState('');
  const [nota, setNota] = useState('');

  const handleAgregar = async (e) => {
    e.preventDefault();
    //  Crear nueva lista
    const nuevaLista = [
      ...listaNotas,
      { id: +new Date(), titulo: titulo, nota: nota },
    ];

    //  Actualizar bd
    const docRef = doc(firestore, `usuarios/${emailUsuario}`);
    updateDoc(docRef, { nota: [...nuevaLista] });

    //  Actualizar estado
    setListaNotas(nuevaLista);
    setTitulo('');
    setNota('');
  };

  return (
    <div className="container animate__animated animate__fadeIn">
      <form onSubmit={handleAgregar}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nota" className="form-label">
            Nota:
          </label>
          <textarea
            type="text"
            className="form-control"
            id="nota"
            rows={3}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Agregar nota</button>
      </form>
    </div>
  );
};

export default AgregarNota;
