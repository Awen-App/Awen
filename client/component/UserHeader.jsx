import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet ,View,Text,Image,TouchableOpacity, Animated, Easing} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../fireBaseConfig';
import Icon from 'react-native-vector-icons/Feather';
import { AuthContext } from './Context'
export default function UserHeader() {
    const navigation=useNavigation()
    const [rotateValue] = useState(new Animated.Value(0));
    const [authUser,setAuthUser]=useContext(AuthContext)
    console.log(authUser,"mail")
    const logOutUser=()=>{
              auth.signOut();
              setAuthUser({email:null,token:'',email:null,orgEmail:null})
            }
         console.log(authUser,"mail")
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
          style={[{ width: 75, height: 50,right:35, }, { transform: [{ rotate: spin }] }]}
          source={require('../assets/logo-awen-final1.png')}
        />
        </TouchableOpacity>
      
         <TouchableOpacity style={styles.profile}><Icon
  name="log-out"
  style={styles.appButtonContainer}
  onPress={() => {
    logOutUser();
    navigation.navigate("UserSignin");
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
        paddingHorizontal:10,
        height:80
    },
    profile:{
      flexDirection:'row',
      color: 'black',
      paddingLeft:"60%",
      fontSize: 17,
      marginLeft:0,
      fontWeight:"bold",
    },
    text:{
      fontSize: 17,
      fontWeight:"bold",
    },
    appButtonContainer: {
   
        fontSize: 25,
       color: 'grey',
       marginRight:20,
        
      },
})
