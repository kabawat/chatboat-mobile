import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Intro from '@views/intro'
import Landing from '@views/landing'
import Home from '@views/home'
import Registration from '@views/Registration'
import Login from '@views/Login'
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Loading' component={Intro} options={{ headerShown: false }} />
        <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />

        <Stack.Screen name='Registration' component={Registration} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App