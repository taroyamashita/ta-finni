import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebase"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export const Main: React.FC = () => { 

    const auth = getAuth(app)
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            console.log(user)
            const db = getFirestore(app);
            const data = await getDoc(doc(db, "users", user.uid));
            console.log(data.data());
            setUserData(data.data());
        }
        fetchData();
    }, []);

    function SignOut() {
        return auth.currentUser && (
          <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
        )
      }
    return(
        <div>
            <h1>Welcome {user?.displayName}</h1>
            <SignOut />
        </div>
    )
}