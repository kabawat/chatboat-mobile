import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { windowHeight } from '@utils/comman'
import useThemeColors from '@hooks/useThemeColors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainContainer from '@components/hoc/main_container'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import formStyle from '../style'
import React, { useState } from 'react'
import { ServiceVerifyApi } from '@service/verify.service';
import endpoint from 'config/api_endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingAnimation from '@components/loader/CubeAnimation';
import dialogBox from 'Dialogs';
const formInit = {
    username: "",
    password: "",
    confirmPassword: ""
}
const StepTwo = ({ navigation }: any) => {
    const [formData, setFormData] = useState(formInit)
    const [loader, setLoader] = useState(false)
    const colors = useThemeColors()

    const handleChange = (value: string, name: string) => {
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async () => {
        const { password, confirmPassword, username } = formData
        if (password === confirmPassword && password && confirmPassword) {
            if (!username) {
                dialogBox("Please Enter Username")
                return
            }
            try {
                const Service = await ServiceVerifyApi()
                const response = await Service.post(endpoint.REGISTRATION, { password, username })
                if (response.data.status) {
                    const res = await Service.post(endpoint.FINISH_SIGNUP, { is_file: 0 })
                    await AsyncStorage.removeItem('_x_v_t')
                    await AsyncStorage.setItem('_x_a_t', res?.data?.authToken)
                    dialogBox(res?.data?.message, "SUCCESS", () => {
                        navigation.replace('Home')
                    })
                } else {
                    dialogBox("something waiting wrong on our end", "SUCCESS")
                }


            } catch (error) {
                if (error?.response) {
                    dialogBox(error?.response?.data?.error)
                }
                setLoader(false)
            }
        } else {
            dialogBox("Password and Confirm Password should be same")
        }
    }
    return (
        <>
            <View style={{ height: windowHeight * 0.3, position: "relative" }}>
                <View style={formStyle.introSection}>
                    <Image source={require('@assets/bg/blumba.png')} style={formStyle.introBgImg} />
                </View>
                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace" size={35} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                    <Text style={formStyle.disc}>Wellcome Back,</Text>
                    <Text style={formStyle.heading}>QueryBoat</Text>
                </View>
            </View>
            <View style={formStyle.loginContainer}>
                <View style={formStyle.formHeading}>
                    <Text style={{ ...formStyle.formHeadingText, color: colors.mainColor }}>Create Account</Text>
                </View>
                <View style={{ ...formStyle.inputContainer, borderColor: colors.mainDark }}>
                    <View style={formStyle.iconContainer}>
                        <FontAwesome name="user-o" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...formStyle.input, color: colors.textColor }}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Username'
                        onChangeText={(value) => handleChange(value, 'username')}
                    />
                </View>
                <View style={{ ...formStyle.inputContainer, borderColor: colors.mainDark }}>
                    <View style={formStyle.iconContainer}>
                        <MaterialCommunityIcons name="lock-outline" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...formStyle.input, color: colors.textColor }}
                        secureTextEntry={true}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Password'
                        onChangeText={(value) => handleChange(value, 'password')}
                    />
                </View>
                <View style={{ ...formStyle.inputContainer, borderColor: colors.mainDark }}>
                    <View style={formStyle.iconContainer}>
                        <MaterialCommunityIcons name="lock-outline" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...formStyle.input, color: colors.textColor }}
                        secureTextEntry={true}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Confirm Password'
                        onChangeText={(value) => handleChange(value, 'confirmPassword')}
                    />
                </View>

                <View style={{ ...formStyle.btnContainer, marginTop: 50 }}>
                    <TouchableOpacity style={{ ...formStyle.btn, backgroundColor: colors.mainColor }} onPress={handleSubmit}>
                        <Text style={formStyle.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {loader ? <LoadingAnimation message="Verifying Wait..." /> : <></>}
        </>
    )
}

export default MainContainer(StepTwo)