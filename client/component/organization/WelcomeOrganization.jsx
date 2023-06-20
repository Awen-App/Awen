import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

function WelcomeOrganization() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text>this is --- +++66666666+</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <Card style={[styles.cardContainer, { height: 280 }]}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title="Top 10 South African beaches"
          />
          <CardTitle subtitle="Number 6" />
          <CardContent text="Clifton, Western Cape" />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Share" color="#FEB557" />
            <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
          </CardAction>
        </Card>
        <Card style={[styles.cardContainer, { height: 280}]}>
          <CardImage
            source={{
              uri: 'https://www.pbs.org/wnet/nature/files/2022/08/pexels-frans-van-heerden-5729293-scaled-e1660158065793-1280x720.jpg',
            }}
            title="Top 10 South African beaches"
          />
          <CardTitle subtitle="Number 6" />
          <CardContent text="Clifton, Western Cape" />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Share" color="#FEB557" />
            <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
          </CardAction>
        </Card>
      </ScrollView>
      <ScrollView contentContainerStyle={styles.scrollViewContent2}>
        <Card style={[styles.cardContainer, { height: 350 }]}>
          <CardImage
            source={{ uri: 'http://bit.ly/2GfzooV' }}
            title="Top 10 South African beaches"
          />
          <CardTitle subtitle="Number 6" />
          <CardContent text="Clifton, Western Cape" />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Share" color="#FEB557" />
            <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
          </CardAction>
        </Card>
        <Card style={[styles.cardContainer, { height: 350 }]}>
          <CardImage
            source={{
              uri: 'https://www.pbs.org/wnet/nature/files/2022/08/pexels-frans-van-heerden-5729293-scaled-e1660158065793-1280x720.jpg',
            }}
            title="Top 10 South African beaches"
          />
          <CardTitle subtitle="Number 6" />
          <CardContent text="Clifton, Western Cape" />
          <CardAction separator={true} inColumn={false}>
            <CardButton onPress={() => {}} title="Share" color="#FEB557" />
            <CardButton onPress={() => {}} title="Explore" color="#FEB557" />
          </CardAction>
        </Card>
      </ScrollView>
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
});
