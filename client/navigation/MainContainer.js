import * as React from "react";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab=createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingScreen";


const homeName='Home';
const settingName='Setting';
export default MainContainer=()=>{
    return (
       
            
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route})=>({
                    tabBarIcon:({focused,color,size})=>{
                        let iconName;
                        let routeName=route.name;
                        if(routeName===homeName){
                            iconName=focused ? 'home' : 'home-outline'
                        }
                        else if(routeName===settingName){
                            iconName=focused ? 'settings' : 'settings-outline'
                        }
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}>
                <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/>
                <Tab.Screen name={settingName} component={SettingScreen} options={{ headerShown: false }}/>
            </Tab.Navigator>
        
    )
}