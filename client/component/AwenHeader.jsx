import React, { useState } from 'react';
//hedhi l bar l foukaneya

import { StyleSheet ,View,Text,Image,TouchableOpacity, Animated, Easing} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './Context';
import Icon from 'react-native-vector-icons/Feather';
export default function AwenHeader() {
    const navigation=useNavigation()
     const [rotateValue] = useState(new Animated.Value(0));
    const [authUser,setAuthUser]=React.useContext(AuthContext)
    // console.log(authUser)
    const rotate = () => {
    const rotateAnimation = Animated.timing(rotateValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    rotateAnimation.start(() => {
      rotateValue.setValue(0);
    });
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={rotate}>
        <Animated.Image
          style={[{ width: 75, height: 50 }, { transform: [{ rotate: spin }] }]}
          source={require('../assets/logo-awen-final1.png')}
        />
        </TouchableOpacity>
      
        {authUser.email===null && <TouchableOpacity style={styles.profile} onPress={()=>navigation.navigate("UserSignin")}><Icon name="user" size={27} color="#33A09A" /><Text style={styles.text}>Log In</Text></TouchableOpacity>}
        
        {authUser.email!==null && <TouchableOpacity style={styles.profile} onPress={()=>{
          navigation.navigate("profileUser");
        }}><Icon name="user" size={27} color="#33A09A" /><Text style={styles.text}>Profile</Text></TouchableOpacity>}
        
      </View>
    );
  }

const styles=StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingHorizontal:16,
        height:80
    },
    profile:{
      flexDirection:'row',
      color: 'black',
      paddingLeft:"60%",
      fontSize: 17,
      marginLeft:20,
      fontWeight:"bold",
    },
    text:{
      fontSize: 17,
      fontWeight:"bold",
    }
})
