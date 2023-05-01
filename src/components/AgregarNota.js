import React, { useState } from "react";
import firebaseApp from "../firebase/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

const AgregarNota = ({
  listaNotas,
  setListaNotas,
  emailUsuario,
  setHayNotas,
  titulo,
  setTitulo,
  nota,
  setNota,
}) => {
  const [error, setError] = useState(false);

  const handleAgregar = async (e) => {
    e.preventDefault();

    //  Agregar
    if (titulo !== "" && nota !== "") {
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
      setTitulo("");
      setNota("");
      setHayNotas(nuevaLista.length);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="container animate__animated animate__fadeIn agregarNota">
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
        <button className="btn btn-primary">Guardar</button>
      </form>
      {error && (
        <div class="alert alert-danger mt-2" role="alert">
          Debes agregar título y nota.
        </div>
      )}
    </div>
  );
};

export default AgregarNota;
