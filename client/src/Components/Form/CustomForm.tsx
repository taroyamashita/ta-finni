import { FieldValue, collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
type FormData = {
    age: string;
    name: string;
  };


interface CustomFormProps {
    setPatientData: React.Dispatch<any>
}
export function CustomForm(props: CustomFormProps) {
 const {setPatientData} = props;
  const [formStructure, setFormStructure] = useState([]);
  const [formData, setFormData] = useState({});
  const auth = getAuth(app);
  const [user] = useAuthState(auth)
  // logic for adding, removing, reordering form fields
  
  const saveForm = async () => {
    // logic for saving form to Firestore
    await setDoc(doc(db, "forms", "myform"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
        uid: user!.uid
      });
  };

  const saveToFirebase = async (data: FormData) => {
    const { age, name } = data;
    try {
      await setDoc(doc(db, "patientData", uuidv4() ), {
        age,
        name,
        uid: user!.uid,
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
    reset();
  };


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "patientData"), (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatientData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const onSubmit = handleSubmit(data => saveToFirebase(data));
  // firstName and lastName will have correct type

  return (
    <form onSubmit={onSubmit}>
      <label>Name</label>
      <input {...register("name")} />
      <label>Age</label>
      <input {...register("age")} />
      <button type="submit">Submit</button>
    </form>
  );
    
}
