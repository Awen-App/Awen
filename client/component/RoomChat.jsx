import io from 'socket.io-client';
import React from 'react'
import { View,Text } from 'react-native';
import ADDRESS_IP from '../env';
const socket=io.connect(`http://${ADDRESS_IP}:3001`)
const RoomChat = () => {
  return (
    <View>
      <Text>chat</Text>
    </View>
  )
}

export default RoomChat;
