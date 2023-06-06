import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserLogin from '../component/UserLogin'
import UserSignup from '../component/UserSignup';
import AuthOrganization from '../component/AuthOrganization';
import GetStarted from '../navigation/screens/GetStarted';
import SignInOrganization from '../component/SignIn';
import AllCauses from '../component/AllCauses';
import CauseByCategory from '../component/CauseByCategory';
const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen name='getStarted' component={GetStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }}/>
        <Stack.Screen name="UserSignin" component={UserLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="OrganizationSignUp" component={AuthOrganization} options={{ headerShown: false }}/>
        <Stack.Screen name="OrganizationLogin" component={SignInOrganization} options={{ headerShown: false }}/>
        <Stack.Screen name= "AllCauses" component={AllCauses} options={{ headerShown:false}}/>
        <Stack.Screen name= "CauseByCategory" component={CauseByCategory} options={{ headerShown:false}}/>
      </Stack.Navigator>
  );
};

export default MyStack;
