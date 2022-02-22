import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import firebaseApp from './firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const auth = getAuth(firebaseApp);
const firebase = getFirestore(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //  Existe una sesión iniciada
      setUsuarioGlobal(usuarioFirebase);
    } else {
      //  No existe una sesión iniciada
      setUsuarioGlobal(null);
    }
  });

  return (
    <>
      {usuarioGlobal ? <Home emailUsuario={usuarioGlobal.email} /> : <Login />}
    </>
  );
}

export default App;
