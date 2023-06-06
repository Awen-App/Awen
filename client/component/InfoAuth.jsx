import React,{useState} from 'react'
import {View,Button} from 'react-native'
import {auth} from '../fireBaseConfig'
import {signOut} from "firebase/auth";



const InfoAuth = () => {
    const logOut=async()=>{
        try{
         await signOut(auth);
        }
        catch(err){
          console.log(err)
        }
     }

    return (
        <View>    
          <Button
            title="logout"
            onPress={() =>logOut()}
          />   
        </View>
  )
}

export default InfoAuth
