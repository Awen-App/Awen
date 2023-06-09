import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import ADDRESS_IP from '../env';
import LoadingScreen from './LoadingScreen';
import { useStripe } from '@stripe/stripe-react-native';
// import io from 'socket.io-client';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './Context';
import useFetch from '../useFetch';
import { Avatar } from '@rneui/themed';
// import socket from '../socket.js'
const CauseDetail = (props) => {
  const [user,setUser]=useContext(AuthContext)
  // const [organization,setOrganization]=useState(null)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  console.log(AuthContext)
  const navigation=useNavigation();
  // console.log('primar consolog',props.route.params.cause.causeId)
  // console.log('second consolog',props.route.key)
  // const [cause, setCause] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [leftRoom,setLeftRoom]=useState({})// const route=useRoute();
  // const id=route.params.id
  const {data : cause,error,isLoading}=useFetch(`http://${ADDRESS_IP}:3001/getcause/${props.route.params.cause.causeId}`,[])
  const {data:organization,error:e}=useFetch(`http://${ADDRESS_IP}:3001/organizations/id/${cause.authorId}`,[])
  console.log(organization,'////////////////////////')
  const joinRoom=async()=>{
    const org=await axios.get(`http://${ADDRESS_IP}:3001/organizations/id/${props.route.params.cause.authorId}`)

    const room=await axios.get(`http://${ADDRESS_IP}:3001/room/${user.email}/${org.data.orgName}`)
    if(Object.keys(room.data).length>0){
      setLeftRoom(room.data[0])
      navigation.navigate('room',{leftRoom})
    }else if(Object.keys(room.data).length===0){
      
      await axios.post(`http://${ADDRESS_IP}:3001/startConversation`,{
        orgName:org.data.orgName,
        userEmail:user.email,
        orgId:org.data.orgId
      })
      const startChat=await axios.get(`http://${ADDRESS_IP}:3001/room/${user.email}/${org.data.orgName}`)
      setLeftRoom(startChat.data[0])
      // await socket.emit('join_room',startChat.data[0].conversationId);
      navigation.navigate('room',{leftRoom})
    }
  }
//   const getOrganization=async()=>{
//     const org=await axios.get(`http://${ADDRESS_IP}:3001/organizations/id/${cause.authorId}`)
//     setOrganization(org.data)
  
// }
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(`http://${ADDRESS_IP}:3001/getcause/${props.route.params.cause.causeId}`);
  //       setCause(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const percentage = (cause.current / cause.target) * 100;
  const progressColor = percentage >= 100 ? '#ff6600' : percentage >= 66 ? '#ff781f' : percentage>= 33 ?'#ff8b3d':'#ff9d5c';
  if (isLoading) {
    return <LoadingScreen />
  }
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://${ADDRESS_IP}:3001/payment-sheet`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  
  
};

const initializePaymentSheet = async () => {
  const {
    paymentIntent,
    ephemeralKey,
    customer,
    publishableKey,
  } = await fetchPaymentSheetParams();
  const { error } = await initPaymentSheet({
    merchantDisplayName: "Example, Inc.",
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
    allowsDelayedPaymentMethods: true,
    defaultBillingDetails: {
      name: 'Jane Doe',
    }
  });
  console.log(error,'err')
  if (!error) {
    setLoading(true);
  }
}
const updateCurrent = async () => {
  let current = cause.current + 10.99;
  try {
    await axios.put(`http://${ADDRESS_IP}:3001/current/${props.route.params.cause.causeId}`, current);
    console.log(cause.current, "this is current");

    if (current >= cause.target) {
      const updatedCause = { ...cause, status: false };
      await axios.put(`http://${ADDRESS_IP}:3001/update-cause/${props.route.params.cause.causeId}`, updatedCause);
      console.log(updatedCause);
    }
  } catch (err) {
    console.log(err, 'from update');
  }
};
const openPaymentSheet = async () => {
  if (loading) { // Check if the payment sheet is initialized
    const { error } = await presentPaymentSheet();
    if (error) {
      alert(`Error code: ${error.code}`, error.message);
      console.log(error)
    } else {
      alert('Success', 'Your order is confirmed!');
      updateCurrent()
    }
  } else {
    alert('Payment sheet is not initialized yet');
  }
};

useEffect(() => {
  initializePaymentSheet()
  
},[]);

  return (
    <View style={styles.container}>
     
          <View style={styles.send}>
            <Text style={styles.amountText}>Message Us  </Text>
          <Icon name="send" size={17} color="orange"  onPress={()=>{
          joinRoom()
          }}/>
            </View>
     
      <ScrollView>
      <Text style={styles.title}>{cause.title}</Text>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: cause.causeImg }} style={styles.image} resizeMode="cover" >
              {organization && <Avatar
                size={52}
                rounded
                source={{ uri: organization.orgImg }}
                avatarStyle={{margin:2}}
              />}
          </ImageBackground>
          <View style={styles.imageOverlay}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
              <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
            </View>
          </View>
        </View>

        
        <View style={styles.amountContainer}>
          <View style={[styles.amountBox, styles.shadow]}>
            <Icon name="dollar-sign" size={17} color="#33A09A" />
            <Text style={styles.amountText}>Donated Amount</Text>
            <Text style={[styles.amountValue, styles.boldText]}>{cause.current}</Text>
          </View>
          <View style={[styles.amountBox, styles.shadow]}>
            <Icon name="flag" size={17} color="#33A09A" />
            <Text style={styles.amountText}>Required Amount</Text>
            <Text style={[styles.amountValue, styles.boldText]}>{cause.target}</Text>
          </View>
        </View>
        {/* <View>
          <Text style={styles.latestDonors}>Latest Donors</Text>
        </View> */}
        <View style={styles.buttonContainer}>
         <TouchableOpacity 

onPress={openPaymentSheet}
 style={styles.topButton} >
   <Text style={styles.buttonText}>Donate</Text>
   </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={() => setShowDescription(!showDescription)}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
        
        {showDescription && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.amountText}>{cause.title}</Text>
            <Text style={styles.description}>{cause.causeDescription}</Text>
          </View>
        )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  amountBox: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    marginHorizontal: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  amountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#33A09A',
  },
  amountValue: {
    fontSize: 12,
    color: 'orange',
  },
  boldText: {
    fontWeight: 'bold',
  },
  latestDonors: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#33A09A',
  },
  button: {
    marginLeft: 132,
    border: 'solid',
    marginVertical: 5,
    width: 125,
    borderRadius: 10,
    borderColor: "#ada6a6",
    borderWidth: 1,
    marginHorizontal:15,
    backgroundColor:"white",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ada6a6',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:"white",
    borderRadius:10
  },
  title2: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#33A09A',
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
    fontWeight: '500',
  },
  progressContainer: {
    alignSelf: 'center',
    width: 300,
    height: 25,
    backgroundColor: '#ada6a6',
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
  },
  progressBar: {
    height: 25,
    borderRadius: 15,
    width: 100,
  },
  progressText: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    fontSize: 17,
  },
  buttonContact:{
    marginLeft: 110,
    border: 'solid',
    marginVertical: 5,
    width: 180,
    borderRadius: 10,
  send: {
    position: 'relative',
    marginBottom: 10,
    alignSelf:"flex-end" ,
    fontSize: 17,
    marginTop: 10,
    borderRadius: 5,
    right:15,
    flexDirection: 'row',
  },
  bottomButton: {
    marginVertical: 5,
    width: 125,
    borderRadius: 5,
    borderColor: "#ada6a6",
    borderWidth: 1,
    backgroundColor:'white',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
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
  }
  },
  bottomButton: {
    marginVertical: 5,
    width: 125,
    borderRadius: 5,
    borderColor: "#ada6a6",
    borderWidth: 1,
    backgroundColor:'white',
    
  },
});

export default CauseDetail;
