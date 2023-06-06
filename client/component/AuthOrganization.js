import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
import { auth,googleAuthProvider } from '../fireBaseConfig'
import { createUserWithEmailAndPassword ,signInWithPopup,signOut} from "firebase/auth";
import  axios from 'axios';
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
  // const signIn = ()=>{
  //   console.log("houni")
  //   // createUserWithEmailAndPassword(auth, email,password).then(result =>{
  //   //   console.log("success firebase")
  //     axios.post("http://192.168.252.223:3001/organizations",org).then(res => {
  //       console.log(org)
  //       console.log(res)
  //     console.log("success")}).catch(err =>console.log(err))

  // }

    // const signIn=async()=>{
    //   console.log("clicked")
    //     try{
    //       createUserWithEmailAndPassword(auth,email,password)
    //       .then(()=>{
    //         console.log("dkhalt fél create")
    //       axios.post("http://192.168.100.25:3001/organizations",org)
    //       .then((res)=>{
    //         console.log("dkhalt fél then")
    //         console.log(res,"succes")
    //       })
    //       .catch((err)=>{
    //         console.log("dkhalt fél catch")
    //          console.log(err,'this axios error')
    //       })
    //      })
    //     }
    //     catch(err){
    //       console.log("dkhalt fél catchfirebase")
    //         console.log(err,'this is firebase error')
    //     }
    // }
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