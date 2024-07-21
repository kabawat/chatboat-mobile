import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Avatar = ({ imageUrl, title, size, backgroundColor }) => {
    const initials = title.slice(0, 1);
    const avatarSize = size || 50;
    const containerStyle = {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2, // Ensures the avatar is round
        backgroundColor: backgroundColor || '#ccc', // Default background color
    };

    return (
        <View style={[styles.avatarContainer, containerStyle]}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.avatarImage} />
            ) : (
                <Text style={styles.avatarText}>{initials}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    avatarText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Avatar;
