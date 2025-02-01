import { windowHeight, windowWidth } from '@utils/comman';
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 65
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
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        height: 60,
        backgroundColor: '#075E54',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        maxHeight: 120, // Maximum height for TextInput
        backgroundColor: '#fff',
        borderRadius: 20,
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
    // chatContainer: {
    //     flex: 1,
    //     height: '100%',
    //     width: windowWidth,
    // },
    // scrollView: {
    //     flex: 1,
    // },
    // messagesList: {
    //     paddingHorizontal: 10,
    //     paddingTop: 20,
    // },
    // messageContainer: {
    //     marginBottom: 15,
    //     maxWidth: '75%',
    // },
    // userMessage: {
    //     alignSelf: 'flex-end',
    //     backgroundColor: '#63a0de',
    //     borderRadius: 15,
    //     color: '#fff',
    //     padding: 10,
    // },
    // otherMessage: {
    //     alignSelf: 'flex-start',
    //     borderRadius: 15,
    //     padding: 10,
    // },
    // timeText: {
    //     textAlign: 'center',
    //     marginBottom: 6,
    //     fontSize: 12,
    // },
    // messageText: {
    //     fontSize: 16,
    //     color: '#fff',
    // },
    // statusText: {
    //     fontSize: 12,
    //     textAlign: 'right',
    //     marginTop: 5,
    // },
});

export default styles