import * as React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab=createBottomTabNavigator();
import HomeOrganization from "./HomeOrganization";
import Add from './AddCause'
import Chat from "../../navigation/screens/Chat";
import Profile from "./Profile";
import ModifyOrg from "./ModifyOrg";
import SettingScreen from "../../navigation/screens/SettingScreen";
import ProfileHeader from "./ProfileHeader";
import Help from "../../navigation/screens/Help";
import WelcomeOrganization from "./WelcomeOrganization";


const homeName='Home';
const help='help';
const chat='chatbox';
const settingName='Settings';
const add='add';
// const newHome="newhome"

export default MainContainer2=()=>{
    return (  
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route})=>({
                    tabBarActiveTintColor:'#ada6a6',
                    tabBarInactiveTintColor:'white',
                    tabBarShowLabel:false,
                    tabBarHideOnKeyboard:true,
                    tabBarStyle:{
                        height:60,
                        backgroundColor:'#33A09A',
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15
                    },
                    tabBarIcon:({focused,color,size})=>{
                        let iconName;
                        let routeName=route.name;
                        if(routeName===homeName){
                            iconName=focused ? 'home' : 'home-outline'
                        }
                        else if(routeName===help){
                            iconName = focused ? 'help' : 'help-circle-outline';
                        }
                        else if(routeName===add){
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        }
                        else if(routeName===chat){
                            iconName=focused ? 'chatbox' : 'chatbox-ellipses-outline'
                        }
                    
                        else if(routeName===settingName){
                            iconName=focused ? 'settings' : 'settings-outline'
                        }
                        // else if(routeName===newHome){
                        //     iconName=focused ? 'settings' : 'settings-outline'
                        // }
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
                >

                <Tab.Screen name={homeName} component={WelcomeOrganization} options={{ headerShown: false }}/>
                <Tab.Screen name={chat} component={Chat} options={{ headerShown: false }}/>
                <Tab.Screen name={add} component={Add} options={{ headerShown: false }}/>
                <Tab.Screen name={help} component={Help} options={{ headerShown: false }}/>
                {/* <Tab.Screen name={newHome} component={WelcomeOrganization} options={{ headerShown: false }}/> */}

                {/* <Tab.Screen name={settingName} component={SettingScreen} options={{ headerShown: false }}/> */}
                
            </Tab.Navigator>
        
    )
}