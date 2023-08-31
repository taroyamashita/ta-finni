import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebase"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CustomForm } from "../../Components/Form/CustomForm";
import { CustomTable } from "../../Components/Table/CustomTable";

interface PatientDataProps {
    patientData: [];
    setPatientData: React.Dispatch<any>;
}

export const Main: React.FC<PatientDataProps> = (props: PatientDataProps) => { 

    const auth = getAuth(app)
    const [user] = useAuthState(auth);

    function SignOut() {
        return auth.currentUser && (
          <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
        )
      }
    return(
        <div>
            <h1>Welcome {user?.displayName}</h1>

            <SignOut />
            <div>
                <CustomForm setPatientData={props.setPatientData} />
            </div>
            <div>
                <CustomTable patientData = {props.patientData} />
            </div>
        </div>
    )
}