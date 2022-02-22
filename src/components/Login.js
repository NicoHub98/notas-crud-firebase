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
    const email = e.target.exampleInputEmail1.value;
    const password = e.target.exampleInputPassword1.value;
    console.log(email, password);

    if (estaRegistrandose) {
      const confirmPassword = e.target.confirmExampleInputPassword1.value;
      if (password === confirmPassword) {
        const usuario = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setError('');
      } else {
        setError('Las contraseñas deben coincidir');
      }
    } else {
      signInWithEmailAndPassword(auth, email, password);
      setError('');
    }
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
    <div className="container">
      {loading && <Loading />}
      <h1>{estaRegistrandose ? 'Regístrate' : 'Inicia Sesión'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
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
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </div>
        {error !== '' && <div className="text-danger">{error}</div>}
        {estaRegistrandose && (
          <div className="mb-3">
            <label
              htmlFor="confirmExampleInputPassword1"
              className="form-label"
            >
              Confirm password
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
        <button type="submit" className="btn btn-dark">
          {estaRegistrandose ? 'Regístrate' : 'Inicia Sesión'}
        </button>
        <button
          type="submit"
          className="btn btn-primary m-2"
          onClick={() => signInWithRedirect(auth, googleProvider)}
        >
          Inicia con Google
        </button>
      </form>
      <button
        type="button"
        className="btn btn-secondary"
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
