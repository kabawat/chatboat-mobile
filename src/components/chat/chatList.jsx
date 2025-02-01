import Avatar from '@components/avatar';
import useThemeColors from '@hooks/useThemeColors';
import { formatTimeDifference } from 'helper/timeCal';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatListItem = (currentChat) => {
    let lastSeen = currentChat?.isOnline // lastSeen : true | fasle | typing... (default)
    if (lastSeen === true) {
        lastSeen = "Online"
    }
    if (lastSeen === false) {
        lastSeen = formatTimeDifference(new Date(currentChat?.lastSeen))
    }

    const colors = useThemeColors()
    const statusText = currentChat?.is_block ? (currentChat?.is_block === 'you' ? 'You blocked this contact' : 'You are blocked by this contact') : currentChat?.last_chat?.text || currentChat?.about;
    return (
        <View style={styles.container}>
            <Avatar
                imageUrl={currentChat?.picture || ""}
                title={currentChat?.firstName}
                size={45}
                backgroundColor={'red'}
            />
            <View style={styles.middleContainer}>
                <Text style={{ ...styles.contactName, color: colors.headingColor }}>{currentChat?.firstName} {currentChat?.lastName}</Text>
                <Text style={{ ...styles.statusText, color: colors.dicsDim }} numberOfLines={1} ellipsizeMode="tail">
                    {statusText}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={{ ...styles.status, color: colors.mainColor }}>
                    {lastSeen}
                </Text>
                <View style={{ ...styles.unreadContainer, backgroundColor: currentChat?.totalUnRead ? '#f44336' : 'transparent' }}>
                    <Text style={{ ...styles.unreadText, color: currentChat?.totalUnRead ? '#fff' : 'transparent' }}>{currentChat?.totalUnRead}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.06)',
    },
    middleContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusText: {
        marginTop: 4,
    },
    rightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 60,
    },
    status: {
        color: '#999',
    },
    unreadContainer: {
        backgroundColor: 'red',
        borderRadius: 10,
        fontSize: 6,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
    },
    unreadText: {
        fontWeight: 'bold',
    },
});

export default ChatListItem;
