import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserLogin from '../component/UserLogin'
import UserSignup from '../component/UserSignup';
import AuthOrganization from '../component/organization/AuthOrganization';
import GetStarted from '../navigation/screens/GetStarted';
import SignInOrganization from '../component/organization/SignIn';
import AllCauses from '../component/AllCauses';
import CauseByCategory from '../component/CauseByCategory';
import NavbarOrganization from '../component/organization/NavbarOrganization';
import Modify from '../component/organization/ModifyOrg';
import TermsAndConditions from '../component/TermsAndConditions';
import CauseDetail from '../component/CauseDetail';
import GetStart from '../component/GetStart';
import Profile from '../component/organization/Profile';


const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
  
      <Stack.Navigator>
        {/* Tarek routs */}
        <Stack.Screen name='getStarted' component={GetStarted} options={{ headerShown: false }}/>
        <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }}/>
        <Stack.Screen name="UserSignin" component={UserLogin} options={{ headerShown: false }}/>
        {/* Amrou routs */}
        <Stack.Screen name="OrganizationSignUp" component={AuthOrganization} options={{ headerShown: false }}/>
        <Stack.Screen name="OrganizationLogin" component={SignInOrganization} options={{ headerShown: false }}/>
        <Stack.Screen name= "organizationHome" component={NavbarOrganization} options={{ headerShown:false}}/>
        <Stack.Screen name= "ModifyOrganization" component={Modify} options={{ headerShown:false}}/>
        <Stack.Screen name= "profile" component={Profile} options={{ headerShown:false}}/>
        {/* Sarhane routs */}
        <Stack.Screen name= "AllCauses" component={AllCauses} options={{ headerShown:false}}/>
        <Stack.Screen name= "CauseByCategory" component={CauseByCategory} options={{ headerShown:false}}/>
        {/* Aziz routs */}
        <Stack.Screen name= "CauseDetails" component={CauseDetail} options={{ headerShown:false}}/>
        <Stack.Screen name= "GetStart" component={GetStart} options={{ headerShown:false}}/>
      </Stack.Navigator>
  );
};

export default MyStack;
