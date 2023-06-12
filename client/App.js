import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AwenHeader from './component/AwenHeader';
import MainContainer from './navigation/MainContainer';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyStack from './Stacks/MyStack';
import AllCauses from './component/AllCauses';
import CauseDetail from './component/CauseDetail';
import UserLogin from './component/UserLogin';
import SignInOrganization from './component/organization/SignIn';
import UserSignup from './component/UserSignup';
import AuthOrganization from './component/organization/AuthOrganization';
const Stack=createNativeStackNavigator();
import { AuthProvider } from './component/Context';
import ProfileUser from './component/ProfileUser';
export default App=()=>{
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                <Stack.Screen name="Tabs" component={MainContainer} options={{ headerTitle: () => <AwenHeader /> }}/>
                <Stack.Screen name= "CauseDetails" component={CauseDetail} options={{ headerTitle: () => <View /> }} />
                <Stack.Screen name="UserSignup" component={UserSignup} options={{ headerShown: false }}/>
                <Stack.Screen name="OrganizationSignUp" component={AuthOrganization} options={{ headerShown: false }}/>
                <Stack.Screen name="profile" component={ProfileUser} options={{ headerShown: false }}/>
                <Stack.Screen name="OrganizationLogin" component={SignInOrganization} options={{ headerShown: false }}/>
                <Stack.Screen name="UserSignin" component={UserLogin} options={{ headerShown: false }}/>
                <Stack.Screen name= "AllCauses" component={AllCauses} options={{ headerTitle: () => <View /> }}/>
                <Stack.Screen name='MyStack' component={MyStack} options={{ headerTitle: () => <View />}}/>
                </Stack.Navigator>
                <StatusBar style="auto"/>
            </NavigationContainer>
        </AuthProvider>
    )
}
