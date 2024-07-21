import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import useThemeColors from '@hooks/useThemeColors'
import Octicons from 'react-native-vector-icons/Octicons';
import mainStyle from '@views/home/style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { get_userList } from '@redux_store/slice/user/userList';
import ContactList from '@components/chat/contactList';
const ContactScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const contacts = useSelector((state) => state.user_list);
    // get all contact list 
    useEffect(() => {
        console.log("contacts : ", contacts)
        if (!contacts?.status && !contacts?.loading) {
            dispatch(get_userList({}));
        }
    }, [contacts])
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
                        contacts?.status ? contacts?.data?.map((chat, key) => {
                            return (
                                <TouchableOpacity key={key}>
                                    <ContactList {...chat} />
                                </TouchableOpacity>
                            )
                        }) : <Text>No Contacts </Text>
                    }
                    {/*for create space  */}
                    <View style={{ height: 70 }}></View>
                </ScrollView>
            </View>
        </View>
    )
}

export default ContactScreen

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

