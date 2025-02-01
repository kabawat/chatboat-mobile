import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import ContactScreen from '@views/contact'
import Registration from '@views/auth/Registration'
import ChatHome from '@views/chat'
import Landing from '@views/landing'
import Login from '@views/auth/Login'
import Intro from '@views/intro'
import Home from '@views/home'
import { windowHeight, windowWidth } from '@utils/comman'
const QuryBoat = () => {
  const Stack = createNativeStackNavigator();
  console.log(windowHeight, windowWidth)
  return (
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
  )
}

export default QuryBoat