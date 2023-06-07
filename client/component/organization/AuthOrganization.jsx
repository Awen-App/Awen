import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,Button,TouchableOpacity } from 'react-native';
import { auth,googleAuthProvider } from '../../fireBaseConfig'
import { createUserWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import {useNavigation} from '@react-navigation/native'
import ADDRESS_IP from '../env'
import  axios from 'axios';
function AuthOrganization() {
    let navigation=useNavigation();
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
    createUserWithEmailAndPassword(auth, email,password).then((res) =>{
      console.log(res)
      axios.post(`http://${ADDRESS_IP}/organizations/`,org).then(res => {
      console.log("success")})
      .catch(err =>console.log(err))
    }).catch(err => console.log(err))
  }
    // const signInWthGoogle=async()=>{
    //     try{
    //      await signInWithPopup(auth,googleAuthProvider);
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
  return (
       <View style={styles.signin}>
        <View style={styles.head}>
        <TouchableOpacity
           onPress={()=>navigation.navigate('UserSignup')}
           style={styles.appButtonContainer1}>
            <Text 
            style={styles.appButtonText}>
              user
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
           onPress={()=>navigation.navigate('OrganizationSignUp')}
           style={styles.appButtonContainer1}>
            <Text 
            style={styles.appButtonText}>
             organization
              </Text>
            </TouchableOpacity>
        </View>
           
        <TextInput   
        style={styles.textInput}
        placeholder="name..."
        onChangeText={name=>setName(name)}
      />
        <TextInput
        style={styles.textInput}
        placeholder="email.."
        onChangeText={mail=>setEmail(mail)}
      />
        <TextInput
        style={styles.textInput}
        placeholder="password..."
        secureTextEntry={true}
        onChangeText={password=>setPassword(password)}
      />
         <TextInput
        style={styles.textInput}
        placeholder="desc..."
        onChangeText={des=>setDesc(des)}
      />
       <TextInput
        style={styles.textInput}
        placeholder="category..."
        onChangeText={cat=>setCat(cat)}
      />
       <TextInput
        style={styles.textInput}
        placeholder="rib.."
        onChangeText={rib=>setRib(rib)}
      />
          <TouchableOpacity
           onPress={()=>{
            signUp()
            navigation.navigate('OrganizationLogin')}}
           style={styles.appButtonContainer}>
            <Text 
            style={styles.appButtonText}>
              Sign Up
              </Text>
            </TouchableOpacity>
          {/* <Button
        title="signIn With google"
        onPress={() => signInWthGoogle()}
      /> */}
  </View>
   
   
);
}

const styles = StyleSheet.create({
  
  signin: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  head:{
    flexDirection: 'row',
    flex:0.3,
    marginRight:29

  },
textInput:{
    width: '70%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius :13,
},
appButtonContainer: {
    width:'70%',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonContainer1: {
    width:'50%',
    height:50,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight:10

  }

});


export default AuthOrganization