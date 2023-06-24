import React, { useState, useEffect ,useContext} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Image } from 'react-native';
import { auth } from '../../fireBaseConfig';
import axios from 'axios';
import {TrakkerContext} from '../Context'
import ADDRESS_IP from '../../env';
import { useNavigation } from '@react-navigation/native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import LoadingScreen from '../LoadingScreen';

function WelcomeOrganization() {
  const [data, setData] = useState([]);
  const [accepted, setAcc] = useState([]);
  const [nonaccepted, setNonAcc] = useState([]);
  const [finished, setFinished] = useState([]);
  const [notFinished, setNotFinished] = useState([]);
  const [trakker,setTrakker] = useContext(TrakkerContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser.email;

  const fetchData = async () => {
    try {
      const orgResponse = await axios.get(`http://${ADDRESS_IP}:3001/organizations/${user}/`);
      const orgId = orgResponse.data[0].orgId;
      const causesResponse = await axios.get(`http://${ADDRESS_IP}:3001/causes/${orgId}`);
      setData(causesResponse.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const filterAccepted = () => {
    const acceptedData = data.filter((e) => e.status === true);
    setAcc(acceptedData);
    console.log(acceptedData, '+++');
  };

  const filterNonAccepted = () => {
    const nonacceptedData = data.filter((e) => e.status === false);
    setNonAcc(nonacceptedData);
    console.log(nonacceptedData, '----');
  };

  const filterFinished = () => {
    const finishedData = data.filter((e) => e.current === e.target);
    setFinished(finishedData);
    console.log(finishedData, '///');
  };

  const filterNotFinished = () => {
    const notFinishedData = data.filter((e) => e.current !== e.target);
    setNotFinished(notFinishedData);
    console.log(notFinishedData, '****');
  };

  useEffect(() => {
    fetchData();
  }, [trakker]);

  useEffect(() => {
    filterAccepted();
    filterNonAccepted();
    filterFinished();
    filterNotFinished();
  }, [data]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  const renderCard = (el) => (
    <View key={el.id} style={[styles.cardContainer]}>
      <Image source={{ uri: el.causeImg }} style={styles.img} />
      <Text style={styles.content}>{el.title}</Text>
      <CardAction separator={true} inColumn={false}>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>navigation.navigate('CauseOrg',{el})} ><Text style={styles.buttonText}>More Details</Text></TouchableOpacity>
      </CardAction>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {nonaccepted.length ?<View><Text style={styles.all}>Pending</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {nonaccepted.map((el) => renderCard(el))}
      </ScrollView></View> : <View></View>}
      {accepted.length?<View>
        <Text style={styles.all}>Approved</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {accepted.map((el) => renderCard(el))}
      </ScrollView></View>:<View></View>}
      {finished.length?<View>
        <Text style={styles.all}>Finished</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {finished.map((el) => renderCard(el))}
      </ScrollView></View>:<View></View>}
      {notFinished.length?<View>
        <Text style={styles.all}>In Progress</Text>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {notFinished.map((el) => renderCard(el))}
      </ScrollView></View>:<View></View>}
      <TouchableOpacity style={styles.appButtonContainer} >
        <Text style={styles.appButtonText} onPress={()=>navigation.navigate('OrgHome')}>Show all</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
  all: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 20,
    alignSelf: 'center',
    width: 250,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
  cardContainer: {
    flex: 0.5,
    marginHorizontal: 2,
    width:290,
    height:350,
    alignContent: 'center',
    justifyContent: 'center',
  },
  img: {
    width:260,
    height:180,
    margin: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  content: {
    right:8,
    fontSize: 18,
    fontWeight: "bold",
    
    alignSelf: "center",
  },  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ada6a6',
    textAlign: 'center',
  },
  bottomButton: {
    left:25,
    textAlign: 'center',
    border: 'solid',
    marginVertical: 5,
    width: 200,
    height:30,
    borderRadius: 10,
    borderColor: "#ada6a6",
    borderWidth: 1,
    marginHorizontal:15,
    backgroundColor:"white",
  },
});

export default WelcomeOrganization;