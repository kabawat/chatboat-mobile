import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import useThemeColors from '@hooks/useThemeColors'
import Octicons from 'react-native-vector-icons/Octicons';
import mainStyle from '@views/home/style';
import Avatar from '@components/avatar';
import ChatListItem from '@components/chat/chatList';
const chatData = [
    {
        id: '1',
        contactName: 'John Doe',
        avatarUrl: '',
        lastMessage: 'Hey there!',
        status: 'Online',
        lastSeen: '',
        typing: false,
        unreadMessages: 2,
        backgroundColor: '#ff6347',
        about: "",
        blocked: false,
    },
    {
        id: '2',
        contactName: 'Jane Smith',
        avatarUrl: '',
        lastMessage: '',
        status: '',
        lastSeen: '',
        typing: false,
        unreadMessages: 0,
        backgroundColor: '#1e90ff',
        about: "",
        blocked: 'you',
    },
    {
        id: '3',
        contactName: 'Alice Johnson',
        avatarUrl: '',
        lastMessage: 'hello kabawat',
        status: 'typing',
        lastSeen: '23:58 AM',
        typing: true,
        unreadMessages: 1,
        backgroundColor: '#1e60ff',
        about: "",
        blocked: '',
    },
    {
        id: '4',
        contactName: 'Michael Brown',
        avatarUrl: '',
        lastMessage: '',
        status: 'Busy',
        lastSeen: '10:00 AM',
        typing: false,
        unreadMessages: 3,
        backgroundColor: '#4682b4',
        about: "",
        blocked: false,
    },
    {
        id: '5',
        contactName: 'Sarah Davis',
        avatarUrl: '',
        lastMessage: 'Are you coming?',
        status: 'Online',
        lastSeen: '',
        typing: false,
        unreadMessages: 0,
        backgroundColor: '#32cd32',
        about: "",
        blocked: 'you',
    },
    {
        id: '6',
        contactName: 'Chris Martin',
        avatarUrl: '',
        lastMessage: '',
        status: 'typing',
        lastSeen: '',
        typing: true,
        unreadMessages: 9,
        backgroundColor: '#ff4500',
        about: "I am Using Query boat",
        blocked: '',
    },
    {
        id: '7',
        contactName: 'Emma Wilson',
        avatarUrl: '',
        lastMessage: 'Let’s meet tomorrow.',
        status: 'Offline',
        lastSeen: 'Yesterday',
        typing: false,
        unreadMessages: 5,
        backgroundColor: '#9370db',
        about: "",
        blocked: false,
    },
    {
        id: '1',
        contactName: 'John Doe',
        avatarUrl: '',
        lastMessage: 'Hey there!',
        status: 'Online',
        lastSeen: '',
        typing: false,
        unreadMessages: 2,
        backgroundColor: '#ff6347',
        about: "",
        blocked: false,
    },
    {
        id: '2',
        contactName: 'Jane Smith',
        avatarUrl: '',
        lastMessage: '',
        status: '',
        lastSeen: '',
        typing: false,
        unreadMessages: 0,
        backgroundColor: '#1e90ff',
        about: "",
        blocked: 'you',
    },
    {
        id: '3',
        contactName: 'Alice Johnson',
        avatarUrl: '',
        lastMessage: 'hello kabawat',
        status: 'typing',
        lastSeen: '23:58 AM',
        typing: true,
        unreadMessages: 1,
        backgroundColor: '#1e60ff',
        about: "",
        blocked: '',
    },
    {
        id: '4',
        contactName: 'Michael Brown',
        avatarUrl: '',
        lastMessage: '',
        status: 'Busy',
        lastSeen: '10:00 AM',
        typing: false,
        unreadMessages: 3,
        backgroundColor: '#4682b4',
        about: "",
        blocked: false,
    },
    {
        id: '5',
        contactName: 'Sarah Davis',
        avatarUrl: '',
        lastMessage: 'Are you coming?',
        status: 'Online',
        lastSeen: '',
        typing: false,
        unreadMessages: 0,
        backgroundColor: '#32cd32',
        about: "",
        blocked: 'you',
    },
    {
        id: '6',
        contactName: 'Chris Martin',
        avatarUrl: '',
        lastMessage: '',
        status: 'typing',
        lastSeen: '',
        typing: true,
        unreadMessages: 9,
        backgroundColor: '#ff4500',
        about: "I am Using Query boat",
        blocked: '',
    },
    {
        id: '7',
        contactName: 'Emma Wilson',
        avatarUrl: '',
        lastMessage: 'Let’s meet tomorrow.',
        status: 'Offline',
        lastSeen: 'Yesterday',
        typing: false,
        unreadMessages: 5,
        backgroundColor: '#9370db',
        about: "",
        blocked: false,
    },
    // Add more chat items here
];

const Chat = () => {
    const colors = useThemeColors()
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* header  */}
            <View style={{ ...mainStyle.header, ...mainStyle.shadow, backgroundColor: colors.dimBackground }}>
                <TouchableOpacity style={mainStyle.rightIcon}>
                    <Octicons name='search' size={24} style={{ color: colors.dicsColor }} />
                </TouchableOpacity>
                <Text style={{ ...mainStyle.heading, color: colors.dicsColor }}>Chat</Text>
                <TouchableOpacity>
                    <Avatar
                        imageUrl={""}
                        title={"Mukesh singh"}
                        size={40}
                        backgroundColor={''}
                    />
                </TouchableOpacity>
            </View>

            {/* contact list  */}
            <View style={mainStyle.container}>
                <ScrollView style={styles.chatContainer}>
                    {
                        chatData?.map((chat: any, key: number) => {
                            return (
                                <TouchableOpacity key={key}>
                                    <ChatListItem {...chat} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>

        </View>
    )
}

export default Chat

const styles = StyleSheet.create({
    chatContainer: {
        paddingHorizontal: 5
    },
    chatContact: {
        height: 60,
        backgroundColor: '#ccc',
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    }
})