import React, { useState ,useEffect,useContext} from 'react'
import {StyleSheet, Text, ScrollView, View, ImageBackground, TouchableOpacity} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import {auth} from '../../fireBaseConfig'
import axios from 'axios';
import ADDRESS_IP from '../../env';
import {TrakkerContext} from '../Context'
import CheckoutScreen  from '../../component/Payment'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
function HomeOrganization() {
  const [data,setData]=useState([]);
  const [trakker,setTrakker] = useContext(TrakkerContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser.email;
  const navigation=useNavigation()

  const fetchPaymentSheetParams = async () => {
      const response = await fetch(`http://${ADDRESS_IP}:3001/payment-sheet`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response,'my response----')
      const { paymentIntent, ephemeralKey, customer} = await response.json();
      console.log(paymentIntent, ephemeralKey, customer ,'cust')
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

  const openPaymentSheet = async () => {
    console.log("clicked")
    if (loading) { // Check if the payment sheet is initialized
      const { error } = await presentPaymentSheet();
      if (error) {
        alert(`Error code: ${error.code}`, error.message);
        console.log(error)
      } else {
        alert('Success', 'Your order is confirmed!');
      }
    } else {
      console.log("inizalize")
      alert('Payment sheet is not initialized yet');
    }
  };
  const getData = () => {
    axios
      .get(`http://${ADDRESS_IP}:3001/organizations/${user}/`)
      .then(response => {;
        
        return axios.get(`http://${ADDRESS_IP}:3001/causes/${response.data[0].orgId}`);
      })
      .then(res => {
        setData(res.data);
        
      })
      .catch(error => console.log(error));
  };
  
  useEffect(() => {
    getData();
    

    
  },[trakker]);
  
  const formatTimeAgo = timestamp => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diff = Math.abs(now - createdAt);
    const hours = Math.floor(diff / (1000 * 60 * 60));
  
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (hours < 720) {
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    } else {
      const months = Math.floor(hours / 720);
      return `${months} months ago`;
    }
  };


  const all = () => {
    return data.map(el => {
      const percentage = (el.current / el.target) * 100;
      const progressColor = percentage >= 100 ? 'green' : percentage >= 66 ? 'yellow' : percentage>= 33 ?'orange':'red';
      const timeAgo = formatTimeAgo(el.createdAt);
      return (
        <View key={el.causeId}>
        <View  style={styles.itemContainer}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: progressColor }]} />
            <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
          </View>
          <ImageBackground source={{ uri: el.causeImg }} style={styles.imageContainer} resizeMode="cover">
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{el.title}</Text>
              
              <Text style={styles.category}>{el.causeCategory}</Text>
            </View>
          </ImageBackground>
          

          <View style={styles.amountsContainer}>
          <Icon name="dollar-sign" size={14} color="#33A09A" />
            <Text style={styles.targetText}>{el.target}DT</Text>
            <Icon name="flag" size={14} color="#33A09A" />
            <Text style={styles.amountText}>{el.current}DT</Text>
          </View>
          
          <Text style={styles.amountText}>Status: {el.accepted ? 'Accepted' : 'Pending'}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.topButton]} onPress={()=>navigation.navigate('CauseOrg',{el})}>
              <Text style={[styles.buttonTitle]}>Details</Text>
            </TouchableOpacity>
             
          </View>
          
        </View>
        
        </View>
      );
    });
  };

  const handleDetailsPress = el => {
    console.log('Details button pressed for:', el.causeId);
  };

  const handleQuickDonationPress = el => {
    console.log('Quick Donation button pressed for:', el.causeId);
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>{all()}</ScrollView>
    </View>
  );
}
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
    marginBottom:20,
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
    marginLeft:0,
    border: 'solid',
    marginVertical: 5,
    width: 190,
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

export default HomeOrganization
