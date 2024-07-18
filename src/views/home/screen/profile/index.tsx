import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import useThemeColors from '@hooks/useThemeColors'
import Octicons from 'react-native-vector-icons/Octicons';
import mainStyle from '@views/home/style';
import Avatar from '@components/avatar';
const ProfileScreen = (props: any) => {
    const colors = useThemeColors()
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
                <Text style={{ ...mainStyle.heading, color: colors.dicsColor }}>Profile Details</Text>
                <TouchableOpacity style={mainStyle.rightIcon}>
                    <Octicons name='search' size={24} style={{ color: colors.dicsColor }} />
                </TouchableOpacity>
            </View>

            {/* contact list  */}
            <View style={mainStyle.container}>
                <ScrollView style={styles.chatContainer}>

                </ScrollView>
            </View>

        </View>
    )
}

export default ProfileScreen

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