import React,{useState} from 'react'
import {Text , View ,ImageBackground,StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';
const category=[{name:"Environmental", icon:"globe"},{name:"Social",icon:"slideshare"},{name:"Aid",icon:"heart"},{name:"Other",icon:"infinity"}]
const Track = ({el}) => {
  console.log(el)
  const navigation=useNavigation()
const [choice,setChoice]=useState("")
console.log(choice)
const categories=()=>{
return(
  <View >
          <Text style={styles.title} onPress={()=>{setChoice(el.name),navigation.navigate('CauseByCategory', {choice})}}>{el.name}</Text>
          <Icon style={styles.icon} name={el.icon} size={80} color="black" />
  </View>
)
}
   return(
    <View style={{flex:0.9}}>{categories()}</View>
   )
}

export default Track
const styles=StyleSheet.create({
    backgroundImage:{

    //   display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',

        height:900,
        width:210,
        borderRadius:15,
        overflow:'hidden',
        // justifyContent:'center',
        // margin:50
        marginLeft:90
    },
    title:{
      color:'black',
      fontSize:20,
      margin:30,
      fontWeight:'bold',
      alignSelf: 'center',
    },
    desc:{
      margin:5
    },
    icon:{
      alignSelf: 'center',

    }
})