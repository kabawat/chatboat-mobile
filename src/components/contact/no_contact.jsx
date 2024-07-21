import useThemeColors from '@hooks/useThemeColors';
import GlobalColor from '@style/colors';
import { windowWidth } from '@utils/comman';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const NoChatYet = () => {
    const colors = useThemeColors()
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('@assets/no-chat-yet.png')} style={styles.iconPaperPlane} />
            </View>
            <Text style={[styles.title, { color: colors.headingColor }]}>No Chat Yet</Text>
            <Text style={[styles.subtitle, { color: colors.dicsColor }]}>Zero chats, zero fun!{'\n'}Pick someone and get chatting!</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Start ➔</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconPaperPlane: {
        width: windowWidth - 100,
        height: windowWidth - 200,
    },
    iconEnvelope: {
        width: 100,
        height: 100,
    },
    iconBell: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: GlobalColor.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default NoChatYet;
