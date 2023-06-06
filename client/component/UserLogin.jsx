import React, {useState} from 'react'
import {View , Image,Text,TextInput,Button,Alert,StyleSheet,TouchableOpacity} from 'react-native'
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
                console.log(tokenResponse)
            }).catch((error) => {
            console.log(error);
        });
    }
  return (
    <View style={styles.signin}>
        <Image
            style={{ width: 80, height: 80 ,margin:50}}
            source={require('../assets/awenLogo.png')}
          />
            <Text style={styles.wlc}>Sign In to continue </Text>
            <View style={styles.head}>
              <TouchableOpacity style={styles.org}>
                <Text style={styles.appButtonText1}>Organization</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.org}>
                <Text style={styles.appButtonText1}>Doner</Text>
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
            <Text>Don't have an account? Sign Up</Text>
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

})