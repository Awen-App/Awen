import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button } from 'react-native';
import axios from 'axios';
import secret from "react-native-config"

const AllCauses = () => {
  const [data, setData] = useState([]);
  const getCauses = () => {
    axios
      .get(`${secret.ADRESS_IP}/getcauses`)
      .then(response => {
        setData(response.data);
        console.log(data, '----', response.data);
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
          <View style={styles.imageContainer}>
            <Image source={{ uri: el.causeImg }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{el.title}</Text>
          </View>
          <View>
            <Text>{timeAgo}</Text>
          </View>
          <View style={styles.amountsContainer}>
            <Text style={styles.amountText}>Target: {el.target}DT</Text>
            <Text style={styles.amountText}>Current: {el.current}DT</Text>
          </View>
          <Text>{el.causeCategory}</Text>
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]}
            />
          </View>
         <View style={styles.buttonContainer}>
  <Button style={styles.button} title="Details" onPress={() => handleDetailsPress(el)} />
  <Button style={styles.button} title="Quick Donation" onPress={() => handleQuickDonationPress(el)} />
</View>
        </View>
      );
    });
  };

  const handleDetailsPress = (el) => {
    console.log('Details button pressed for:', el);
  };

  const handleQuickDonationPress = (el) => {
    console.log('Quick Donation button pressed for:', el);
  };

  return <ScrollView contentContainerStyle={styles.container}>{all()}</ScrollView>;
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
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  amountText: {
    marginRight: 10,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    buttonContainer: {
      marginTop: 10,
      alignItems: 'center',
    },
    button: {
      marginVertical: 5,
      width: '80%',
    },}
});

export default AllCauses;
