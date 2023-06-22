import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import ADDRESS_IP from '../env';
import LoadingScreen from './LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
const CauseByCategory = (props) => {
  const navigation = useNavigation();
  console.log(props.route.params.choice);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getCauses = () => {
    axios
      .get(`http://${ADDRESS_IP}:3001/getcauseby/${props.route.params.choice}`)
      .then(response => {
        setData(response.data);
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

  const handleSearch = () => {
    const filteredData = data.filter(cause =>
      cause.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };

  const all = () => {
    return data.map(cause => {
      const percentage = (cause.current / cause.target) * 100;
      const progressColor =
        percentage >= 100 ? 'green' : percentage >= 66 ? 'ycauselow' : percentage >= 33 ? 'orange' : 'red';
      const timeAgo = formatTimeAgo(cause.createdAt);

      return (
        <View key={cause.causeId} style={styles.itemContainer}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
            <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
          </View>
          <ImageBackground source={{ uri: cause.causeImg }} style={styles.imageContainer} resizeMode="cover">
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{cause.title}</Text>
              <Text style={styles.time}></Text>
              <Text style={styles.category}>
                Category: {cause.causeCategory}                  Since:{timeAgo}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.amountsContainer}>
            <Text style={styles.amountText}>Target Amount: {cause.target}DT</Text>
            <Text style={styles.amountText}>Current Amount: {cause.current}DT</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.topButton]} onPress={() => navigation.navigate('CauseDetails', { cause })}>
              <Text style={[styles.buttonTitle]}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomButton]} onPress={() => handleQuickDonationPress(cause)}>
              <Text style={[styles.buttonTitle]}>Quick Donation</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const handleDetailsPress = cause => {
    console.log('Details button pressed for:', cause.causeId);
  };

  const handleQuickDonationPress = cause => {
    console.log('Quick Donation button pressed for:', cause.causeId);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <Searchbar
      placeholder="Search"
      onChangeText={handleSearch}
      value={searchQuery}
      style={styles.searchBar}
    />
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#33A09A',
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    width: 300,
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
    fontWeight: 'bold',
    fontSize: 16,
    color: '#33A09A',
  },
  amountsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  amountText: {
    marginRight: 10,
  },
  progressContainer: {
    alignSelf: 'center',
    width: 300,
    height: 25,
    backgroundColor: '#ada6a6',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
  },
  progressBar: {
    height: 25,
    borderRadius: 15,
    width: 100,
  },
  progressText: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    fontSize: 17,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    width: 200,
  },
  topButton: {
    marginLeft: -32,
    border: 'solid',
    marginVertical: 5,
    width: 125,
    borderRadius: 5,
    borderColor: '#ada6a6',
    borderWidth: 1,
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  bottomButton: {
    marginVertical: 5,
    width: 125,
    borderRadius: 5,
    borderColor: '#ada6a6',
    borderWidth: 1,
    backgroundColor: 'white',
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
  all: {
    marginBottom: 20,
  },
  searchBar: {
    width: '80%',
    marginBottom: 10,
    backgroundColor: 'white',
  },
});

export default CauseByCategory;
