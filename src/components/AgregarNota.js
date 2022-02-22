import React from 'react';

const AgregarNota = () => {
  return (
    <div className="container animate__animated animate__fadeIn">
      <form>
        <div className="mx-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input type="text" className="form-control" id="titulo" />
        </div>
        <div className="mx-3">
          <label htmlFor="nota" className="form-label">
            Nota:
          </label>
          <textarea type="text" className="form-control" id="nota" rows={3} />
        </div>
      </form>
    </div>
  );
};

export default AgregarNota;
