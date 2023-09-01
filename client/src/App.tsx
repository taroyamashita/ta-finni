import './App.css';

import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { Main } from './Pages/Main./Main';

import { app, db } from './firebase';
import { Login } from './Pages/Login/Login';
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';



function App() {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const [patientData, setPatientData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const data = await getDocs(collection(db, "patientData"));
      const patientData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }))
      setPatientData(patientData);
    }
    fetchData()
    
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "patientData"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(newData)
      setPatientData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  if (loading) {
    // add a loading screen
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      {user ? <Main patientData={patientData} /> : <Login />}
    </div>
  );
}

export default App;
