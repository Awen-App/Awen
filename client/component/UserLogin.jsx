import React, {useContext, useState} from 'react'
import {View , Image,Text,TextInput,Button,Alert,StyleSheet,TouchableOpacity} from 'react-native'

import {auth} from  "../fireBaseConfig";
import { useNavigation } from '@react-navigation/native';
import {signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
// import ADDRESS_IP from '../env';
// import axios from 'axios';
import { AuthContext } from './Context';
const UserLogin =() => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authUser,setAuthUser]=useContext(AuthContext);
    console.log(authUser)
    const navigation=useNavigation();
    const login=async()=>{
       
        signInWithEmailAndPassword(auth,email, password)
            .then((u) => {
                setAuthUser({email:email,token:u._tokenResponse.idToken,orgEmail:null})
                navigation.navigate('grid')
            }).catch((error) => {
            console.log(error);
        });}
       
    
    const reset=()=>{
      sendPasswordResetEmail(auth,email)
      .then((res)=> {
        console.log(email)
        alert('password sent')} )
        .catch((error) => {
          console.error('Error during password reset:', error);
        });
    }
  return (
    <View style={styles.signin}>
        <Image
            style={{ width: 140, height: 80 ,marginTop:80,marginBottom:50}}
            source={require('../assets/logo-awen-final1.png')}
          />
            <Text style={styles.wlc}>Sign In to continue </Text>
            <View style={styles.head}>
              <TouchableOpacity style={styles.org} onPress={()=>navigation.navigate("OrganizationLogin")}>
                <Text style={styles.appButtonText2}>Organization</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.donor}>
                <Text style={styles.appButtonText1}>Donor</Text>
              </TouchableOpacity>
            </View>
        <TextInput
            style={styles.textInput}
            // style={{height: 40}}
            placeholder="E-mail"
            onChangeText={newText => setEmail(newText)}
            defaultValue={email}
            />
            <TextInput
                style={styles.textInput}
                // style={{height: 40}}
                placeholder="Password"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={()=>login()} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Sign In</Text>
            </TouchableOpacity>
            <Text>Don't have an account? </Text><Text onPress={()=>navigation.navigate('UserSignup')}>Sign Up.</Text>
            <Text 
              onPress={()=>{reset()}}
             >Forgot password ?</Text>
             
             
     
    
    </View>
  )
}



const styles=StyleSheet.create({
    signin: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
    textInput:{
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius : 8,
    },
    appButtonContainer: {
        width:'70%',
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
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
      head:{
        flexDirection: 'row',
        // paddingHorizontal: 20
        // marginHorizontal:40
        height:50,
        marginVertical:40
        // display:'flex',
        // justifyContent:'space-between'
      },
      org:{
  
        width:'45%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight:5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      },
      donor:{
  
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
      appButtonText2: {
        fontSize: 15,
        color: "#009688",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      wlc:{
        // color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
})
export default UserLogin