import React, { useState ,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {auth} from '../../fireBaseConfig'
import axios from 'axios';
import ADDRESS_IP from '../../env';
function HomeOrganization() {
  const [data,setData]=useState([]);
  const[id,setId]=useState("");
  const user = auth.currentUser.email;
  console.log(user,"this is user")

  const getData= () => {
    axios
      .get(`http://${ADDRESS_IP}:3001/organizations/${user}/`)
      .then(response => {
        setId(response.data.orgId);
        console.log(data,"this is id ");
      }).then(res => {
        axios
      .get(`http://${ADDRESS_IP}:3001/causes/${id}/`)
      .then(response => {
        setData(response.data);
        console.log(data,'this is data');
      })
      .catch(error => console.log(error)); 
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getData();
  },[]);

  return (
    <View style={styles.container}>
      <Text> Home Organization</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between' 
  }
});

export default HomeOrganization
