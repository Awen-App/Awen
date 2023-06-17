import React, { useState ,useEffect,useContext} from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {auth} from '../../fireBaseConfig'
import ADDRESS_IP from '../../env';
import {TrakkerContext} from '../Context'
import axios from 'axios'
import LoadingScreen from '../LoadingScreen';

const Profile = () => {
    let navigation=useNavigation();
    const [organization,setOrg]=useState("")
    const [isLoading, setIsLoading] = useState(true);
    const orgid=auth.currentUser.uid;
    const [trakker,setTrakker] = useContext(TrakkerContext);
    const getProfile=()=>{
        axios.get(`http://${ADDRESS_IP}:3001/organizations/id/${orgid}`)
        .then(res => {
          setOrg(res.data);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    }
    useEffect(() => {
        getProfile();
        console.log(organization,'this is data');
      },[trakker]);
if (isLoading) {
    return <LoadingScreen />
  }
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
        <TouchableOpacity 
        style={styles.appButtonContainer}
        onPress={()=>{
          auth.signOut()
          navigation.navigate("OrganizationLogin")
           }}>
          <Text style={styles.appButtonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 20,
      justifyContent: 'center', 
      alignItems: 'center',// Added to center the button vertically
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
      fontSize: 35,
      fontWeight: 'bold',
      marginTop: 10,
    },
    infoContainer: {
      marginTop: 35,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: "center"
    },
    infoLabel: {
      width : 150,
      fontWeight: 'bold',
      fontSize: 18,
      backgroundColor:'#ada6a6',
      opacity:0.5,
      alignSelf: 'center',
     
    },
    infoValue: {
      marginTop: 5,
      fontSize: 15,
      alignSelf: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
      flexDirection: 'row',
    },
    appButtonContainer: {
      width: '40%',
      elevation: 8,
      backgroundColor: "white",
      borderRadius: 10,
      paddingVertical: 7,
      paddingHorizontal: 12,
      marginRight: 15,
      borderColor: "#ada6a6",
      borderWidth: 1,
    },
    appButtonText: {
      fontSize: 17,
      color: '#ada6a6',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase',
    },
  });
  

export default Profile
