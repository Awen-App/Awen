import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen';
import UserLogin from './component/UserLogin';
import AuthOrganization from './component/AuthOrganization';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        /> */}
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="Organization" component={AuthOrganization} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
