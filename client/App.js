import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AwenHeader from './component/AwenHeader';
import MainContainer from './navigation/MainContainer';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyStack from './Stacks/MyStack';
import AllCauses from './component/AllCauses';
import CauseDetail from './component/CauseDetail';
import UserLogin from './component/UserLogin';
import SignInOrganization from './component/organization/SignIn';
import UserSignup from './component/UserSignup';
import AuthOrganization from './component/organization/AuthOrganization';
import Profile from './component/organization/Profile';
import Modify from './component/organization/ModifyOrg';
import NavbarOrganization from './component/organization/NavbarOrganization';
import { AuthProvider, TrakkerProvider } from './component/Context';
import ProfileUser from './component/ProfileUser';

export default App = () => {
  const Stack = createNativeStackNavigator(); // Move Stack inside the component

  return (
    <AuthProvider>
      <TrakkerProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={MainContainer} options={{ headerTitle: () => <AwenHeader /> }} />
            <Stack.Screen name="CauseDetails" component={CauseDetail} options={{ headerTitle: () => <View /> }} />
            <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationSignUp" component={AuthOrganization} options={{ headerShown: false }} />
            <Stack.Screen name="organizationHome" component={NavbarOrganization} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationLogin" component={SignInOrganization} options={{ headerShown: false }} />
            <Stack.Screen name="ModifyOrganization" component={Modify} options={{ headerShown: false }} />
            <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="profileUser" component={ProfileUser} options={{ headerShown: false }} />
            <Stack.Screen name="UserSignin" component={UserLogin} options={{ headerShown: false }} />
            <Stack.Screen name="AllCauses" component={AllCauses} options={{ headerTitle: () => <View /> }} />
            <Stack.Screen name='MyStack' component={MyStack} options={{ headerTitle: () => <View /> }} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </TrakkerProvider>
    </AuthProvider>
  );
};
