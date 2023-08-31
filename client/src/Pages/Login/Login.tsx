import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebase";

export const Login: React.FC = () => {

    const auth = getAuth(app)
    const [user] = useAuthState(auth);
  
    function SignIn() {
      const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
      }
    
      return (
        <>
          <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        </>
      )
    
    }
    return(
            <SignIn />
    )

}