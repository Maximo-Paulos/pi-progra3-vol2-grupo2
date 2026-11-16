import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { auth } from './src/firebase/config';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import NavegacionTab from './src/screens/NavegacionTab';

const Stack = createNativeStackNavigator();

function App() {
return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="NavegacionTab"
            component={NavegacionTab}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

