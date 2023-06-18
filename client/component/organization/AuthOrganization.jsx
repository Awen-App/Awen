
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput,Button,TouchableOpacity ,Image,ScrollView} from 'react-native';
import { auth,googleAuthProvider } from '../../fireBaseConfig'
import { createUserWithEmailAndPassword ,signInWithPopup,sendPasswordResetEmail} from "firebase/auth";
import {useNavigation} from '@react-navigation/native'
import { Dialog, Portal,Provider as PaperProvider , Text} from 'react-native-paper';
import ADDRESS_IP from '../../env';
import  axios from 'axios';
import TermsAndConditions from '../TermsAndConditions';
import * as EmailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
function App() {

    let navigation=useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState("");
    const [desc,setDesc]=useState("");
    const [category,setCat]=useState("");
    const [rib,setRib]=useState("");
    const [visible, setVisible] = useState(false);
    const [recipients, setRecipients] = useState("") ;
    const [subject,setSubject]=useState("");
    const [body,setBody]=useState("");
    const hideDialog = () => setVisible(false);
    const showDialog = () => setVisible(true);
 
  const sendEmail = () => {
    let  options = {
      subject:subject,
      recipients: ["amroualwane1@gmail.com"],
      body: body
    }
    EmailComposer.composeAsync(options)
  };
  const sendEmailWithAttachment = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const attachmentUri = result.assets[0].uri;
      sendEmail([attachmentUri]); 
    } else {
      sendEmail([]);
    }
  };



  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        const org = {
          orgId: auth.currentUser.uid,
          orgName: name,
          orgEmail: email,
          description: desc,
          category: category,
          orgImg: 'https://1000logos.net/wp-content/uploads/2020/08/Anonymous-Logo.png',
          rip: rib,
        };
        console.log(org, 'this is org');
        axios
          .post(`http://${ADDRESS_IP}:3001/organizations/`, org)
          .then((res) => {
            console.log('success');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView>
    <View style={styles.signin}>
      <Image
        style={{ width: 140, height: 80, marginTop: 80, marginBottom: 50 }}
        source={require('../../assets/logo-awen-final1.png')}
      />
      <Text style={styles.wlc}>Sign up to continue </Text>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OrganizationSignUp');
          }}
          style={styles.org}
        >
          <Text style={styles.appButtonText}>Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserSignup');
          }}
          style={styles.donor}
        >
          <Text style={styles.appButtonText1}>Donner</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="name..."
        onChangeText={(name) => setName(name)}

      />
      <TextInput
        style={styles.textInput}

        placeholder="E-mail.."
        onChangeText={mail=>setEmail(mail)}

      />
      <TextInput
        style={styles.textInput}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={styles.textInput}

        placeholder="Description..."
        onChangeText={des=>setDesc(des)}

      />
      <TextInput
        style={styles.textInput}

        placeholder="Category..."
        onChangeText={cat=>setCat(cat)}

      />
      <TextInput
        style={styles.textInput}
        placeholder="RIB..."
        onChangeText={(rib) => setRib(rib)}
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
    <Text onPress={showDialog} >Terms and conditions</Text>
      <Text>Already have an account? </Text><Text onPress={()=>navigation.navigate('OrganizationLogin')}>Sign In</Text>

    <View>
       <TextInput
        style={styles.textInput}
        placeholder="subject"
        onChangeText={(e) => setSubject(e)}
      />
           <TextInput
        style={styles.textInput}
        placeholder="body..."
        onChangeText={(e) => setBody(e)}
      />
       <TouchableOpacity
        onPress={() => {
          sendEmail()
        }}
        style={styles.appButtonContainer}
      >
          <Text style={styles.appButtonText}>Send email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          signUp();
          navigation.navigate('OrganizationLogin');
        }}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView> );
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

    width:'50%',
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
     color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
  },
  donor:{

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
    color: "#009688",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonText2: {
    fontSize: 15,
  
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
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
});
const AuthOrganization = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};


export default AuthOrganization;
