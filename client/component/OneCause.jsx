import React, { useState ,useEffect} from 'react'
import { StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import ADDRESS_IP from '../env';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
const OneCause = ({cause}) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
    const percentage = (cause.current / cause.target) * 100;
    const progressColor = percentage >= 100 ? '#ff6600' : percentage >= 66 ? '#ff781f' : percentage>= 33 ?'#ff8b3d':'#ff9d5c';
    const navigation=useNavigation()
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
      await axios.put(`http://${ADDRESS_IP}:3001/current/${cause.causeId}`, current);
      console.log(cause.current, "this is current");
  
      if (current >= cause.target) {
        const updatedCause = { ...cause, status: false };
        await axios.put(`http://${ADDRESS_IP}:3001/update-cause/${cause.causeId}`, updatedCause);
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
          <Icon name="dollar-sign" size={14} color="#33A09A" />
            <Text style={styles.targetText}>{cause.target}DT</Text>
            <Icon name="flag" size={14} color="#33A09A" />
            <Text style={styles.amountText}>{cause.current}DT</Text>
          </View>
          
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.topButton]} onPress={()=>navigation.navigate('CauseDetails',{cause})}>
              <Text style={[styles.buttonTitle]}>Details</Text>
            </TouchableOpacity>
              
            <TouchableOpacity 

           onPress={openPaymentSheet}
            style={[styles.bottomButton]} >
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
      marginRight: 0,
    },
    targetText: {
      marginRight: 70,
    },
    progressContainer: {
      alignSelf:'center',
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
