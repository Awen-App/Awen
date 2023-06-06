import React,{useState} from 'react'

import {View ,Text, TextInput,Button,Alert,StyleSheet,TouchableOpacity} from 'react-native'
import {auth,googleAuthProvider} from '../fireBaseConfig';
import { createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const UserSignup = () => {
    const navigation=useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const addUser=async()=>{
      const user=await axios.get(`http://192.168.252.223:3001/users/${email}`)
      if(user.data.length>0){
         Alert.alert("user already exist")
         navigation.navigate('UserSignin')
         return
        }
      if(confpassword!==password){
        Alert.alert("you should confirm your password")
        return
      }
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        await axios.post('http://192.168.252.223:3001/users',{email:user.email})
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert(`Email address ${this.state.email} already in use.`);
            break;
            case 'auth/invalid-email':
              Alert.alert(`Email address ${this.state.email} is invalid.`);
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
    // const userSignUpWithGoogle = async () => {
    //   try {
    //     const { idToken } = await GoogleSignin.signIn();
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //     await auth().signInWithCredential(googleCredential);
    //   } catch (error) {
    //     console.error('Error signing up with Google:', error);
    //   }
    // };
    return (
        <View style={styles.signin}>
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
                // style={{height: 40}}
                placeholder="Confirm Password"
                onChangeText={newText => setConfpassword(newText)}
                defaultValue={confpassword}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={()=>addUser()} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Sign-Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonContainer} >
              <Text style={styles.appButtonText}>Sign up with Google</Text>
            </TouchableOpacity>
        </View>
  )
}

export default UserSignup;


const styles=StyleSheet.create({
  signin: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
  textInput:{
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius : 8,
  },
  appButtonContainer: {
      margin:10,
      width:'80%',
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
    }
})