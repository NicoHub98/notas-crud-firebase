import React from 'react';
import firebaseApp from '../firebase/firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import Loading from './Loading';
const firestore = getFirestore(firebaseApp);

const ListaNotas = ({
  listaNotas,
  setListaNotas,
  emailUsuario,
  hayNotas,
  setHayNotas,
  loading,
}) => {
  const handleEliminar = async (idNota) => {
    //  Crear nueva lista
    const nuevaLista = listaNotas.filter((obj) => obj.id !== idNota);

    //  Actualizar bd
    const docRef = doc(firestore, `usuarios/${emailUsuario}`);
    updateDoc(docRef, { nota: [...nuevaLista] });

    //  Actualizar state
    setListaNotas(nuevaLista);
    setHayNotas(nuevaLista.length);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="container">
      {!hayNotas && <h2>No hay notas..</h2>}
      <table className="table text-center">
        <tbody>
          {listaNotas.map((nota) => {
            return (
              <tr key={nota.id}>
                <td>
                  <div>
                    {/* Elemento */}
                    <div
                      className="accordion accordion-flush"
                      id="accordionFlushExample"
                    >
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={`panelsStayOpen-heading${nota.id}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapse${nota.id}`}
                            aria-expanded="true"
                            aria-controls={`panelsStayOpen-collapse${nota.id}`}
                          >
                            {nota.titulo}
                          </button>
                        </h2>
                        <div
                          id={`panelsStayOpen-collapse${nota.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`panelsStayOpen-heading${nota.id}`}
                        >
                          <div className="accordion-body">{nota.nota}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminar(nota.id)}
                  >
                    Eliminar
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListaNotas;
