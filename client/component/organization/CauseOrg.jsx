import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import ADDRESS_IP from '../../env';
import LoadingScreen from '../LoadingScreen';
import useFetch from '../../useFetch';
const CauseOrg = (props) => {

  const {data : cause,error,isLoading}=useFetch(`http://${ADDRESS_IP}:3001/getcause/${props.route.params.el.causeId}`,[])
  const [showDescription, setShowDescription] = useState(false);
  

  const percentage = (cause.current / cause.target) * 100;
  const progressColor = percentage >= 100 ? '#ff6600' : percentage >= 66 ? '#ff781f' : percentage>= 33 ?'#ff8b3d':'#ff9d5c';
  if (isLoading) {
    return <LoadingScreen />
  }
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
        {/* <View>
          <Text style={styles.latestDonors}>Latest Donors</Text>
        </View> */}
        <TouchableOpacity style={styles.button} onPress={() => setShowDescription(!showDescription)}>
          <Text style={styles.buttonText}>More Details</Text>
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
    marginLeft: 132,
    border: 'solid',
    marginVertical: 5,
    width: 125,
    borderRadius: 10,
    borderColor: "#ada6a6",
    borderWidth: 1,
    marginHorizontal:15,
    backgroundColor:"white",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ada6a6',
    textAlign: 'center',
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

export default CauseOrg;
