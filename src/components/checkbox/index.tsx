import GlobalColor from '@style/colors';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const CheckBoxACheck = (props: any) => {
    const [checked, setChecked] = useState(false);
    const scaleValue = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: checked ? 1.3 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [checked]);

    return (
        <TouchableOpacity style={[styles.checkboxCheck, checked && styles.checkboxChecked]} onPress={() => setChecked(!checked)} {...props}>
            <Animated.Text style={[styles.checkboxCheckText, { transform: [{ scale: scaleValue }] }]}>
                ✔
            </Animated.Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        cursor: 'pointer',
    },
    checkboxCheck: {
        width: 17,
        aspectRatio: 1,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: Colors.dark,
        position: 'relative',
    },
    checkboxChecked: {
        borderColor: '#675c9c',
    },
    checkboxCheckText: {
        position: 'absolute',
        bottom: 1,
        left: 4,
        fontSize: 17,
        color: GlobalColor.primary,
        transform: [{ scale: 0 }],
        // transition: 'all 0.2s ease-in-out',
    },
});

export { CheckBoxACheck };
