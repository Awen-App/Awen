import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import { auth,googleAuthProvider } from '../fireBaseConfig'
import { createUserWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import  axios from 'axios';
import ADDRESS_IP from '../env'
// import secret from 'react-native-config';
// require('dotenv').config({ path: './.env.development' })
function AuthOrganization() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    const [desc,setDesc]=useState("");
    const [category,setCat]=useState("");
    const [image,setImage]=useState("");
    const [rib,setRib]=useState("");
    const org={
      orgName:name,
      orgEmail:email,
      description:desc,
      category:category,
      orgImg:image,
      rip:rib    
  }
  const signUp = ()=>{
    console.log("salem")
    createUserWithEmailAndPassword(auth, email,password).then(() =>{
    
      axios.post(`http://${ADDRESS_IP}:3001/organizations/`,org).then(res => {
        console.log(org)
        console.log(res)
      console.log("success")}).catch(err =>console.log(err,"check"))
    }).catch(err => console.log("hedhi firebase",err))
  }
    const signInWthGoogle=async()=>{
        try{
         await signInWithPopup(auth,googleAuthProvider);
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
         <TextInput
        style={{height: 40}}
        placeholder="desc"
        onChangeText={des=>setDesc(des)}
      />
       <TextInput
        style={{height: 40}}
        placeholder="category.."
        onChangeText={cat=>setCat(cat)}
      />
       <TextInput
        style={{height: 40}}
        placeholder="rib"
        onChangeText={rib=>setRib(rib)}
      />
       <TextInput
        style={{height: 40}}
        placeholder="image"
        onChangeText={img=>setImage(img)}
      />
       <Button
        title="signUp"
        onPress={() => signUp()}
      />
          <Button
        title="signIn With google"
        onPress={() => signInWthGoogle()}
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