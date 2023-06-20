import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView ,TouchableOpacity} from 'react-native';
import {auth} from '../../fireBaseConfig'
import axios from 'axios';
import ADDRESS_IP from '../../env';
import {useNavigation} from '@react-navigation/native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import HomeOrganization from './HomeOrganization';

function WelcomeOrganization() {
        const [data, setData] = useState([]);
        const [accepted, setAcc] = useState([]);
        const [nonaccepted, setNonAcc] = useState([]);
        const[finished,setFinsh]=useState([]);
        const[notFinished,setNotFinsh]=useState([]);
        const navigation=useNavigation();
        const[show,setShow]=useState(false)
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

          const filterFinished = () => {
            const finishedData = data.filter((e) => e.current === e.target);
            setFinsh(finishedData);
            console.log(finishedData,'///')
          };

          const filterNotFinished = () => {
            const nofinishedData = data.filter((e) => e.current !== e.target);
            setNonAcc(nofinishedData);
            console.log(nofinishedData,'****')
          };

        useEffect(() => {
          fetchData();
        }, []);

        useEffect(() => {
            filterAccepted();
            filterNonAccepted();
            filterFinished();
            filterNotFinished();
          }, [data]);
        const OneACc=()=>{
            return nonaccepted.map((el)=>{
                return (
                    <Card   key={el.id} style={[styles.cardContainer, { height: 280 }]}>
                    <CardImage source={{ uri: el.causeImg  }} />
                    <CardTitle subtitle={el.title}/>
                    <CardContent text="Clifton, Western Cape" />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton onPress={() => {}} title="Share" color="#FEB557" />
                      <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
                    </CardAction>
                  </Card>

                )
            })
        }  

        const OneNAcc=()=>{
            return accepted.map((el)=>{
                return (
                    <Card   key={el.id} style={[styles.cardContainer, { height: 280 }]}>
                    <CardImage
                      source={{ uri: el.causeImg  }} 
                    />
                    <CardTitle subtitle={el.title}/>
                    <CardContent text="Clifton, Western Cape" />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton onPress={() => {}} title="Share" color="#FEB557" />
                      <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
                    </CardAction>
                  </Card>  
                )
            })
        }  
        const OneFinish=()=>{
            return finished.map((el)=>{
                return (
                    <Card   key={el.id} style={[styles.cardContainer, { height: 280 }]}>
                    <CardImage
                      source={{ uri: el.causeImg  }} 
                    />
                    <CardTitle subtitle={el.title}/>
                    <CardContent text="Clifton, Western Cape" />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton onPress={() => {}} title="Share" color="#FEB557" />
                      <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
                    </CardAction>
                  </Card>  
                )
            })
        } 
        const OneNotFinish=()=>{
            return notFinished.map((el)=>{
                return (
                    <Card   key={el.id} style={[styles.cardContainer, { height: 280 }]}>
                    <CardImage
                      source={{ uri: el.causeImg  }} 
                    />
                    <CardTitle subtitle={el.title}/>
                    <CardContent text="Clifton, Western Cape" />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton onPress={() => {}} title="Share" color="#FEB557" />
                      <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
                    </CardAction>
                  </Card>  
                )
            })
        } 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text  style={styles.all}>Accepted</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        {OneACc()}
      </ScrollView>
      <View>
        <Text  style={styles.all}>Not Accepted</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
       {OneNAcc()}
      </ScrollView>
      <View>
        <Text  style={styles.all}>Finished</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
       {OneFinish()}
      </ScrollView>
      <View>
        <Text  style={styles.all}>Not Finished</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
       {OneNotFinish()}
      </ScrollView>
      <TouchableOpacity style={styles.appButtonContainer} onPress={() => setShow(!show)}>
        <Text style={styles.appButtonText}>Show all</Text>
      </TouchableOpacity>
      {show ? <HomeOrganization /> : null}
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
  appButtonContainer: {
    width:'70%',
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft:50,
    marginBottom:50
},
appButtonText: {
fontSize: 18,
color: "#fff",
fontWeight: "bold",
alignSelf: "center",
textTransform: "uppercase"
},

});
