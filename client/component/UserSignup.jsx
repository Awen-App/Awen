import React,{useState,useEffect, useContext} from 'react'
// import * as Network from 'expo-network';
import {View ,Text, Image,TextInput,Button,Alert,StyleSheet,TouchableOpacity} from 'react-native'
import {auth,googleAuthProvider} from '../fireBaseConfig';
import { createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ADDRESS_IP from '../env.js'
import { AuthContext } from './Context';
import { Checkbox } from 'react-native-paper';
const UserSignup = () => {
    const navigation=useNavigation();
    const [checked, setChecked] = useState(false);
    const [authUser,setAuthUser]=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);
    
    const addUser=async()=>{
      if (!checked) {
        Alert.alert('Please accept the terms and conditions');
        return;
      }
      const user=await axios.get(`http://${ADDRESS_IP}:3001/users/${email}`)
      if(user.data.length>0){
         Alert.alert("user already exist")
         navigation.navigate('UserSignin')
         return;
        }
      if(confpassword!==password){
        Alert.alert("you should confirm your password")
        return
      }
    
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        console.log(userCredential)
        await axios.post(`http://${ADDRESS_IP}:3001/users`,{email})
        setAuthUser({email:email,token:userCredential._tokenResponse.idToken,orgEmail:null})
        Alert.alert('user created successfully')
        navigation.navigate('grid')
      
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert(`Email address ${email} already in use.`);
            break;
            case 'auth/invalid-email':
              Alert.alert(`Email address ${email} is invalid.`);
              break;
              case 'auth/operation-not-allowed':
                Alert.alert(`Error during sign up.`);
                break;
                case 'auth/weak-password':
                  Alert.alert('Password is not strong enough. Add additional characters including special characters and numbers.');
                  break;
                  default:
                    Alert.alert(error.message);
                    break;
                  }
                });
                  
    }
    
    return (
      
        <View style={styles.signin}>
            <Image
            style={{ width: 140, height: 80 ,marginTop:80,marginBottom:50}}
            source={require('../assets/logo-awen-final1.png')}
          />
            <Text style={styles.wlc}>Sign up to continue </Text>
            <View style={styles.head}>
              <TouchableOpacity style={styles.org} onPress={()=>navigation.navigate('OrganizationSignUp')}>
                <Text style={styles.appButtonText2}>Organization</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.donor}>
                <Text style={styles.appButtonText1}>Doner</Text>
              </TouchableOpacity>
            </View>
            <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            onChangeText={newText => setEmail(newText)}
            defaultValue={email}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                onChangeText={newText => setConfpassword(newText)}
                defaultValue={confpassword}
                secureTextEntry={true}
            />
             <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          onPress={()=>{setChecked(!checked)}}
          status={checked ? 'checked' : 'unchecked'}
        />
        <Text style={styles.label} onPress={()=>navigation.navigate('Terms')}>Terms and conditions</Text>
      </View>
            <TouchableOpacity onPress={()=>addUser()} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonContainer} >
              <Text style={styles.appButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
            <Text>Already have an account? </Text>
            <Text onPress={()=>navigation.navigate('UserSignin')}>Sign In</Text>  
        </View>
  )
}

export default UserSignup;


const styles=StyleSheet.create({
  signin: {
      
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      // backgroundColor:'red'
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
      margin:10,
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
    googleButton: {
      backgroundColor: '#DB4437',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
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
    },
    appButtonText2: {
      fontSize: 15,
      color: "#009688",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
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
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
})