import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import { auth,googleAuthProvider } from '../fireBaseConfig'
import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from "firebase/auth";
function AuthOrganization() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    console.log(auth?.currentUser?.email)
    const signIn=async()=>{
        try{
         await createUserWithEmailAndPassword(auth,email,password);
         await axios.post("http://localhost",email) ;
         console.log(auth.currentUser.email)
        }
        catch(err){
            console.log(err)
        }
    }
    const signInWthGoogle=async()=>{
        try{
         await signInWithPopup(auth,googleAuthProvider);
        }
        catch(err){
            console.log(err)
        }
    }
    const logOut=async()=>{
        try{
         await signOut(auth);
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <View style={styles.container}>
        <TextInput
        style={{height: 40}}
        placeholder="name"
        onChangeText={name=>setName(name)}
      />
        <TextInput
        style={{height: 40}}
        placeholder="email.."
        onChangeText={mail=>setEmail(mail)}
      />
        <TextInput
        style={{height: 40}}
        placeholder="password.."
        secureTextEntry={true}
        onChangeText={password=>setPassword(password)}
      />
       <Button
        title="signIn"
        onPress={() => signIn()}
      />
          <Button
        title="signIn With google"
        onPress={() => signInWthGoogle()}
      />
      <Button
        title="logout"
        onPress={() =>logOut()}
      />   
    
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


export default AuthOrganization