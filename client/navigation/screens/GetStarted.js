import * as React from 'react';
import { View,Text } from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default GetStarted=()=>{
    let navigation=useNavigation();
    return (
    <View>
        <Text onPress={()=>navigation.navigate('UserSignup')}> Signup as a user</Text>
        <Text onPress={()=>navigation.navigate('UserSignin')}> signin as a user</Text>
        <Text onPress={()=>navigation.navigate('Organization')}> signin as an Organization</Text>
    </View>)
}