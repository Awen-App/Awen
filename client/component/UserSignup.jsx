import React,{useState,useEffect, useContext} from 'react'
// import * as Network from 'expo-network';
import {View ,Text, Image,TextInput,Button,Alert,StyleSheet,TouchableOpacity,ScrollView,Checkbox} from 'react-native'
import {auth,googleAuthProvider} from '../fireBaseConfig';
import { createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { Dialog, Portal,Provider as PaperProvider } from 'react-native-paper';
import axios from 'axios';
import ADDRESS_IP from '../env.js'
import { AuthContext } from './Context';

const App = () => {
    const navigation=useNavigation();
    const [checked, setChecked] = useState(false);
    const [authUser,setAuthUser]=useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
     const [visible, setVisible] = useState(false);

    const hideDialog = () => setVisible(false);
    const showDialog = () => setVisible(true);
    
    const addUser=async()=>{
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
 
      <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
          <Text style={styles.title}>Terms and Conditions for Awen Charity Mobile App</Text>

<Text style={styles.text}>
Please read these Terms and Conditions ("Terms") carefully before using the Awen Charity Mobile App ("Awen") operated by [Charity Organization Name] ("we," "us," or "our"). These Terms govern your use of the Awen mobile application.

By downloading, accessing, or using the Awen mobile app, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use the Awen mobile app.
</Text>
<Text style={styles.title}>1. Use of the Awen Mobile App</Text>
<Text style={styles.text}>1.1 Eligibility: By using the Awen mobile app, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
1.2 License: We grant you a limited, non-exclusive, non-transferable, revocable license to use the Awen mobile app solely for your personal, non-commercial use, subject to these Terms.
1.3 Prohibited Activities: You agree not to:
   a. Use the Awen mobile app for any unlawful purpose or in violation of any applicable laws or regulations.
   b. Engage in any activity that could harm or disrupt the Awen mobile app or its users.
   c. Attempt to gain unauthorized access to any portion of the Awen mobile app or any related systems or networks.
   d. Use the Awen mobile app to distribute unsolicited promotional or marketing materials or spam.
   e. Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with any person or entity.
   f. Collect or store personal information about other users of the Awen mobile app.
   g. Modify, adapt, translate, reverse engineer, decompile, or disassemble the Awen mobile app.
   </Text>
   <Text style={styles.title}>2. User Content</Text>
   <Text style={styles.text}>
2.1 User-generated Content: The Awen mobile app may allow you to submit or upload content, including but not limited to comments, photos, and videos ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, display, and perform the User Content in connection with the Awen mobile app and our charitable activities.
2.2 Content Guidelines: You agree not to submit User Content that is:
   a. Unlawful, harmful, threatening, abusive, defamatory, vulgar, obscene, or otherwise objectionable.
   b. Infringing upon the intellectual property rights or privacy rights of any third party.
   c. False, misleading, or fraudulent.
   d. Violating any applicable laws or regulations.
2.3 Monitoring and Removal: We reserve the right to monitor and remove any User Content that violates these Terms or is deemed inappropriate at our sole discretion.
</Text>
<Text style={styles.title}>3. Privacy</Text>
<Text style={styles.text}>
Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use the Awen mobile app. By using the Awen mobile app, you agree to our Privacy Policy.
</Text>
<Text style={styles.title}>4. Intellectual Property</Text>
<Text style={styles.text}>
4.1 Ownership: The Awen mobile app and all intellectual property rights associated with it, including but not limited to copyrights, trademarks, and trade secrets, are owned by us or our licensors.
4.2 Limited License: We grant you a limited, non-exclusive, non-transferable license to use the Awen mobile app for its intended purpose and in accordance with these Terms. You may not reproduce, modify, distribute, display, or create derivative works of the Awen mobile app or any content without our prior written consent.
</Text>
<Text style={styles.title}>5. Disclaimer of Warranties</Text>
<Text style={styles.text}>
The Awen mobile app is provided</Text>

          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
    <View><Text></Text></View>
    <Text onPress={showDialog} >Terms and conditions</Text>
             <View><Text></Text></View>
            <Text>Already have an account? </Text>
            <Text onPress={()=>navigation.navigate('UserSignin')}>Sign In</Text>  
     
   
            <TouchableOpacity onPress={()=>addUser()} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Sign Up</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.appButtonContainer} >
              <Text style={styles.appButtonText}>Sign up with Google</Text>
            </TouchableOpacity> */}
        
        </View>
  )
}
const UserSignup = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

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
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#33A09A'
    },
    text: {
      fontSize: 16,
      marginBottom: 20,
    }
})