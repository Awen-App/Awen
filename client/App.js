import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen';
import UserLogin from './component/UserLogin';
import AuthOrganization from './component/AuthOrganization';
import Navbar from './component/Navbar';
import { StyleSheet, Text, View, TextInput,Button } from 'react-native';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <View style={styles.container}>
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"component={HomeScreen}/> 
         <Stack.Screen name="UserLogin" component={UserLogin} /> 
        <Stack.Screen name="Organization" component={AuthOrganization} />


      </Stack.Navigator>
    </NavigationContainer>
    <Navbar/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
