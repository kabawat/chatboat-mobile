import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@components/hoc/main_container'
import formStyle from '../style'
import { windowHeight } from '@utils/comman'
import useThemeColors from '@hooks/useThemeColors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalColor from '@style/colors'
import endpoint from 'config/api_endpoint'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UnAuthService } from '@service/verify.service'
const formInit = {
    email: "",
    firstName: "",
    lastName: ""
}
const StepOne = ({ navigation }: any) => {
    const Service = UnAuthService()
    const colors = useThemeColors()
    const [formData, setFormData] = useState(formInit)
    const [loader, setLoader] = useState(false)
    const handleChange = (value: string, name: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            const { firstName, lastName, email } = formData
            setLoader(true)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Hmm... That doesn't seem like a valid email address!")
            }
            if (!firstName || !lastName) {
                throw new Error("Hold up! Names can't be blank. Fill 'em in!");
            }

            const res = await Service.post(endpoint.SEND_OTP_ON_EMIAL, formData)
            await AsyncStorage.setItem('_x_v_t', res.data.varifyToken)
            let payload = {
                email: formData.email,
                message: res.data.message
            }
            navigation.navigate("VerifyOTP", { payload })
        } catch (error) {
            console.log("error : ", error)
        }

    }

    return (
        <>
            <View style={{ height: windowHeight * 0.3, position: "relative" }}>
                <View style={formStyle.introSection}>
                    <Image source={require('@assets/bg/blumba.png')} style={formStyle.introBgImg} />
                </View>
                <View style={formStyle.topSection}>
                    <Text style={formStyle.disc}>Wellcome Back,</Text>
                    <Text style={formStyle.heading}>Sign Up!</Text>
                </View>
            </View>
            <View style={formStyle.loginContainer}>
                <View style={formStyle.formHeading}>
                    <Text style={{ ...formStyle.formHeadingText, color: colors.mainColor }}>Personal Details</Text>
                </View>
                <View style={{ ...formStyle.inputContainer, borderColor: colors.mainDark }}>
                    <View style={formStyle.iconContainer}>
                        <FontAwesome name="user-o" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...formStyle.input, color: colors.textColor }}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='First Name'
                        onChangeText={(text) => handleChange(text, 'firstName')}
                    />
                </View>
                <View style={{ ...formStyle.inputContainer, borderColor: colors.mainDark }}>
                    <View style={formStyle.iconContainer}>
                        <FontAwesome name="user-o" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...formStyle.input, color: colors.textColor }}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Last Name'
                        onChangeText={(text) => handleChange(text, 'lastName')}
                    />
                </View>
                <View style={{ ...formStyle.inputContainer, borderColor: colors.mainDark }}>
                    <View style={formStyle.iconContainer}>
                        <MaterialCommunityIcons name="email-outline" size={18} color={colors.dicsColor} />
                    </View>
                    <TextInput style={{ ...formStyle.input, color: colors.textColor }}
                        placeholderTextColor={colors.dicsColor}
                        placeholder='Email'
                        onChangeText={(text) => handleChange(text, 'email')}
                    />
                </View>

                <View style={{ ...formStyle.btnContainer, marginTop: 50 }}>
                    <TouchableOpacity style={{ ...formStyle.btn, backgroundColor: colors.mainColor }} onPress={handleSubmit}>
                        <Text style={formStyle.btnText}>Send OTP</Text>
                    </TouchableOpacity>
                </View>
                <View style={formStyle.moreOption}>
                    <Text style={{ ...formStyle.moreOptionText, color: colors.dicsColor }}>Already have an account? </Text>
                    <Text onPress={() => navigation.navigate("Login")} style={{ ...formStyle.moreOptionText, color: GlobalColor.primary }}>Login</Text>
                </View>
            </View>
        </>
    )
}

export default MainContainer(StepOne)