import React from 'react'
import {Text , View ,ImageBackground,StyleSheet} from 'react-native'

const Track = () => {
  return (
    <View style={{flex:0.9}}>
        <ImageBackground source={require('../assets/texture.jpg')} style={styles.backgroundImage}>
                <Text style={styles.title}>title</Text>
                <Text style={styles.desc}>desc</Text>
                
        </ImageBackground>
    </View>
  )
}

export default Track
const styles=StyleSheet.create({
    backgroundImage:{
      
    //   display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',
  
        height:900,
        width:200,
        borderRadius:15,
        overflow:'hidden',
        // justifyContent:'center',
        // margin:50
        marginLeft:90
    },
    title:{
      color:'black',
      fontSize:25,
      margin:20
    },
    desc:{
      margin:5
    }
})