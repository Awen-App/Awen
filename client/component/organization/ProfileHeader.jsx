import * as React from 'react';
import { StyleSheet ,View,Text,Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../fireBaseConfig';
import Icon from 'react-native-vector-icons/Feather';
export default function ProfileHeader() {
    const navigation=useNavigation()
  
    const orgid = auth.currentUser.uid;
    
    return (
      <View style={styles.header}>
       <Image
          style={{ width: 45, height: 55 }}
          source={require('../../assets/secondLogo.png')}
        />
      
         <TouchableOpacity style={styles.profile}><Icon
  name="log-out"
  style={styles.appButtonContainer}
  onPress={() => {
    auth.signOut();
    navigation.navigate("OrganizationLogin");
  }}
>
  {/* <Text style={styles.iconText}>LOG OUT</Text> */}
</Icon></TouchableOpacity>
      
        
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
        height:80
    },
    profile:{
      flexDirection:'row',
      color: 'black',
      paddingLeft:"60%",
      fontSize: 17,
      marginLeft:40,
      fontWeight:"bold",
    },
    text:{
      fontSize: 17,
      fontWeight:"bold",
    },
    appButtonContainer: {
   
        fontSize: 25,
        marginRight: 5,
       color: 'grey',
        
      },
})
