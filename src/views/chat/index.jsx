import Avatar from '@components/avatar';
import useThemeColors from '@hooks/useThemeColors';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChatHome = ({ navigation }) => {
    const onMenuPress = () => {
    }
    const colors = useThemeColors()
    return (
        <View style={{ ...styles.container, ...styles.shadow, backgroundColor: colors.dimBackground }}>
            <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" color={colors.headingColor} size={25} />
                <Avatar title="Mukesh Singh" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContainer} onPress={() => console.log('Username pressed')}>
                <Text style={styles.contactName}>Mukesh Singh</Text>
                <Text style={styles.lastSeen}>Online</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
});

export default ChatHome;
