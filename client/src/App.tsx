import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp }from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Main } from './Pages/Main./Main';

import { app } from './firebase';
import { Login } from './Pages/Login/Login';





function App() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  
  if (loading) {
    return <Main />;  // Optimistically assuming user is logged in
  }

  return (
    <div className="App">
      {user ? <Main /> : <Login />}
    </div>
  );
}

export default App;
