import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AwenHeader from './component/AwenHeader';
import MainContainer from './navigation/MainContainer';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyStack from './Stacks/MyStack';
const Stack=createNativeStackNavigator();
export default App=()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Tabs" component={MainContainer} options={{ headerTitle: () => <AwenHeader /> }}/>
            <Stack.Screen name='MyStack' component={MyStack} options={{ headerTitle: () => <View /> }}/>
            </Stack.Navigator>
            <StatusBar style="auto"/>
        </NavigationContainer>
    )
}
