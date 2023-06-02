import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import React,{useState} from 'react'
import AuthOrganization from './componenets/AuthOrganization';
//----
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_37F5QNe0OXZvujeVxb-yM34n2I6tLQc",
  authDomain: "expo-test-64393.firebaseapp.com",
  projectId: "expo-test-64393",
  storageBucket: "expo-test-64393.appspot.com",
  messagingSenderId: "183312411105",
  appId: "1:183312411105:web:3e15dfa4a4922d08e34aa0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//----------------

export default function App() {

  const [text, setText] = useState('');
  const [pw, setPw]=useState('')
  const Check= ()=>{
    console.log(pw,text)
    createUserWithEmailAndPassword(auth, text, pw)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(userCredential)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Text></Text> */}
      <TextInput
        style={{height: 40}}
        placeholder="name"
        // onChangeText={newText => setText(newText)}
        onChangeText={newText => setText(newText)}
      />
            <TextInput
        style={{height: 40}}
        placeholder="pw"
        onChangeText={newPw => setPw(newPw)}
        // onChangeText={newText => setText(newText)}
      />
      <Button
        title="Press me"
        onPress={() => Check()}
      />
      <StatusBar style="auto" />
      <AuthOrganization/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
