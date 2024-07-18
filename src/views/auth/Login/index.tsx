import { View, Text, Image, TextInput, TouchableOpacity, Alert, AppRegistry } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@components/hoc/main_container'
import styles from '../style'
import { windowHeight } from '@utils/comman'
import useThemeColors from '@hooks/useThemeColors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBoxACheck } from '@components/checkbox'
import GlobalColor from '@style/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UnAuthService } from '@service/verify.service'
import endpoint from 'config/api_endpoint'
import LoadingAnimation from '@components/loader/CubeAnimation'
import dialogBox from 'Dialogs'
const initform = {
    email: "",
    password: ""
}
const Login = ({ navigation }: any) => {
    const [loader, setLoader] = useState(false)
    const colors = useThemeColors()
    const [formData, setFormData] = useState(initform)
    const handleChanage = (value: string, name: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }



    const handleSubmit = async () => {
        try {
            if (!formData.email || !formData.password) {
                dialogBox("Please Enter Valid Credentials")
                return
            }
            setLoader(true)
            const res = await UnAuthService().post(endpoint.LOGIN, formData)
            const { _id, authToken } = res.data
            await AsyncStorage.setItem('_x_a_t', authToken)
            dialogBox("login Success", "SUCCESS", () => {
                navigation.replace('Home')
            })
        } catch (error: any) {
            if (error?.response?.data?.error) {
                dialogBox(error?.response?.data?.error)
            } else {
                dialogBox("something went wrong")
            }
            setLoader(false)
        }
    }
    return (
        <View style={{ position: 'relative' }}>
            <View style={{ height: windowHeight * 0.3, position: "relative" }}>
                <View style={styles.introSection}>
                    <Image source={require('@assets/bg/blumba.png')} style={styles.introBgImg} />
                </View>
                <View style={styles.topSection}>
                    <Text style={styles.disc}>Welcome Back,</Text>
                    <Text style={styles.heading}>Log In!</Text>
                </View>
            </View>
            <View style={{ ...styles.loginContainer }}>
                <View style={{ ...styles.inputContainer, borderColor: colors.mainDark }}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="user-o" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...styles.input, color: colors.textColor }}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Email Id'
                        onChangeText={(value) => handleChanage(value, "email")}
                    />
                </View>
                <View style={{ ...styles.inputContainer, borderColor: colors.mainDark }}>
                    <View style={styles.iconContainer}>
                        <Feather name="lock" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...styles.input, color: colors.textColor }}
                        secureTextEntry={true}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Password'
                        onChangeText={(value) => handleChanage(value, "password")}
                    />
                </View>
                <View style={styles.optionSection}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBoxACheck />
                        <Text style={{ ...styles.checkboxText, color: colors.dicsColor }}>Remember me</Text>
                    </View>
                    <TouchableOpacity style={{}}>
                        <Text style={{ fontSize: 16, color: colors.dicsColor }}>forgot password</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ ...styles.btnContainer, marginTop: 80, }}>
                    <TouchableOpacity onPress={handleSubmit} style={{ ...styles.btn, backgroundColor: colors.mainColor }}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.moreOption}>
                    <Text style={{ ...styles.moreOptionText, color: colors.dicsColor }}>Don't have an account? </Text>
                    <Text onPress={() => navigation.navigate("Registration")} style={{ ...styles.moreOptionText, color: GlobalColor.primary }}>Registration</Text>
                </View>
            </View>
            {loader ? <LoadingAnimation message="Loading Chat..." /> : <></>}
        </View>
    )
}

export default MainContainer(Login)