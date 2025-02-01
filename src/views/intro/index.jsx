import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { windowWidth } from '@utils/comman'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSocket } from '../../../App'
const Intro = ({ navigation }) => {
    const { setupSocket, socket } = useSocket()
    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem('_x_a_t');
            if (token) {
                navigation.replace("Home")
            } else {
                navigation.replace("Landing")
                // navigation.replace("Registration")
            }
        } catch (error) { }
    }
    useEffect(() => {
        if (!socket) {
            setupSocket()
        }
        setTimeout(() => {
            getToken()
        }, 2000)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={require('@assets/logo.png')} style={styles.img} />
            </View>
        </View>
    )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {

    },
    img: {
        width: windowWidth - 10,
        height: windowWidth - 10
    }
})