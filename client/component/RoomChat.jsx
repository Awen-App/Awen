import { io } from 'socket.io-client';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useContext, useEffect, useState } from 'react';
import ADDRESS_IP from '../env';
import { auth } from '../fireBaseConfig';
import {StyleSheet} from 'react-native';
import { AuthContext } from './Context';
import { GiftedChat ,Bubble ,InputToolbar,Actions} from 'react-native-gifted-chat';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
const socket = io(`http://${ADDRESS_IP}:4001`, {
  transports: ['websocket'],
});

Geolocation.setRNConfiguration({ skipPermissionRequests: false, authorizationLevel: 'whenInUse' });


const RoomChat = (props) => {
  console.log(props)
  const room = props.route.params.leftRoom.conversationId;
  console.log(props.route.params.leftRoom)
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useContext(AuthContext);
  const [count, setCount] = useState(0);
  const [isSender, setSender] = useState('');

  useEffect(() => {
    if (user.email !== null) {
      setSender(user.email);
      props.navigation.setOptions({headerTitle:props.route.params.leftRoom.orgName})
    }
    if (user.orgEmail !== null) {
      setSender(props.route.params.leftRoom.orgName);
      props.navigation.setOptions({headerTitle:props.route.params.leftRoom.userEmail.slice(0,props.route.params.leftRoom.userEmail.indexOf('@'))})
    }
  }, [user, props.route.params.leftRoom]);

  const sendMessage = async (messages) => {
    const message = messages[0];
  
    if (message.text !== '') {
      let content = message.text;
  
      if (message.location) {
        const { latitude, longitude } = message.location;
        content = JSON.stringify({ type: 'location', latitude, longitude });
      }
  
      await axios.post(`http://${ADDRESS_IP}:3001/message`, {
        sender: user.email !== null ? user.email : props.route.params.leftRoom.orgName,
        content,
        conversationId: room,
      }).catch(e=>console.log(e));
  
      if (message.location) {
        socket.emit('send', {
          sender: user.email !== null ? user.email : props.route.params.leftRoom.orgName,
          content,
          conversationId: room,
          location: message.location,
        });
      } else {
        socket.emit('send', {
          sender: user.email !== null ? user.email : props.route.params.leftRoom.orgName,
          content,
          conversationId: room,
        });
      }
  
      setCount(prev => prev + 1);
    }
  };
  
  
  const retrieveMessage = async () => {
    const chat = await axios.get(`http://${ADDRESS_IP}:3001/message/${room}`).catch(e=>console.log(e));
    if (chat.data.length > 0) {
      const all = chat.data.map(el => {
        let message = {
          _id: el.messageId,
          createdAt: el.createdAt,
          text: el.content,
          user: {
            _id: el.sender,
            name: el.sender,
          },
        };
  
        try {
          const content = JSON.parse(el.content);
          if (content.type === 'location') {
            message = {
              ...message,
              text: `https://www.google.com/maps/search/?api=1&query=${content.latitude},${content.longitude}&query_place_id=Custom+Location`,
              location: {
                latitude: content.latitude,
                longitude: content.longitude,
              },
            };
          }
        } catch (error) {
          console.log(error);
        }
  
        return message;
      });
  
      setConversation(all.reverse());
    }
  };
  
  const handleReceiveMessage = (data) => {
    console.log(data);
    setCount(count+1) 
  };
  useEffect(() => {
    if(room){
      socket.emit('join', room);
    }
  }, [room]);


  const handleChooseLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
  
        const { latitude, longitude } = coords;
  
        const locationMessage = {
          _id: Math.round(Math.random() * 1000000).toString(),
          createdAt: new Date(),
          location: {
            latitude,
            longitude,
          },
          user: {
            _id: auth?.currentUser?.email,
          },
        };
  
        sendMessage([locationMessage]);
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  }; 
  useEffect(() => {
    retrieveMessage();
    socket.on('receive',handleReceiveMessage);
    
  }, [socket, count]);
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbarContainer}
      primary
      Style={styles.inputToolbarPrimary}
      textInputStyle={styles.inputToolbarTextInput}
    />
  );
  return (
    <GiftedChat
  renderInputToolbar={renderInputToolbar}
  messages={conversation}
  onSend={sendMessage}
  user={{
    _id: auth?.currentUser?.email,
  }}
  alwaysShowSend={true}
  renderAvatar={null}
  renderAvatarOnTop={true}
  renderBubble={(props) => {
    const isCurrentUser = props.currentMessage.user._id === isSender;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: isCurrentUser ? '#0084ff' : '#e5e5e5',
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
            right: isCurrentUser ? -52 : 0,
            maxWidth: '70%',
            justifyContent: 'space-between',
            marginBottom: 4,
          },
        }}
      />
    );
  }}
  renderActions={(props) => (
    <Actions
      {...props}
      options={{
        'Send Location': handleChooseLocation,
        Cancel: () => {},
      }}
      icon={() => (
        <Icon name="map-marker" size={28} color="#0084ff" />
      )}
    />
  )}
/>
  );
};

export default RoomChat;

const styles = StyleSheet.create({
  inputToolbarContainer: {
    marginTop:2,
    borderTopWidth: 0,
    backgroundColor: '#e6e6e6',
    paddingHorizontal: 8,
    paddingVertical: 5,
    // marginBottom: 5,
  },
  inputToolbarPrimary: {
    borderRadius: 20,
  },
  inputToolbarTextInput: {
    fontSize: 16,
    lineHeight: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    flex: 1,
  },
});

