

import React, { useEffect, useState } from 'react';
import { View, Text,ImageBackground,StyleSheet ,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
// import Slideshow from 'react-native-image-slider-show';
import axios from 'axios';
import ADDRESS_IP from '../../env';
import Swiper from 'react-native-swiper'
import Track from '../../component/Track';
import { Padding } from '@mui/icons-material';

import OneCause from '../../component/OneCause';
const x=[0,1,2,3,4]
const Greed = () => {
  const [data, setData] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    const retrieveToSlide = async () => {
      try {
        const res = await axios.get(`http://${ADDRESS_IP}:3001/slidecauses`);
        setData(res.data);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    retrieveToSlide();
  }, []);

if(data.length>0){

  return(
    <ScrollView style={{ flex: 1}}>
    <View style={{flex:1}}>
    <Swiper style={styles.wrapper} 
      autoplay={true}
      loop={true}
      autoplayTimeout={4}
      height={230}
    >
      {data.map((cause,i)=>{
        return (<ImageBackground source={{uri:cause.causeImg}} key={i} style={styles.image} >
          <Text style={styles.text}>{cause.title}</Text>
          <Text>date</Text>
        </ImageBackground>)
      })}
    </Swiper>
    </View>
    <Text style={styles.track}>Categories</Text>
    <View style={{ flex:0.5}}>
        <Swiper style={styles.swiper2}
            loop={true}
            showsPagination={true}
            height={250}
            
          >
          {x.map((e,i)=>{
            return <Track key={i}/>
          })}
        </Swiper>
    </View >
    <Text style={styles.all}>All</Text>
    <View >
        <Swiper style={styles.wrapper} loop={true} showsPagination={true} height={400}>
          {data.map((cause,i)=>{
            return (<View key={i} style={{flex:1}}>
              <OneCause cause={cause} />
            </View>)
          })}
        </Swiper>
        <TouchableOpacity  style={styles.appButtonContainer}>
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
    // height:'50%'
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
    marginBottom:20
  },
  appButtonContainer: {
        width:'70%',
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginLeft:50
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})