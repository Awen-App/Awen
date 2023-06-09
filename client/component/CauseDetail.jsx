import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import ADDRESS_IP from '../env';

const CauseDetail = () => {
  const [cause, setCause] = useState({});
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://${ADDRESS_IP}:3001/getcause/clijfptw30000miv8bnl6bw3w`);
        setCause(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const percentage = (cause.current / cause.target) * 100;
  const progressColor = percentage >= 100 ? 'green' : percentage >= 66 ? 'yellow' : percentage >= 33 ? 'orange' : 'red';

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: cause.causeImg }} style={styles.image} resizeMode="cover" />
          <View style={styles.imageOverlay}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
              <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>{cause.title}</Text>
        <View style={styles.amountContainer}>
          <View style={[styles.amountBox, styles.shadow]}>
            <Icon name="dollar-sign" size={14} color="#33A09A" />
            <Text style={styles.amountText}>Donated Amount</Text>
            <Text style={[styles.amountValue, styles.boldText]}>{cause.current}</Text>
          </View>
          <View style={[styles.amountBox, styles.shadow]}>
            <Icon name="flag" size={14} color="#33A09A" />
            <Text style={styles.amountText}>Required Amount</Text>
            <Text style={[styles.amountValue, styles.boldText]}>{cause.target}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.latestDonors}>Latest Donors</Text>
          {/* Render your donors list here */}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setShowDescription(!showDescription)}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
        {showDescription && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.title2}>{cause.title}</Text>
            <Text style={styles.description}>{cause.causeDescription}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  amountBox: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    marginHorizontal: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#33A09A',
  },
  amountValue: {
    fontSize: 12,
    color: 'orange',
  },
  boldText: {
    fontWeight: 'bold',
  },
  latestDonors: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#33A09A',
  },
  button: {
    backgroundColor: '#33A09A',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:"white",
    borderRadius:10
  },
  title2: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#33A09A',
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
  },
  progressContainer: {
    alignSelf: 'center',
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
  },
});

export default CauseDetail;
