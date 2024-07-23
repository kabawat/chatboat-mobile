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
import { get_profile } from '@redux_store/slice/profile'
import { useSocket } from './App'
const QuryBoat = () => {
  const socket = useSocket()
  const dispatch = useDispatch()
  const Stack = createNativeStackNavigator();
  const profile = useSelector(state => state.profile)
  useEffect(() => {
    if (!profile?.status && !profile.loading) {
      dispatch(get_profile())
    }
    if (profile.status && !profile.loading && socket) {
      socket.emit('login', {
        username: profile?.data?.username,
        _id: profile?.data?._id
      })
    }
  }, [profile])
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