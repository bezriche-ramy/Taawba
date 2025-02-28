import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

export const signUp = async(email, password, name) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        console.log('User created successfully');
        return user
    } catch (error) {
        console.error(error);
        return false;
    }
}