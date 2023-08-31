import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebase"
import { CustomForm } from "../../Components/Form/CustomForm";
import { CustomTable } from "../../Components/Table/CustomTable";
import './Main.css';
import { useState } from "react";

interface PatientDataProps {
    patientData: [];
}

export const Main: React.FC<PatientDataProps> = (props: PatientDataProps) => { 
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const [formsOrTable, setFormsOrTable] = useState<string>("forms");
  
    function SignOut() {
      return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
      )
    }
  
    return(
      <div className="main-container">
        <div className="left-bar">
          <div className="header-container">
            <h1>Welcome {user?.displayName}</h1>
            <SignOut />
          </div>
          <ul className="navigation">
            <li className={formsOrTable === 'forms' ? 'selected' : ''} onClick={() => setFormsOrTable("forms")}>Forms</li>
            <li className={formsOrTable === 'table' ? 'selected' : ''} onClick={() => setFormsOrTable("table")}>Table</li>
          </ul>
        </div>
        <div className="right-content">
          <div>
            {formsOrTable === "forms" && <CustomForm />}
            {formsOrTable === "table" && <CustomTable patientData = {props.patientData} />}
          </div>
        </div>
      </div>
    )
  }

  
  
  
  
  