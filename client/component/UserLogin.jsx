import React,{useState} from 'react'
import {View , TextInput,Button} from 'react-native'
import {auth,googleAuthProvider} from '../fireBaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios'


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const addUser=()=>{
  createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    await axios.post('http://localhost:3001/users',{email:user.email})
  })
  .catch((error) => {
    
    console.log(error.message);
    // ..
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
                title="Sign-Up"
                color="#841584"
                onPress={()=>addUser()}

            />
        </View>
  )
}

export default UserLogin
