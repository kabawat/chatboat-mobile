import Avatar from '@components/avatar';
import useThemeColors from '@hooks/useThemeColors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactList = (props: any) => {
    const { contactName, avatarUrl, about, backgroundColor } = props
    const colors = useThemeColors()
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
                <Text style={{ ...styles.statusText, color: colors.dicsDim }}>{about}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
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

});

export default ContactList;
