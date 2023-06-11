import * as React from 'react';
//hedhi l bar l foukaneya

import { StyleSheet ,View,Text,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function AwenHeader() {
    const navigation=useNavigation();
    return (
      <View style={styles.header}>
        <Image
          style={{ width: 45, height: 55 }}
          source={require('../assets/secondLogo.png')}
        />
        <Text style={{color: 'black', paddingLeft:"60%",fontSize: 10, marginLeft:20}} onPress={()=>navigation.navigate("UserSignin")}>Log In</Text>
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
        height:70
    }
})