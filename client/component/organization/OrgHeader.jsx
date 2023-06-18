import * as React from 'react';
import { StyleSheet ,View,Text,Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../fireBaseConfig';
import Icon from 'react-native-vector-icons/Feather';
export default function OrgHeader() {
    const navigation=useNavigation()
  
    const orgid = auth.currentUser.uid;
    
    return (
      <View style={styles.header}>
        <Image
          style={{ width: 45, height: 55 }}
          source={require('../../assets/secondLogo.png')}
        />
      
        {orgid===null && <TouchableOpacity style={styles.profile} onPress={()=>navigation.navigate("OrganizationLogin")}><Icon name="user" size={27} color="#33A09A" /><Text style={styles.text}>Log In</Text></TouchableOpacity>}
        
        {orgid!==null && <TouchableOpacity style={styles.profile} onPress={()=>{
          navigation.navigate("profile");
        }}><Icon name="user" size={27} color="#33A09A" /><Text style={styles.text}>Profile</Text></TouchableOpacity>}
        
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
        height:70
    },
    profile:{
      flexDirection:'row',
      color: 'black',
      paddingLeft:"60%",
      fontSize: 17,
      marginLeft:20,
      fontWeight:"bold",
    },
    text:{
      fontSize: 17,
      fontWeight:"bold",
    }
})
