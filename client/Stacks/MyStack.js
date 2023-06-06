import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserLogin from '../component/UserLogin'
import UserSignup from '../component/UserSignup';
import AuthOrganization from '../component/AuthOrganization';
import GetStarted from '../navigation/screens/GetStarted';
const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen name='getStarted' component={GetStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }}/>
        <Stack.Screen name="UserSignin" component={UserLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="Organization" component={AuthOrganization} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
};

export default MyStack;
