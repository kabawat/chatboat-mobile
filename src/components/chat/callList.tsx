import Avatar from '@components/avatar';
import useThemeColors from '@hooks/useThemeColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CallListItem = (props: any) => {
    const { contactName, avatarUrl, about, backgroundColor, blocked, } = props
    const colors = useThemeColors()
    const statusText = blocked ? (blocked === 'you' ? 'You blocked this contact' : 'You are blocked by this contact') : about;

    return (
        <View style={styles.container}>
            <Avatar
                imageUrl={avatarUrl}
                title={contactName}
                size={45}
                backgroundColor={backgroundColor}
            />
            <View style={styles.middleContainer}>
                <Text style={{ ...styles.contactName, color: colors.headingColor }}>{contactName}</Text>
                <Text style={{ ...styles.statusText, color: colors.dicsDim }}>
                    {statusText}
                </Text>
            </View>
            <View style={styles.rightContainer}>

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

export default CallListItem;
