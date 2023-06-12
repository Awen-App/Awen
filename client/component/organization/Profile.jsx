import React, { useState ,useEffect} from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {auth} from '../../fireBaseConfig'
import ADDRESS_IP from '../../env';
import axios from 'axios'
const Profile = () => {
    let navigation=useNavigation();
    const [organization,setOrg]=useState("")
    const orgid=auth.currentUser.uid;
    const getProfile=()=>{
        axios.get(`http://${ADDRESS_IP}:3001/organizations/id/${orgid}`)
        .then(res => {
          setOrg(res.data);
        })
        .catch(error => console.log(error));
    }
    useEffect(() => {
        getProfile();
        console.log(organization,'this is data');
      },[]);
    

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: organization.orgImg }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{organization.orgName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoValue}>{organization.orgEmail}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Category:</Text>
        <Text style={styles.infoValue}>{organization.category}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>RIB:</Text>
        <Text style={styles.infoValue}>{organization.rip}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Description:</Text>
        <Text style={styles.infoValue}>{organization.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.appButtonContainer}
        onPress={()=>{
            navigation.navigate(
            'ModifyOrganization',{org:organization})}}>
          <Text style={styles.appButtonText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'center', // Added to center the button vertically
    },
    avatarContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    infoContainer: {
      marginTop: 35,
    },
    infoLabel: {
      fontWeight: 'bold',
      fontSize: 15,
    },
    infoValue: {
      marginTop: 5,
      fontSize: 15,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    appButtonContainer: {
      width: '40%',
      elevation: 8,
      backgroundColor: '#FFA500',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    appButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase',
    },
  });
  

export default Profile
