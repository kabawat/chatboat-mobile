import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import useThemeColors from '@hooks/useThemeColors'
import Octicons from 'react-native-vector-icons/Octicons';
import mainStyle from '@views/home/style';
import Avatar from '@components/avatar';
import ChatListItem from '@components/chat/chatList';
import NoChatYet from '@components/contact/no_contact';
import { useDispatch, useSelector } from 'react-redux';
import { block_user_contact, get_contact_list, udpate_contact_lastchat, udpate_contact_status, update_contact_unread_message } from '@redux_store/slice/chat';
import { useSocket } from '../../../../../App';
import { handalCurrentUser, reset_current_user } from '@redux_store/slice/user';
import { get_chat_message, get_chat_unread_message } from '@redux_store/slice/message';
import { getStartMessage } from '@redux_store/slice/static';

const ChatScreen = (props) => {
    const { navigation } = props.route
    const isDark = useColorScheme() == 'dark'
    const colors = useThemeColors()
    const { socket } = useSocket()
    // universal variable 
    const current_user = useSelector(state => state.current_user)
    const contacts = useSelector(state => state.contact)
    const profile = useSelector(state => state.profile)
    const [onlineUser, setOnlineUser] = useState(null)
    const [isContext, setIsContext] = useState(false)
    const [myContact, setMyContact] = useState([])
    const [getStart, setGetStart] = useState(false)

    const dispatch = useDispatch()
    // const mainRef = useRef(null);

    // select user from list 
    const handalSelectChat = async (data) => {
        // get read message 
        await dispatch(get_chat_message({ chat_id: data?.chat_id, page: 1, clean: true })).then(item => {
            if (!item.payload?.data?.totalMessages) {
                dispatch(getStartMessage())
            }
        })

        // get unread message 
        await dispatch(get_chat_unread_message({ chat_id: data?.chat_id })).then(item => {
            if (!item.payload?.data) {
                dispatch(getStartMessage())
            }
        })
        dispatch(update_contact_unread_message(data))
        // await _mark_message_as_read(payload) // make read message
        dispatch(reset_current_user())
        setTimeout(async () => {
            await dispatch(handalCurrentUser(data)) // set current user 
            navigation.navigate('Chat')
            // _scrollToEnd(mainRef)// scroll bottom
        })
    }

    useEffect(() => {
        // get all contact list 
        setMyContact(contacts?.data)
        if (!contacts?.status && !contacts?.loading && !contacts?.error) {
            dispatch(get_contact_list())
        }
    }, [contacts?.status])

    // received message handal 
    useEffect(() => {
        // user come to online 
        const logedinHandler = (data) => {
            if (current_user?._id == data.data?.user_id) {
                let currentUser = {
                    ...current_user,
                    isOnline: data.data.isOnline,
                    lastSeen: data.data.lastSeen
                }
                dispatch(update_current_user(currentUser))
            } else {
                contacts?.data.map((contact) => {
                    if (contact._id == data.data?.user_id) {
                        setOnlineUser(data?.message)
                        setTimeout(() => {
                            setOnlineUser("")
                        }, 5000)
                    }
                })
            }
            dispatch(udpate_contact_status(data.data))
        };

        // user go to offline 
        const offlineHandler = (data) => {
            // update contact list 
            dispatch(udpate_contact_status(data))
            // update current chat user 
            if (current_user?._id == data?.user_id) {
                let currentUser = {
                    ...current_user,
                    isOnline: data?.isOnline,
                    lastSeen: data?.lastSeen
                }
                dispatch(update_current_user(currentUser))
            }
        };

        // receive message handal 
        const handalReceivedMessage = async (data) => {
            const isExits = contacts?.data?.some(item => item?.chat_id === data?.chat_id)
            if (!isExits) {
                dispatch(get_contact_list())
            }

            if (`${current_user?.chat_id}` == `${data?.chat_id}`) {
                const payload = {
                    chat_id: data?.chat_id,
                    userID: profile?.data?._id,
                    only_read: true
                }
                // make read message 
                await _mark_message_as_read(payload).then(() => {
                    dispatch(add_new_message(data))
                })

                // _scrollToEndSmoothly(mainRef)
            }
            await dispatch(udpate_contact_lastchat(data))

        }

        // block user 
        const blockUserHandler = (data) => {
            dispatch(block_user_contact(data))
            // update current user 
            if (current_user.chat_id == data?.chat_id) {
                let currentUser = {}
                if (data.is_block) {
                    currentUser = {
                        ...current_user,
                        blocked_by: [...current_user.blocked_by, data.blocked_by]
                    }
                } else {
                    const blocked_by = current_user.blocked_by.filter(item => `${item}` != `${data.blocked_by}`)
                    currentUser = {
                        ...current_user,
                        blocked_by: blocked_by
                    }
                }
                currentUser = {
                    ...currentUser,
                    is_block: currentUser?.blocked_by?.length ? true : false,
                }
                dispatch(update_current_user(currentUser))
            }
        }

        // sender typing 
        const handleUserTyping = (data) => {
            // update contact list 
            dispatch(udpate_contact_status({ ...data, Typing: true }))
            // update cuurent chat 
            if (current_user?._id == data?.sender) {
                let currentUser = {
                    ...current_user,
                    isOnline: data?.isTyping ? 'typing...' : true
                }
                dispatch(update_current_user(currentUser))
            }
        }

        setMyContact(contacts?.data)
        socket.on("received text", handalReceivedMessage)
        socket.on("blocked user", blockUserHandler)
        socket.on('offline', offlineHandler);
        socket.on('joined', logedinHandler);
        socket.on('typing', handleUserTyping)
        return () => {
            socket.off("received text", handalReceivedMessage)
            socket.off("blocked user", blockUserHandler)
            socket.off('offline', offlineHandler);
            socket.off('joined', logedinHandler);
            socket.off("typing", handleUserTyping)
        };
    }, [current_user, contacts])


    const getStartWithNewChat = async () => {
        await dispatch(get_userList({})); // Get the user list from the API
        setGetStart(true); // Show the modal
    }

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
                <Text style={{ ...mainStyle.heading, color: colors.dicsColor }}>Chat</Text>
                <TouchableOpacity style={mainStyle.rightIcon}>
                    <Octicons name='search' size={24} style={{ color: colors.dicsColor }} />
                </TouchableOpacity>
            </View>

            {/* contact list  */}
            <View style={mainStyle.container}>
                {
                    myContact?.length ? <>
                        <ScrollView style={styles.chatContainer}>
                            {
                                myContact?.map((chat, key) => {
                                    return (
                                        <TouchableOpacity key={key} onPress={() => handalSelectChat(chat)} >
                                            <ChatListItem {...chat} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <View style={{ height: 70 }}></View>
                        </ScrollView>
                        <TouchableOpacity style={newChatBtn} onPress={() => { navigation.navigate("Contact") }}>
                            <Image source={isDark ? require('@assets/icons/chat-light.png') : require('@assets/icons/chat-dark.png')} style={{ ...styles.chatIcon }} />
                        </TouchableOpacity>
                    </> : <NoChatYet />
                }
            </View>

        </View>
    )
}

export default ChatScreen

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