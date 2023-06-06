import * as React from 'react';

import { StyleSheet ,View,Text,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function AwenHeader() {
    const navigation=useNavigation();
    return (
      <View style={styles.header}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('../assets/awenLogo.png')}
        />
        <Text style={{color: 'black', paddingLeft:"80%",fontSize: 10}} onPress={()=>navigation.navigate("MyStack")}>Get Started</Text>
      </View>
    );
  }

const styles=StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingHorizontal:16
    }
})