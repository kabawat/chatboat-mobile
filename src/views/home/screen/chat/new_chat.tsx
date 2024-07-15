import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import useThemeColors from '@hooks/useThemeColors'
import Octicons from 'react-native-vector-icons/Octicons';
import mainStyle from '@views/home/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContactList from '@components/chat/contactList';
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
        about: "❤️💕😊👌",
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
        about: "Full Stack Developer",
        blocked: 'you',
    },
];

const NewChatScreen = ({ navigation }: any) => {
    const isDark = useColorScheme() == 'dark'
    const colors = useThemeColors()
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* header  */}
            <View style={{ ...mainStyle.header, ...mainStyle.shadow, backgroundColor: colors.dimBackground }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" color={colors.headingColor} size={30} />
                    </TouchableOpacity>
                    <Text style={{ ...mainStyle.heading, color: colors.dicsColor }}>Contact List</Text>
                </View>
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
                                    <ContactList {...chat} />
                                </TouchableOpacity>
                            )
                        })
                    }
                    {/*for create space  */}
                    <View style={{ height: 70 }}></View>
                </ScrollView>
            </View>
        </View>
    )
}

export default NewChatScreen

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