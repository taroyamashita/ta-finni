import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import './CustomForm.css';



export interface FormTemplate extends Record<string, any> {
  id: string;
  fields: InputField[];
}


type InputField = {
  name: string;
  label: string;
  isRequired: boolean;
}

// InputFieldProps.ts
type InputFieldProps = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'password'; // Add any additional types you need
};

// DynamicFormData.ts
type DynamicFormData = {
  [key: string]: any;
};

interface DynamicFormProps {
  fields: InputFieldProps[];
  onSubmit: (data: DynamicFormData) => Promise<void>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const { handleSubmit, control, reset } = useForm<DynamicFormData>();

  const onSubmitAndReset = async (data: DynamicFormData) => {
    await onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmitAndReset)}>
    {fields.map((field, index) => (
      <div className="form-group" key={index}>  {/* <- Added the "form-group" class */}
        <label>{field.label}</label>
        <Controller
          name={field.name}
          control={control}
          render={({ field }) => <input {...field} type={'text'} />}
        />
      </div>
    ))}
    <button type="submit">Submit</button>
  </form>
  );
};



export function CustomForm() {
  const auth = getAuth(app);
  const [user] = useAuthState(auth)

  const [formTemplate, setFormTemplate] = useState<FormTemplate>({id: '', fields: []});

  useEffect(() => {
    // get all the forms
    const unsubscribe = onSnapshot(collection(db, "forms"), (snapshot) => {
      const newData: FormTemplate[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }as FormTemplate));
      setFormTemplate(newData[0]);
    });

    return () => {
      unsubscribe()
    }
  }, []);

  // logic for adding, removing, reordering form fields
  
  const saveFormTemplate = async (formTemplate: FormTemplate) => {
    try {
       // logic for saving form to Firestore
      await setDoc(doc(db, "forms", formTemplate.id), {
        name:  "Untitled Form",
        fields: formTemplate.fields,
        uid: user!.uid
      });
    } catch (e) {
      console.log(e)
    }
   
  };

  const savePatientData = async (data: DynamicFormData) => {
    try {
      await setDoc(doc(db, "patientData", uuidv4() ), {
        ...data,
        uid: user!.uid,
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const addFormField = () => {
    const name = prompt("add form field name");
    if(!name) return;
    setFormTemplate((prev) => ({
      ...prev,
      fields: [...prev.fields, {name, label: name, isRequired: false}]
    }));
  }


  return (
    <>
      <DynamicForm fields={formTemplate.fields} onSubmit={savePatientData} />
      <div className="button-group">
      <button onClick={addFormField}>Add form field</button>
      <button onClick={() => saveFormTemplate(formTemplate)}>Save Form</button>
    </div>

    </>
  );   
}
