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
import CauseByCategory from './component/CauseByCategory';
import { AuthProvider, TrakkerProvider } from './component/Context';
import ProfileUser from './component/ProfileUser';
import RoomChat from './component/RoomChat';
import LatestCauses from './component/LatestCauses';
import { StripeProvider } from '@stripe/stripe-react-native';
import TermsAndConditions from './component/TermsAndConditions';
import CauseOrg from './component/organization/CauseOrg';
import OrgHeader from './component/organization/OrgHeader';
import ProfileHeader from './component/organization/ProfileHeader';
import SendEmail from './component/organization/SendEmail';
import UserHeader from './component/UserHeader';
import HomeOrganization from './component/organization/HomeOrganization';
export default App = () => {
  const Stack = createNativeStackNavigator(); // Move Stack inside the component

  return (
    <StripeProvider
    publishableKey="pk_test_51NIClNIRnnaHIqBUs32n1r2zObkNYE80PNdQxvxahpIdnjoKtsXlcwUdYnWhsse6l864XYCpJWv7kJdjD4iECFMA00vdbxNEkw"// required for Apple Pay
  >
    <AuthProvider>
      <TrakkerProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={MainContainer} options={{ headerTitle: () => <AwenHeader /> }} />
            <Stack.Screen name="CauseDetails" component={CauseDetail} options={{ headerTitle: () => <View /> }} />
            <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }} />
            <Stack.Screen name="OrganizationSignUp" component={AuthOrganization} options={{ headerShown: false }} />
            <Stack.Screen name="organizationHome" component={NavbarOrganization} options={{ headerTitle: () => <OrgHeader /> }}/>
            <Stack.Screen name="OrganizationLogin" component={SignInOrganization} options={{ headerShown: false }} />
            <Stack.Screen name="ModifyOrganization" component={Modify} options={{ headerShown: false }} />
            <Stack.Screen name="profile" component={Profile} options={{ headerTitle: () => <ProfileHeader /> }} />
            <Stack.Screen name="profileUser" component={ProfileUser} options={{ headerTitle: () => <UserHeader /> }} />
            <Stack.Screen name="UserSignin" component={UserLogin} options={{ headerShown: false }} />
            <Stack.Screen name="AllCauses" component={AllCauses} options={{ headerTitle: () => <View /> }} />
            <Stack.Screen name='MyStack' component={MyStack} options={{ headerTitle: () => <View /> }} />
            <Stack.Screen name= "CauseByCategory" component={CauseByCategory} options={{ headerTitle: () => <View /> }}/>
            <Stack.Screen name= "LatestCauses" component={LatestCauses} options={{ headerTitle: () => <View /> }}/>
            <Stack.Screen name= "Terms" component={TermsAndConditions} options={{ headerShown:false}}/>
            <Stack.Screen name= "CauseOrg" component={CauseOrg} options={{ headerTitle: () => <OrgHeader /> }}/>
            <Stack.Screen name= "room" component={RoomChat} options={{ headerTitle: () => <View /> }}/>
            <Stack.Screen name= "SendEmail" component={SendEmail} options={{ headerTitle: () => <OrgHeader /> }}/>
            <Stack.Screen name= "OrgHome" component={HomeOrganization} options={{ headerTitle: () => <OrgHeader /> }}/>
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </TrakkerProvider>
    </AuthProvider>
  </StripeProvider>
   
  );
};
