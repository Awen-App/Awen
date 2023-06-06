import React, {useState} from 'react'
import {View , Text,TextInput,Button,Alert,StyleSheet,TouchableOpacity} from 'react-native'
import {auth} from  "../fireBaseConfig";
import {signInWithEmailAndPassword} from 'firebase/auth'
const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [tokenResponse,setTokenResponse]=useState({})
    const login=()=>{
    
        signInWithEmailAndPassword(auth,email, password)
            .then((u) => {
                setTokenResponse(u._tokenResponse)
            }).catch((error) => {
            console.log(error);
        });
    }
  return (
    <View style={styles.signin}>
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

            {/* <Button
                title="Log-In"
                color="#33A09A"
                onPress={()=>login()}
            /> */}
    </View>
  )
}

export default UserLogin

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
      }

})