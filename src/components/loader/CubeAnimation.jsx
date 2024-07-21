import useThemeColors from '@hooks/useThemeColors';
import { windowHeight, windowWidth } from '@utils/comman';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

function LoadingAnimation({ message }) {
    const colors = useThemeColors();
    return (
        <View style={styles.indicatorWrapper}>
            <ActivityIndicator size="large" color={colors.mainColor} style={{ ...styles.indicator }} />
            <Text style={styles.indicatorText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    indicatorWrapper: {
        position: 'absolute',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: windowHeight,
        width: windowWidth,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        padding: 12,
        borderRadius: 12
    },
    indicatorText: {
        fontSize: 18,
        color: '#fff',
        marginTop: 12,
    },
});

export default LoadingAnimation;