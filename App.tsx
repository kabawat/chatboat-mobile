import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { NavigationContainer } from '@react-navigation/native'
import Intro from '@views/intro'
import Landing from '@views/landing'
import Registration from '@views/auth/Registration'
import Login from '@views/auth/Login'
import Home from '@views/home'
import ChatHome from '@views/chat'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ContactScreen from '@views/contact'
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    // <GestureHandlerRootView>
    <AlertNotificationRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Loading' component={Intro} options={{ headerShown: false }} />
          <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Chat' component={ChatHome} options={{ headerShown: false }} />
          <Stack.Screen name='Contact' component={ContactScreen} options={{ headerShown: false }} />

          <Stack.Screen name='Registration' component={Registration} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlertNotificationRoot>
    // </GestureHandlerRootView>
  )
}

export default App