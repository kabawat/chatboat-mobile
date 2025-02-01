import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, findNodeHandle, UIManager, FlatList } from 'react-native';
import Avatar from '@components/avatar';
import useThemeColors from '@hooks/useThemeColors';
import { formatTimeDifference } from 'helper/timeCal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../App';
import { add_new_message, get_chat_message } from '@redux_store/slice/message';
import { udpate_contact_lastchat } from '@redux_store/slice/chat';
const ChatApp = ({ navigation }) => {
    const defaultMessage = useSelector(state => state.startMsg)
    const current_user = useSelector(state => state.current_user) // current chat user
    const contacts = useSelector(state => state?.contact)
    const profile = useSelector(state => state.profile) // logedin user information
    const chat = useSelector(state => state.chat)
    const colors = useThemeColors()
    const { socket } = useSocket()
    const [inputHeight, setInputHeight] = useState(40); // Initial height of TextInput
    let lastSeen = current_user?.isOnline // lastSeen : true | fasle | typing... (default)

    if (lastSeen === true) {
        lastSeen = "Online"
    }
    if (lastSeen === false) {
        lastSeen = formatTimeDifference(new Date(current_user?.lastSeen))
    }

    // local state 
    const [forwordContactList, setForwordContactList] = useState([])
    const [clipBoardReact, setClipBoardReact] = useState(null) // message reaction
    const [forwordPayload, setForwordPayload] = useState({}) // forword message
    const [previousHeight, setPreviousHeight] = useState(0) // chat scroll height
    const [paddingBottom, setPaddingBottom] = useState(60)
    const [searchValue, setSearchValue] = useState("")
    const [contextData, setContextData] = useState({})
    const [isProfile, setIsProfile] = useState(false) // right side user information
    const [isContext, setIsContext] = useState(false) // message context 
    const [showModal, setShowModal] = useState(false) // show forword message modal
    const [showFile, setShowFile] = useState(false) // styled components
    const [textMSG, setTextMSG] = useState('') // store text message

    const handalCloseModal = () => {
        setShowModal(false)
    }
    // References 
    const chatOperationRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const flatListRef = useRef(null);
    const inputRef = useRef(null); // input box reference

    const dispatch = useDispatch()

    // input box 
    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleChange = (event) => {
        socket.emit('typing', {
            receiver: current_user?._id,
            sender: profile?.data?._id,
            isTyping: true
        });
        setTextMSG(event.target.innerText);

        if (chatOperationRef.current) {
            const height = chatOperationRef.current.offsetHeight;
            setPaddingBottom(height);
        }

        // Clear previous timeout if exists
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout for 5 seconds
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('typing', {
                receiver: current_user?._id,
                sender: profile?.data?._id,
                isTyping: false
            });
        }, 1000);
    };
    useEffect(() => {

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    // Reset the value of the file input field
    const handleFileChange = (event) => {
        event.target.value = '';
    };

    // send message handler 
    const handalSendMessage = () => {
        if (textMSG.trim()) {
            const data = {
                text: textMSG,
                receiver: `${current_user?._id}`,
                sender: `${profile?.data?._id}`,
                chat_id: current_user?.chat_id
            }
            setInputHeight(40)
            dispatch(add_new_message({ ...data, createdAt: new Date() }))
            socket.emit('send text', data)

            dispatch(udpate_contact_lastchat({ ...data, isRead: true }))
            // update last seen message 
            setTextMSG("")
            // setTimeout(() => {
            //     _scrollToEndSmoothly(mainRef)
            // }, 100)
        }
    }

    const handleLayout = (event) => {
        flatListRef.current.scrollToEnd({ offset: 0, animated: false });
        console.log(event)
    };

    const scrollToFirstMessage = (height) => {
        if (flatListRef.current && previousHeight) {
            const newHeight = chat?.data?.length * 50; // Adjust this based on your data
            const scrollIncrease = newHeight - previousHeight;
            setPreviousHeight(height);
            flatListRef.current.scrollToOffset({ offset: scrollIncrease, animated: false });
        }
    };

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        if (contentOffset.y <= 0) {
            if (flatListRef.current) {
                const nodeHandle = findNodeHandle(flatListRef.current);
                if (nodeHandle) {
                    UIManager.measure(nodeHandle, (x, y, width, height, pageX, pageY) => {
                        // Set the height of the FlatList
                        scrollToFirstMessage(height);
                    });
                }
            }
            // Before loading more messages, save the current content height
            dispatch(get_chat_message({ chat_id: current_user?.chat_id, page: chat?.page, clean: false }))
        }
    };


    // show context menu 
    const handleSendDefaultMsg = (msg) => {
        inputRef.current.innerHTML = msg
        setFocus()
        setTextMSG(msg)
    }

    // forword message show modal
    const handleForwardMsgModal = async (payload) => {
        const contactsList = contacts?.data?.filter(item => item?._id?.toString() != current_user?._id?.toString())
        setForwordContactList(contactsList)
        setForwordPayload(payload)
        setShowModal(true)
    }

    // forword contact message
    const handleSearchContact = ({ target }) => {
        const searchTerm = target.value
        setSearchValue(searchTerm)
        const newContacts = contacts.data.filter(user => {
            const { firstName, lastName, email } = user;
            const term = searchTerm.toLowerCase();

            return (
                firstName.toLowerCase().includes(term) ||
                lastName.toLowerCase().includes(term) ||
                email.toLowerCase().includes(term)
            );
        });
        const contactsList = newContacts?.filter(item => item?._id?.toString() != current_user?._id?.toString())
        setForwordContactList(contactsList)
    }

    // forword message functionality 
    const handalForwordMessage = async (payload) => {
        const data = {
            text: forwordPayload?.text,
            receiver: payload?._id,
            sender: profile?.data?._id,
            chat_id: payload?.chat_id
        }
        await dispatch(add_new_message({ ...data, createdAt: new Date() }))
        socket.emit('send text', data)
        await dispatch(udpate_contact_lastchat(data))
        await dispatch(get_chat_message({ chat_id: payload?.chat_id, page: 1, clean: true }))
        await dispatch(handalCurrentUser(payload))
        setTimeout(() => {
            _scrollToEndSmoothly(mainRef)
        }, 100)
        setShowModal(false)
    }

    const handleUnblockContact = async () => {
        const payload = {
            chat_id: current_user?.chat_id,
            is_block: false, // query for unblock
            blocked_by: profile?.data?._id, // unblock by userself
            blocked_user: current_user?._id // unblock user
        }
        dispatch(block_user_contact(payload))
        socket.emit("block user", payload)
        const blocked_by = current_user.blocked_by.filter(item => `${item}` != `${profile?.data?._id}`)
        const currentUser = {
            ...current_user,
            blocked_by: blocked_by,
            is_block: blocked_by?.length ? true : false,
        }
        dispatch(update_current_user(currentUser))
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, styles.shadow, { backgroundColor: colors.dimBackground }]}>
                <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" color={colors.headingColor} size={25} />
                    <Avatar title={current_user.firstName} imageUrl={current_user?.picture || ""} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleContainer} onPress={() => console.log('Username pressed')}>
                    <Text style={[styles.contactName, { color: colors.headingColor }]}>{current_user.firstName} {current_user.lastName}</Text>
                    <Text style={styles.lastSeen}>{lastSeen}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color={colors.dicsColor} />
                </TouchableOpacity>
            </View>

            {/* Chat Container */}
            <View style={styles.chatContainer}>
                <FlatList
                    ref={flatListRef}
                    data={chat?.data}
                    onScroll={handleScroll}
                    keyExtractor={(item, index) => index.toString()}
                    onLayout={(event) => handleLayout(event)}
                    onContentSizeChange={(width, height) => {
                        console.log("height : ", height)
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={[styles.messageBubble, { alignSelf: `${profile?.data?._id}` == `${item?.receiver}` ? 'flex-start' : 'flex-end' }]}>
                                <Text style={styles.messageText}>{item?.text}</Text>
                            </View>
                        )
                    }}
                />
            </View>

            {/* Input Box and Send Button */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.textInput, { height: Math.min(120, inputHeight) }]}
                    value={textMSG}
                    onChangeText={setTextMSG}
                    placeholder="Type a message"
                    multiline={true}
                    onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
                />
                <TouchableOpacity onPress={handalSendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginLeft: 10,
    },
    middleContainer: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastSeen: {
        fontSize: 12,
        color: 'grey',
    },
    menuButton: {
        padding: 10,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageBubble: {
        backgroundColor: '#dcf8c6',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignSelf: 'flex-start', // or 'flex-end' based on sender
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textInput: {
        flex: 1,
        maxHeight: 120, // Maximum height for TextInput
        backgroundColor: '#fff',
        borderRadius: 10,
        minHeight: 40,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#075E54',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChatApp;