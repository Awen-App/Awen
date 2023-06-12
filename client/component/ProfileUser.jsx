import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { AuthContext } from './Context'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {auth} from '../fireBaseConfig'
import ADDRESS_IP from '../env'
const ProfileUser = () => {
    const navigation=useNavigation();
    const [authUser,setAuthUser]=useContext(AuthContext)
    const [donation,setDonation]=useState([])
    const logOutUser=()=>{
        auth.signOut();
        setAuthUser({email:null,token:''})
      }
    const getDonation=async()=>{
        let allForUser=[];
        try{
            const res=await axios.get(`http://${ADDRESS_IP}:3001/users/${authUser.email}`)
            console.log('axios1')
            const resDonation=await axios.get(`http://${ADDRESS_IP}:3001/donation/${res.data[0].userId}`)
            console.log('axios2')
            if(resDonation.data.length>0){
                for(var i=0;i<resDonation.data.length;i++){
                    const cause=await axios.get(`http://${ADDRESS_IP}:3001/getcause/${resDonation.data[i].causeId}`);
                    console.log('axios3')
                    allForUser.push({...cause.data[0],amount:resDonation.data[i].amount,createdAt:resDonation.data[i].createdAt})
                }
            }
            setDonation(allForUser)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getDonation();
    },[])
  if(donation.length>0){
    return (
        <View>
            <Text>profile</Text>
            <View>
                <Text onPress={()=>{
                    logOutUser();
                    navigation.navigate('Home')
                }}>LogOut</Text>
            </View>
        </View>
      )
  }
  else{
    return(
        <View style={{top:200}}>
                <Text onPress={()=>{
                    logOutUser();
                    navigation.navigate('Home')
                }}>LogOut</Text>
            </View>
    )
  }
}

export default ProfileUser
