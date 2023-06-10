import React from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const OneCause = ({cause}) => {
    const percentage = (cause.current / cause.target) * 100;
    const progressColor = percentage >= 100 ? '#ff6600' : percentage >= 66 ? '#ff781f' : percentage>= 33 ?'#ff8b3d':'#ff9d5c';
    const navigation=useNavigation()
  return (
    <View key={cause.causeId} style={styles.itemContainer}>
                 <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
            <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
          </View>
          <ImageBackground source={{ uri: cause.causeImg }} style={styles.imageContainer} resizeMode="cover">
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{cause.title}</Text>
              <Text style={styles.category}>{cause.causeCategory}</Text>
              
            </View>
          </ImageBackground>
   

          <View style={styles.amountsContainer}>
            <Text style={styles.amountText}>Target Amount: {cause.target}DT</Text>
            <Text style={styles.amountText}>Current Amount: {cause.current}DT</Text>
          </View>
          
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.topButton]} onPress={()=>navigation.navigate('CauseDetails',{cause})}>
              <Text style={[styles.buttonTitle]}>Details</Text>
            </TouchableOpacity>
              
            <TouchableOpacity style={[styles.bottomButton]} >
              <Text style={[styles.buttonTitle]}>Donate</Text>
              </TouchableOpacity>
          </View>
        </View>
  )
}

export default OneCause;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      
    },
    itemContainer: {
      alignItems: 'center',
      marginBottom: 0,
      backgroundColor:"white",
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
      backgroundColor:"white",
      width:300,
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
      fontWeight:"bold",
      fontSize: 16,
      color: '#33A09A',
      
    },
    amountsContainer: {
      alignSelf:'center',
      flexDirection: 'row',
      marginBottom: 5,
    },
    amountText: {
      marginRight: 10,
    },
    progressContainer: {
      alignSelf:'center',
      width: 300,
      height: 25,
      backgroundColor: '#ada6a6',
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 5,
    },
    progressBar: {
      height: 25,
      borderRadius: 5,
      width: 100,
    },
    progressText: {
      position: 'absolute',
      top: 0,
      alignSelf: 'center',
      fontSize: 17,
      color:'white'
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
      width: 200,
    },
   
    topButton: {
      marginLeft:-32,
      border: 'solid',
      marginVertical: 5,
      width: 125,
      borderRadius: 5,
      borderColor: "#ada6a6",
      borderWidth: 1,
      marginHorizontal:15,
      backgroundColor:"white",
    },
    bottomButton: {
      marginVertical: 5,
      width: 125,
      borderRadius: 5,
      borderColor: "#ada6a6",
      borderWidth: 1,
      backgroundColor:'white',
      
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
    all:{
  marginBottom:20,
    },
  });
