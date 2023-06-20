import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {auth} from '../../fireBaseConfig'
import axios from 'axios';
import ADDRESS_IP from '../../env';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

function WelcomeOrganization() {
        const [data, setData] = useState([]);
        const [accepted, setAcc] = useState([]);
        const [nonaccepted, setNonAcc] = useState([]);
        const user = auth.currentUser.email;

        const fetchData = async () => {
            try {
              const orgResponse = await axios.get(`http://${ADDRESS_IP}:3001/organizations/${user}/`);
              const orgId = orgResponse.data[0].orgId;
              const causesResponse = await axios.get(`http://${ADDRESS_IP}:3001/causes/${orgId}`);
              setData(causesResponse.data);
            } catch (err) {
              console.log(err);
            }
          };

        const filterAccepted = () => {
            const acceptedData = data.filter((e) => e.status === true);
            setAcc(acceptedData);
            console.log(accepted,'+++')
          };
      
         const filterNonAccepted = () => {
            const nonacceptedData = data.filter((e) => e.status === false);
            setNonAcc(nonacceptedData);
            console.log(nonaccepted,'----')
          };
        useEffect(() => {
          fetchData();
        }, []);
        
        useEffect(() => {
            filterAccepted();
            filterNonAccepted();
          }, [data]);
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text  style={styles.all}>Accepted</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <Card style={[styles.cardContainer, { height: 280 }]}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title="Top 10 South African beaches"
           style={{ height: 55555555 }} 
          />
          <CardTitle subtitle="Number 6" />
          <CardContent text="Clifton, Western Cape" />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Share" color="#FEB557" />
            <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
          </CardAction>
        </Card>
      </ScrollView>
      <View>
        <Text  style={styles.all}>Not Accepted</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <Card style={[styles.cardContainer, { height: 280 }]}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title="Top 10 South African beaches"
           style={{ height: 55555555 }} 
          />
          <CardTitle subtitle="Number 6" />
          <CardContent text="Clifton, Western Cape" />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Share" color="#FEB557" />
            <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
          </CardAction>
        </Card>
      </ScrollView>
    </ScrollView>
  );
}

export default WelcomeOrganization;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollViewContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollViewContent2: {
    justifyContent: 'flex-start',
    alignItems: 'center',
   
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.0,
    elevation: 3,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 15,
    width: 250,
    marginLeft: 8,
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  all:{
    fontSize:25,
    marginLeft:20,
    marginTop:20,
    fontWeight: "bold",
    marginBottom:20
  },
});
