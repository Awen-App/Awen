import React, { useContext, useEffect,useState } from 'react'
import { View ,Text,ScrollView,StyleSheet} from 'react-native';
import axios from 'axios'
import { AuthContext } from '../../component/Context';
import { DataTable } from 'react-native-paper';
import ADDRESS_IP from '../../env';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from '@rneui/themed';
const Chat = () => {
  const navigation=useNavigation()
  const [user,setUser]=useContext(AuthContext);
  const [conversations,setConversations]=useState([]);
  useEffect(()=>{
    const retrieve=async()=>{
      if(user.email!==null){
        const all=await axios.get(`http://${ADDRESS_IP}:3001/conversations/${user.email}`);
        setConversations(all.data);
      }else if(user.orgEmail!==null){
        const org=await axios.get(`http://${ADDRESS_IP}:3001/organizations/${user.orgEmail}`)
        console.log(org.data)
        const all=await axios.get(`http://${ADDRESS_IP}:3001/orgconversations/${org.data[0].orgName}`);
        console.log(all.data)
        setConversations(all.data);
      }
    }
    retrieve()

  },[])
  console.log(conversations)

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header style={{height:50}}>
          <DataTable.Title textStyle={{alignItems:"center",left:120,fontSize:25}} >Messages</DataTable.Title>
        </DataTable.Header>
        {conversations.map((el,i)=>{
          return(
            <DataTable.Row key={i} onPress={()=>{navigation.navigate('room',{leftRoom:el})}} style={styles.row}>
                {user.email!==null && <DataTable.Cell style={{flex:0.25}}><View>
                  
                <Avatar 
                                              size={48}
                                              rounded
                                              title={el.orgName[0].toUpperCase()}
                                              containerStyle={{ backgroundColor: "purple" }}
                                              /></View></DataTable.Cell>}
                
                {user.orgEmail!==null && <DataTable.Cell style={{flex:0.25}}><Avatar 
                                              size={48}
                                              rounded
                                              title={el.userEmail[0].toUpperCase()}
                                              containerStyle={{ backgroundColor: "purple" }}/></DataTable.Cell>}
              {user.email!==null && <DataTable.Cell textStyle={{fontSize:23,fontWeight:'bold'}}>{el.orgName}</DataTable.Cell>}
              {user.orgEmail!==null && <DataTable.Cell>{el.userEmail.slice(0,el.userEmail.indexOf('@'))}</DataTable.Cell>}
            </DataTable.Row>
          )
        })}
      </DataTable>
    </ScrollView>
  )
}

export default Chat


const styles=StyleSheet.create({
  row:{
    height:70,
    marginBottom:5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    marginRight:5,
    marginLeft:5,
    marginTop:4,
  }
})