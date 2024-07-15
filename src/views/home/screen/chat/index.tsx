import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from './chat'
import NewChatScreen from './new_chat'
const ChatStack = createNativeStackNavigator()
const Chat = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
            <ChatStack.Screen name="NewChatScreen" component={NewChatScreen} options={{ headerShown: false }} />
        </ChatStack.Navigator>
    )
}

export default Chat