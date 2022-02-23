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
  const [error, setError] = useState('');

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
            setError('Datos incorrectos');
          });
        // setError('');
      } else {
        setError('Las contraseñas deben coincidir');
      }
    } else {
      // try {
      await signInWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {})
        .catch((err) => {
          console.log(err.code);
          console.log(err.message);
          setError('Datos incorrectos');
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
        setError('Datos incorrectos');
      });
    setLoading(false);
  };
  const cambiaEstado = () => {
    setestaRegistrandose(!estaRegistrandose);
    setError('');
    setMail('');
    setPass('');
    setConfPass('');
  };
  return (
    <div className="container my-5 dark-theme">
      <h1 className="text-center">
        {estaRegistrandose ? 'Registrarse' : 'Iniciar Sesión'}
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
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña:
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
              Confirmar contraseña:
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
        {error !== '' && <div className="text-danger h3">{error}</div>}
        <button type="submit" className="btn btn-primary me-2 mt-2">
          {estaRegistrandose ? 'Regístrate' : 'Iniciar Sesión'}
        </button>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          onClick={() => singInWithGoogle(auth, googleProvider)}
        >
          <i className="bi bi-google"></i>&nbsp;
          {estaRegistrandose ? 'Regístrate' : 'Inicia sesión'} con Google
        </button>
      </form>
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={cambiaEstado}
      >
        {estaRegistrandose
          ? '¿Ya tienes cuenta? Inicia sesión'
          : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  );
};

export default Login;
