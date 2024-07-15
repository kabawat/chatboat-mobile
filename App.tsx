import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { NavigationContainer } from '@react-navigation/native'
import Intro from '@views/intro'
import Landing from '@views/landing'
import Registration from '@views/auth/Registration'
import Login from '@views/auth/Login'
import Home from '@views/home'
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Loading' component={Intro} options={{ headerShown: false }} />
          <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />

          <Stack.Screen name='Registration' component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>
  )
}

export default App