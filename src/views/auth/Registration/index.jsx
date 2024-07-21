import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
import StepOne from './step_01'
import VerifyOTP from './verify_otp'
import StepTwo from './step_02'
const Registration = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SetpOne" component={StepOne} options={{ headerShown: false }} />
            <Stack.Screen name="VerifyOTP" component={VerifyOTP} options={{ headerShown: false }} />
            <Stack.Screen name="StepTwo" component={StepTwo} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Registration