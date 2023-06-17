import React, { useContext, useEffect,useState } from 'react'
import { View ,Text,ScrollView} from 'react-native';
import axios from 'axios'
import { AuthContext } from '../../component/Context';
import { DataTable } from 'react-native-paper';
import ADDRESS_IP from '../../env';
import { useNavigation } from '@react-navigation/native';
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
        <DataTable.Header>
          <DataTable.Title>Your Conversations</DataTable.Title>
        </DataTable.Header>
        {conversations.map((el,i)=>{
          return(
            <DataTable.Row key={i} onPress={()=>navigation.navigate('room',{leftRoom:el})}>
              {user.email!==null && <DataTable.Cell>{el.orgName}</DataTable.Cell>}
              {user.orgEmail!==null && <DataTable.Cell>{el.userEmail}</DataTable.Cell>}
            </DataTable.Row>
          )
        })}
      </DataTable>
    </ScrollView>
  )
}

export default Chat
