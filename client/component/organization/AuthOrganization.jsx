import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,Button,TouchableOpacity ,Image} from 'react-native';
import { auth,googleAuthProvider } from '../../fireBaseConfig'
import { createUserWithEmailAndPassword ,signInWithPopup} from "firebase/auth";
import {useNavigation} from '@react-navigation/native'
import ADDRESS_IP from '../../env';
import  axios from 'axios';
function AuthOrganization() {

    let navigation=useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    const [desc,setDesc]=useState("");
    const [category,setCat]=useState("");
    const [rib,setRib]=useState("");

    
  const signUp = ()=>{
    createUserWithEmailAndPassword(auth, email,password).then((res) =>{
      console.log(res)
      const org={
        orgId:auth.currentUser.uid,
        orgName:name,
        orgEmail:email,
        description:desc,
        category:category,
        orgImg:"https://1000logos.net/wp-content/uploads/2020/08/Anonymous-Logo.png",
        rip:rib    
    }
    console.log(org,'this is org');
      axios.post(`http://${ADDRESS_IP}:3001/organizations/`,org).then(res => {
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
           <Image
            style={{ width: 140, height: 80 ,marginTop:80,marginBottom:50}}
            source={require('../../assets/logo-awen-final1.png')}
          />
           <Text style={styles.wlc}>Sign up to continue </Text>
            <View style={styles.head}>
              <TouchableOpacity
                onPress={()=>{
                  navigation.navigate('OrganizationSignUp')}}
               style={styles.org}>
                <Text style={styles.appButtonText1}>Organization</Text>
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={()=>{
                navigation.navigate('UserSignup')}}
              style={styles.org}>
                <Text style={styles.appButtonText1}>Donner</Text>
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
        placeholder="RIB..."
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
    height:50,
    marginVertical:40
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

  },
  org:{

    width:'45%',
    backgroundColor: '#009688',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  appButtonText1: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  wlc:{
    // color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  }

});


export default AuthOrganization