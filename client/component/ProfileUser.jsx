import React, { useContext, useEffect, useState } from 'react'
import { Text, View , TouchableOpacity,ScrollView,StyleSheet} from 'react-native'
import { AuthContext } from './Context'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {auth} from '../fireBaseConfig'
import ADDRESS_IP from '../env';
import { DataTable } from 'react-native-paper';
import moment from 'moment/moment';

import LoadingScreen from './LoadingScreen';
const ProfileUser = () => {
    
    const navigation=useNavigation();
    const [authUser,setAuthUser]=useContext(AuthContext)
    const [donation,setDonation]=useState([])
    const [isLoading, setIsLoading] = useState(true);
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
                    console.log(cause.data)
                    console.log('axios3')
                    
                    allForUser.push({...cause.data,amount:resDonation.data[i].amount,createdAt:resDonation.data[i].createdAt})
                }
            }
            setIsLoading(false);
            setDonation(allForUser)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getDonation();
        
    },[])

    if (isLoading) {
        return <LoadingScreen />
      }
  if(donation.length>0){
    const total=donation.reduce((acc,curr)=>acc+curr.amount,0)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.child}>
            <DataTable>
                <DataTable.Header >
                    <DataTable.Title style={{flex:2}}>Cause Name</DataTable.Title>
                    <DataTable.Title style={{flex:1}}>Date</DataTable.Title>
                    <DataTable.Title style={{flex:0.5}}>Amount</DataTable.Title>
                </DataTable.Header>
                {donation.map((el,i)=>{
                    return (
                        <DataTable.Row key={i} style={{ borderBottomWidth: 0 }}>
                            <DataTable.Cell style={{flex:2}}>{el.title}</DataTable.Cell>
                            <DataTable.Cell style={{flex:1.5}}>{moment(el.createdAt).format("MMM Do YYYY")}</DataTable.Cell>
                            <DataTable.Cell style={{flex:0.5}}>{el.amount}</DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
                <DataTable.Row>
                    <DataTable.Cell style={{flex:3.5}}>Total</DataTable.Cell>
                    <DataTable.Cell style={{flex:1}}>{total}Dt</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            <TouchableOpacity style={styles.logout}  onPress={()=>{
                    logOutUser();
                    navigation.navigate('Home')
                }}>
                <Text
                style={styles.text}>LogOut</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      )
  }
}

export default ProfileUser

const styles=StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 250,
    },
    child:{
        
        flex: 1,
    },
    logout:{
        width:'70%',
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin:50
    },
    text:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})