import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        if( user)
        {
            sessionStorage.setItem(
                "user",
                JSON.stringify({
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL, 
                })
              );
            return true
        }
        else{
            return false
        }
        
    } catch (error) {
        console.error(error);
        return false;
    }
}