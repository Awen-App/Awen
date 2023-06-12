import React, { useState ,useEffect} from 'react'
import {StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity} from 'react-native';
import {auth} from '../../fireBaseConfig'
import axios from 'axios';
import ADDRESS_IP from '../../env';
function HomeOrganization() {
  const [data,setData]=useState([]);
  const user = auth.currentUser.email;
  console.log(user,"this is user")


  const getData = () => {
    axios
      .get(`http://${ADDRESS_IP}:3001/organizations/${user}/`)
      .then(response => {;
        console.log(response.data[0].orgId, 'response');
        return axios.get(`http://${ADDRESS_IP}:3001/causes/${response.data[0].orgId}`);
      })
      .then(res => {
        setData(res.data);
        console.log(res.data, 'this is data');
      })
      .catch(error => console.log(error));
  };
  
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


  const all = () => {
    return data.map(el => {
      const percentage = (el.current / el.target) * 100;
      const progressColor = percentage >= 100 ? 'green' : percentage >= 66 ? 'yellow' : percentage>= 33 ?'orange':'red';
      const timeAgo = formatTimeAgo(el.createdAt);

      return (
        <View key={el.causeId} style={styles.itemContainer}>
          <ImageBackground source={{ uri: el.causeImg }} style={styles.imageContainer} resizeMode="cover">
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{el.title}</Text>
              <Text style={styles.time}></Text>
              <Text style={styles.category}>Category : {el.causeCategory}                  Since:{timeAgo}</Text>
            </View>
          </ImageBackground>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
           
            <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
          </View>

          <View style={styles.amountsContainer}>
            <Text style={styles.amountText}>Target Amount: {el.target}DT</Text>
            <Text style={styles.amountText}>Current Amount: {el.current}DT</Text>
          </View>
          
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.topButton]} onPress={() => handleDetailsPress(el)}>
              <Text style={[styles.buttonTitle]}>Details</Text>
            </TouchableOpacity>
              
            <TouchableOpacity style={[styles.bottomButton]} onPress={() => handleQuickDonationPress(el)}>
              <Text style={[styles.buttonTitle]}>Quick Donation</Text>
              </TouchableOpacity>
              
              
          </View>
        </View>
      );
    });
  };

  const handleDetailsPress = el => {
    console.log('Details button pressed for:', el.causeId);
  };

  const handleQuickDonationPress = el => {
    console.log('Quick Donation button pressed for:', el.causeId);
  };


  useEffect(() => {
    getData();
  },[]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>{all()}</ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor:"#D9DDDC",
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
     width: 300,
    height: 100,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  time: {
    fontSize: 14,
    color: '#FFA500',
  },
  category: {
    fontWeight:"bold",
    fontSize: 14,
    color: '#FFA500',
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
    width: 250,
    height: 19,
    backgroundColor: '#ada6a6',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  progressBar: {
    height: 19,
    borderRadius: 5,
    width: 100,
  },
  progressText: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    fontSize: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: 200,
  },
 
  topButton: {
    border: 'solid',
    marginVertical: 5,
    width: 250,
    borderRadius: 5,
    backgroundColor: '#33A09A',
  },
  bottomButton: {
    marginVertical: 5,
    width: 250,
    borderRadius: 5,
    backgroundColor: '#FFA500',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
})


export default HomeOrganization
