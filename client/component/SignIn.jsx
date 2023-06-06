import React,{useState} from 'react'
import {View , TextInput,Button} from 'react-native'
import {auth,googleAuthProvider} from '../fireBaseConfig'
import {signInWithEmailAndPassword} from "firebase/auth";



const SignInOrganization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const signIn=()=>{
    console.log("it works")
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=> {
    console.log(userCredential.user)} )
    .catch((error) => {
    console.log(error.message,'mtaa firebase');
  });
    }
    return (
        <View>

            <TextInput
            style={{height: 40}}
            placeholder="your E-mail"
            onChangeText={newText => setEmail(newText)}
            defaultValue={email}
            />
            <TextInput
                style={{height: 40}}
                placeholder="your Password"
                onChangeText={newText => setPassword(newText)}
                defaultValue={password}
                secureTextEntry={true}
            />
            <Button
                title="Sign-in"
                color="#841584"
                onPress={()=>signIn()}

            />
        </View>
  )
}

export default SignInOrganization
