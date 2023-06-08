import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const CauseDetail = () => {
  const [cause, setCause] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://${ADDRESS_IP}:3001/getcause/${id}`)
        setCause(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: cause.causeImg}} style={styles.image} />
        <Text style={styles.title}>title{cause.title}</Text>
        <View style={styles.amountContainer}>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>Donated Amount</Text>
            <Text style={styles.amountValue}>{cause.current}</Text>
          </View>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>Required Amount</Text>
            <Text style={styles.amountValue}>{cause.target}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.latestDonors}>Latest Donors</Text>
          {/* Render your donors list here */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDescription(!showDescription)}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
        {showDescription && <Text style={styles.description}>{cause.description}</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
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
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountValue: {
    fontSize: 16,
  },
  latestDonors: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
  },
});

export default CauseDetail;