import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, useColorScheme } from 'react-native'
import React from 'react'
import useThemeColors from '@hooks/useThemeColors'
import Octicons from 'react-native-vector-icons/Octicons';
import mainStyle from '@views/home/style';
import Avatar from '@components/avatar';
import CallListItem from '@components/chat/callList';
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

const CallScreen = (props: any) => {
    const { navigation } = props.route
    const isDark = useColorScheme() == 'dark'
    const colors = useThemeColors()
    const newChatBtn = { ...styles.chat_action_group, ...styles.shadow, backgroundColor: colors.dimBackground }
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* header  */}
            <View style={{ ...mainStyle.header, ...mainStyle.shadow, backgroundColor: colors.dimBackground }}>
                <TouchableOpacity>
                    <Avatar
                        imageUrl={""}
                        title={"Mukesh singh"}
                        size={40}
                        backgroundColor={''}
                    />
                </TouchableOpacity>
                <Text style={{ ...mainStyle.heading, color: colors.dicsColor }}>Call</Text>
                <TouchableOpacity style={mainStyle.rightIcon}>
                    <Octicons name='search' size={24} style={{ color: colors.dicsColor }} />
                </TouchableOpacity>
            </View>

            {/* contact list  */}
            <View style={mainStyle.container}>
                <ScrollView style={styles.chatContainer}>
                    {
                        chatData?.map((chat: any, key: number) => {
                            return (
                                <TouchableOpacity key={key}>
                                    <CallListItem {...chat} />
                                </TouchableOpacity>
                            )
                        })
                    }
                    {/*for create space  */}
                    <View style={{ height: 70 }}></View>
                </ScrollView>

                <TouchableOpacity style={newChatBtn} onPress={() => { navigation.navigate("Contact") }}>
                    <Image source={isDark ? require('@assets/icons/chat-light.png') : require('@assets/icons/chat-dark.png')} style={{ ...styles.chatIcon }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default CallScreen

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
    },
    chat_action_group: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    chatIcon: {
        width: 30,
        height: 30
    }
})