import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ADDRESS_IP from '../env';
import OneCause from './OneCause';
import LoadingScreen from './LoadingScreen';

const AllCauses = () => {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [detailsPressed, setDetailsPressed] = useState(false);
  const [donationPressed, setDonationPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCauses = () => {
    axios
      .get(`http://${ADDRESS_IP}:3001/causeaccepted`)
      .then(response => {
        setData(response.data);
        console.log(data, '----', response.data);

        response.data.forEach(el => {
          const percentage = (el.current / el.target) * 100;
          setProgress(percentage);
        });
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getCauses();
  }, []);

  const formatTimeAgo = timestamp => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diff = Math.abs(now - createdAt);
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (hours < 720) {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    } else {
      const months = Math.floor(hours / 720);
      return `${months} months ago`;
    }
  };

  const handleDetailsPress = el => {
    console.log('Details button pressed for:', el.causeId);
    setDetailsPressed(true);
  };

  const handleQuickDonationPress = el => {
    console.log('Quick Donation button pressed for:', el.causeId);
    setDonationPressed(true);
  };

  const all = () => {
    return data.map(el => {
      const percentage = (el.current / el.target) * 100;
      const progressColor = percentage >= 100 ? '#ff6600' : percentage >= 66 ? '#ff781f' : percentage >= 33 ? '#ff8b3d' : '#ff9d5c';
      const timeAgo = formatTimeAgo(el.createdAt);

      return (
        <View key={el.causeId} style={styles.all}>
          <OneCause cause={el}/>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      );
    });
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>{all()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor:"white",
    borderRadius: 10,
    opacity: 10.5,
  },
  imageContainer: {
    opacity: 10.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
     width: 300,
    height: 200,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor:"white",
    width:300,
    opacity: 0.7,
  },
  title: {  
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  time: {
    fontSize: 16,
    color: '#ada6a6',
  },
  category: {
    fontWeight:"bold",
    fontSize: 16,
    color: '#33A09A',
    
  },
  amountsContainer: {
    alignSelf:'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  amountText: {
    marginRight: 10,
  },
  progressContainer: {
    alignSelf:'center',
    width: 300,
    height: 25,
    backgroundColor: '#ada6a6',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  progressBar: {
    height: 25,
    borderRadius: 5,
    width: 100,
  },
  progressText: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    fontSize: 17,
    color:'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    width: 200,
  },
 
  topButton: {
    marginLeft:-32,
    border: 'solid',
    marginVertical: 5,
    width: 125,
    borderRadius: 5,
    borderColor: "#ada6a6",
    borderWidth: 1,
    marginHorizontal:15,
    backgroundColor:"white",
  },
  bottomButton: {
    marginVertical: 5,
    width: 125,
    borderRadius: 5,
    borderColor: "#ada6a6",
    borderWidth: 1,
    backgroundColor:'white',
    
  },
  scrollContainer: {
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ada6a6',
    textAlign: 'center',
  },
  all:{
marginBottom:20,
  },
});

export default AllCauses;
