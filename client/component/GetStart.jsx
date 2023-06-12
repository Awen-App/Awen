import { Translate } from '@mui/icons-material';
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const GetStart = () => {
  const navigation=useNavigation()
  return (
   
      
    
    <View style={styles.container}>
 
      <ImageBackground
        source={{uri:'https://c1.wallpaperflare.com/preview/648/593/286/caucasian-charity-community-donation.jpg'}}
        style={styles.backgroundImage}
      >
        </ImageBackground>
        <Image source={require("../assets/logo-awen-final1.png")} style={styles.logo}/>
        {/* <Text style={styles.title}>
          WELCOME TO AWEN
        </Text> */}
      <View style={styles.content}>
        
        <Text style={styles.description}>
          Awen is a safe platform for crowdfunding under the supervision of the General Authority for Endowments aims to stimulate community participation in the endowment field. It provides the opportunity for partial or full contribution to support projects and finance them digitally through secure payment options.
        </Text>
        
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('grid')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  content: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop:120,
    opacity:0.5
  
  }
  ,
  logo:{
    height:120,
    width:200,
   marginBottom:60,
    
  },
  title: {
    color: '#ff6600',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    // color: '',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff6600',
    borderRadius: 10,
    padding: 15,
    marginTop:8,
    width:300,
   height:61,
   justifyContent:'center',
   marginBottom:150,
    
  },
  buttonText: {
    color: '#ff6600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GetStart;
