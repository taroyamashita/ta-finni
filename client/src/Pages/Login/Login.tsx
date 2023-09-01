import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebase";
import { Avatar, Button } from "@mui/material";

export const Login: React.FC = () => {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
  
    function SignIn() {
      const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
      };
  
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={signInWithGoogle}
          startIcon={
            <Avatar
              alt="Google Logo"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              sx={{ width: 24, height: 24 }}
            />
          }
        >
          Sign in with Google
        </Button>
      );
    }
  
    return <SignIn />;
  };