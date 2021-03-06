import '../styles/Styles.css';
import React, { useState } from 'react';
import firebaseApp from '../firebase/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
import Loading from './Loading';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [estaRegistrandose, setestaRegistrandose] = useState(false);
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (estaRegistrandose) {
      if (pass === confPass) {
        await createUserWithEmailAndPassword(auth, mail, pass)
          .then((u) => {})
          .catch((err) => {
            console.log(err.code);
            console.log(err.message);
            setError(true);
          });
        // setError('');
      } else {
        setError(true);
      }
    } else {
      // try {
      await signInWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {})
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
          setError(true);
        });

      // setError('');
    }
    setLoading(false);
  };
  const singInWithGoogle = async (auth, googleProvider) => {
    setLoading(true);
    await signInWithRedirect(auth, googleProvider)
      .then((user) => {})
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
        setError(true);
      });
    setLoading(false);
  };
  const cambiaEstado = () => {
    setestaRegistrandose(!estaRegistrandose);
    setError(false);
    setMail('');
    setPass('');
    setConfPass('');
  };
  return (
    <div className="container b-background">
      <h1 className="text-center mb-3">
        {estaRegistrandose ? 'Registrarse' : 'Iniciar Sesi??n'}
      </h1>
      {loading && (
        <h2 className="text-center">
          <Loading />
        </h2>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            autoFocus
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contrase??a:
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </div>
        {estaRegistrandose && (
          <div className="mb-3">
            <label
              htmlFor="confirmExampleInputPassword1"
              className="form-label"
            >
              Confirmar contrase??a:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmExampleInputPassword1"
              onChange={(e) => setConfPass(e.target.value)}
              value={confPass}
            />
          </div>
        )}
        {error && (
          <div class="alert alert-danger mt-2" role="alert">
            Correo o contrase??a incorrectas.
          </div>
        )}
        <button type="submit" className="btn btn-primary me-2 mt-2">
          {estaRegistrandose ? 'Reg??strate' : 'Iniciar Sesi??n'}
        </button>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          onClick={() => singInWithGoogle(auth, googleProvider)}
        >
          <i className="bi bi-google"></i>&nbsp;
          {estaRegistrandose ? 'Reg??strate' : 'Iniciar sesi??n'} con Google
        </button>
      </form>
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={cambiaEstado}
      >
        {estaRegistrandose
          ? '??Ya tienes cuenta? Inicia sesi??n'
          : '??No tienes cuenta? Reg??strate'}
      </button>
    </div>
  );
};

export default Login;
