import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Image, Button } from 'react-native';
import axios from 'axios';
import ADDRESS_IP from '../env';

const AllCauses = () => {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  const getCauses = () => {
    axios
      .get(`http://${ADDRESS_IP}:3001/causeaccepted`)
      .then(response => {
        setData(response.data);
        console.log(data, '----', response.data);

        // Calculate and set the progress
        response.data.forEach(el => {
          const percentage = (el.current / el.target) * 100;
          setProgress(percentage);
        });
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
    } else {
      return `${hours} hours ago`;
    }
  };

  const all = () => {
    return data.map(el => {
      const percentage = (el.current / el.target) * 100;
      const progressColor = percentage >= 100 ? 'green' : 'red';
      const timeAgo = formatTimeAgo(el.createdAt);

      return (
        <View key={el.causeId} style={styles.itemContainer}>
          <ImageBackground source={{ uri: el.causeImg }} style={styles.imageContainer} resizeMode="cover">
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{el.title}</Text>
              <Text style={styles.time}>{timeAgo}</Text>
              <Text style={styles.category}>Category : {el.causeCategory}</Text>
            </View>
          </ImageBackground>
          <View style={styles.amountsContainer}>
            <Text style={styles.amountText}>Target: {el.target}DT</Text>
            <Text style={styles.amountText}>Current: {el.current}DT</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
           
            <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={[styles.topButton]}
              title="Details"
              onPress={() => handleDetailsPress(el)}
            />
            <Button
              style={[styles.bottomButton]}
              title="Quick Donation"
              onPress={() => handleQuickDonationPress(el)}
            />
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
    marginBottom: 20,
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
    color: 'white',
  },
  category: {
    fontWeight:"bold",
    fontSize: 14,
    color: 'white',
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
    width: 200,
    height: 15,
    backgroundColor: '#ada6a6',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  progressBar: {
    height: 15,
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
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    Color: '#33A09A',
  },
  bottomButton: {
    marginVertical: 5,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#FFA500',
  },
  scrollContainer: {
    alignItems: 'center',
  },
});

export default AllCauses;
