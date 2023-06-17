import { io } from 'socket.io-client';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView ,StyleSheet ,Button,KeyboardAvoidingView} from 'react-native';
import ADDRESS_IP from '../env';
import { auth } from '../fireBaseConfig';
import { AuthContext } from './Context';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';
const socket = io(`http://${ADDRESS_IP}:4001`, {
  transports: ['websocket'],
});

const RoomChat = (props) => {
  const room = props.route.params.leftRoom.conversationId;
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [isSender, setSender] = useState('');

  useEffect(() => {
    if (user.email !== null) {
      setSender(user.email);
    }
    if (user.orgEmail !== null) {
      setSender(props.route.params.leftRoom.orgName);
    }
  }, [user, props.route.params.leftRoom]);

  const sendMessage = async (message) => {
   if(message[0].text!==''){
    await axios.post(`http://${ADDRESS_IP}:3001/message`, {
      sender: user.email !== null ? user.email : props.route.params.leftRoom.orgName,
      content: message[0].text,
      conversationId: room,
    }).catch(e=>console.log(e));
     socket.emit('send', { sender: user.email !== null ? user.email : props.route.params.leftRoom.orgName, content: message[0].text, conversationId: room });
    setCount(count + 1);
   }
  };

  const retrieveMessage = async () => {
    const chat = await axios.get(`http://${ADDRESS_IP}:3001/message/${room}`).catch(e=>console.log(e));
    if(chat.data.length>0){
      const all=chat.data.map(el=>{
        return {
          _id:el.messageId,
          createdAt:el.createdAt,
          text:el.content,
          user:{
            _id:el.sender,
            name:el.sender
          }
        }
      })
      setConversation(all.reverse());
    }
  };
  const handleReceiveMessage = (data) => {
    console.log(data); 
  };
  useEffect(() => {
    socket.emit('join', room);
  }, [room]);

  useEffect(() => {
    retrieveMessage();
    socket.on('receive',handleReceiveMessage);
  }, [socket, count]);

  return (
    <GiftedChat
            messages={conversation}
            onSend={messages => sendMessage(messages)}
            user={{
              _id: auth?.currentUser?.email
          }}
          alwaysShowSend={true}
          renderAvatar={null}
          renderBubble={props => {
            const isCurrentUser = props.currentMessage.user._id === isSender
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                 
                  left: {
                    backgroundColor: isCurrentUser ? '#0084ff' : '#e5e5e5',
                    alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                    right: isCurrentUser ? -52 :0,
                    maxWidth:"70%",
                    justifyContent:'space-between'
                  },
                }}
              />
            );
          }}
        />
  );
};

export default RoomChat;

const styles = StyleSheet.create({
  currentUserAvatar: {
    alignSelf: 'flex-end',
  },
  otherUserAvatar: {
    alignSelf: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    left: 0,
    right: 0, 
    bottom: 0
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  avatar:{
alignSelf:"center"
  }
});
