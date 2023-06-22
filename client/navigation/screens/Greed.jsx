

import React from 'react';
import { View, Text,ImageBackground,StyleSheet ,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import LoadingScreen from '../../component/LoadingScreen';
import ADDRESS_IP from '../../env';
import Swiper from 'react-native-swiper'
import Track from '../../component/Track';
import {useNavigation} from '@react-navigation/native';
import OneCause from '../../component/OneCause';
import useFetch from '../../useFetch';
const category=[{name:"Environmental", icon:"globe"},{name:"Social",icon:"slideshare"},{name:"Aid",icon:"heart"},{name:"Other",icon:"infinity"}]
const Greed = () => {
  const navigation=useNavigation();
  const {data : latest,error,isLoading}=useFetch(`http://${ADDRESS_IP}:3001/latest`,[]);
  const {data : data,error:err}=useFetch(`http://${ADDRESS_IP}:3001/slidecauses`,[])
  if (isLoading) {
    return <LoadingScreen />
  }
if(data.length>0){

  return(
    <ScrollView style={{ flex: 1}}>
      <Text style={styles.all}>Featured</Text>
    <View style={{flex:1}}>
    <Swiper style={styles.wrapper} 
      autoplay={true}
      loop={true}
      autoplayTimeout={4}
      height={260}
    >
      {data.map((cause,i)=>{
        return (<ImageBackground source={{uri:cause.causeImg}} key={i} style={styles.image} >
          <Text style={styles.text}>{cause.title}</Text>
        </ImageBackground>)
      })}
    </Swiper>
    </View>
    <Text style={styles.track}>Categories</Text>
    <View style={{ flex:0.5,backgroundColor:"white"}}>
        <Swiper style={styles.swiper2}
            loop={true}
            showsPagination={true}
            height={250}
            
          >
          {category.map((e,i)=>{
            
            return (
            <Track el={e} key={i}/>)
          })}
        </Swiper>
    </View >
    
    <View >
    <Text style={styles.all}>All</Text>
        <Swiper style={styles.wrapper} loop={true} showsPagination={true} height={400}>
          {data.map((cause,i)=>{
            return (<View key={i} style={{flex:1}}>
              <OneCause cause={cause} />
            </View>)
          })}
        </Swiper>
        <TouchableOpacity  style={styles.appButtonContainer} onPress={()=>navigation.navigate('AllCauses')}>
              <Text style={styles.appButtonText}>Show more</Text>
        </TouchableOpacity> 
    </View>
    
    <View >
    <Text style={styles.all}>Latest</Text>
        <Swiper style={styles.wrapper} loop={true} showsPagination={true} height={400}>
          {latest.map((cause,i)=>{
            return (
            <View key={i} style={{flex:1}}>
              
              <OneCause cause={cause} />
            </View>)
          })}
        </Swiper>
        <TouchableOpacity  style={styles.appButtonContainer} onPress={()=>navigation.navigate("LatestCauses")}>
              <Text style={styles.appButtonText}>Show more</Text>
        </TouchableOpacity> 
    </View>
    </ScrollView>
  )
}
};

export default Greed;

const styles=StyleSheet.create({
  container: {
    // flex: 0.1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper:{
    // width:'80%',
    // flex:1,
    position:'relative',
    // height:580,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    backgroundColor:'white'
  },
  image:{
    resizeMode: 'cover', 
    justifyContent: 'center',
    height:190,
    margin:20,
    opacity:0.8,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3
    // shadowOpacity:
    
    // shadowOpacity:
    // borderTopRightRadius:15
  },
  text:{
    marginLeft:20,
    fontSize:20,
    color:'white',
    fontStyle:'italic',
  },
  track:{
    // marginLeft:50,
    margin:10,
    fontWeight:'bold',
    fontSize:25
  },
  swiper2:{
    // width:'20%',
    // flex:0.6,
    // display:'flex',
    // flexDirection:'row'
  },
  all:{
    fontSize:25,
    marginLeft:20,
    marginTop:20,
    fontWeight: "bold",
    marginBottom:20
  },
  appButtonContainer: {
        width:'70%',
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft:50,
        marginBottom:50
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  categoryImage:{
      
    //   display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',
  
        height:900,
        width:210,
        borderRadius:15,
        overflow:'hidden',
        gin:50,
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