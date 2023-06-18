import React, { useState } from 'react';
import * as EmailComposer from 'expo-mail-composer';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, Image, StyleSheet,TouchableOpacity,ImageBackground,TextInput } from 'react-native';
import { Card } from 'react-native-paper';
const SendEmail=()=>{
    const [subject,setSubject]=useState("");
    const [body,setBody]=useState("");

const sendEmail = () => {
    let  options = {
      subject:subject,
      recipients: ["amroualwane1@gmail.com"],
      body: body
    }
    EmailComposer.composeAsync(options)}
    return (
     
        <View style={styles.container}>
               <Image
        style={{ width: 140, height: 80, marginTop: 80, marginBottom: 50 }}
        source={require('../../assets/logo-awen-final1.png')}
      />
            <TextInput
            style={styles.textInputs}
        placeholder="Subject"
        onChangeText={(e) => setSubject(e)}
      />
           <TextInput
           style={styles.textInputb}
           editable
           multiline
           numberOfLines={6}
        onChangeText={(e) => setBody(e)}
      />
       <TouchableOpacity
        onPress={() => {
          sendEmail()
        }}
        style={styles.appButtonContainer}
      >
        {/* <Icon name="send" style={styles.infoIcon}/> */}
        <Text style={styles.appButtonText}>Send email</Text>
      </TouchableOpacity>
         </View>
            )
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 20,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    appButtonContainer: {
        fontSize: 20,
        marginRight: 15,
        color: '#ada6a6',
        left: 150,
      },
      appButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
      },
      textInputs:{
        width: 300,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius :13,
    },
    textInputb:{
        width: 300,
        height: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius :13,
       
    },
    appButtonContainer: {
        width:300,
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
})
export default SendEmail