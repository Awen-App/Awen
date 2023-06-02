import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";


export default firebaseConfig = {
    apiKey: "AIzaSyA_37F5QNe0OXZvujeVxb-yM34n2I6tLQc",
    authDomain: "expo-test-64393.firebaseapp.com",
    projectId: "expo-test-64393",
    storageBucket: "expo-test-64393.appspot.com",
    messagingSenderId: "183312411105",
    appId: "1:183312411105:web:3e15dfa4a4922d08e34aa0"
  };

  const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 export const googleAuthProvider=new GoogleAuthProvider();