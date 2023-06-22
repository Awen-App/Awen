import React, { useState } from 'react';
import { StyleSheet ,View,Text,Image,TouchableOpacity, Animated, Easing} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../fireBaseConfig';
import Icon from 'react-native-vector-icons/Feather';
export default function ProfileHeader() {
    const navigation=useNavigation()
    const [rotateValue] = useState(new Animated.Value(0));
    const orgid = auth.currentUser.uid;
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
          style={[{ width: 45, height: 55 }, { transform: [{ rotate: spin }] }]}
          source={require('../../assets/secondLogo.png')}
        />
      </TouchableOpacity>
      
         <TouchableOpacity style={styles.profile}><Icon
  name="log-out"
  style={styles.appButtonContainer}
  onPress={() => {
    auth.signOut();
    navigation.navigate("OrganizationLogin");
  }}
>
  {/* <Text style={styles.iconText}>LOG OUT</Text> */}
</Icon></TouchableOpacity>
      
        
      </View>
    );
  }

const styles=StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingHorizontal:1,
        height:70
    },
    profile:{
      flexDirection:'row',
      color: 'black',
      paddingLeft:"50%",
      fontSize: 17,
      marginLeft:70,
      fontWeight:"bold",
    },
    text:{
      fontSize: 17,
      fontWeight:"bold",
    },
    appButtonContainer: {
   
        fontSize: 25,
       
       color: 'grey',
        
      },
})
