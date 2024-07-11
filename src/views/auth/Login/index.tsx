import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import MainContainer from '@components/hoc/main_container'
import styles from '../style'
import { windowHeight } from '@utils/comman'
import useThemeColors from '@hooks/useThemeColors'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBoxACheck } from '@components/checkbox'
import GlobalColor from '@style/colors'
const Login = ({ navigation }: any) => {
    const colors = useThemeColors()
    return (
        <>
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
                    <TouchableOpacity style={{ ...styles.btn, backgroundColor: colors.mainColor }}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.moreOption}>
                    <Text style={{ ...styles.moreOptionText, color: colors.dicsColor }}>Don't have an account? </Text>
                    <Text onPress={() => navigation.navigate("Registration")} style={{ ...styles.moreOptionText, color: GlobalColor.primary }}>Registration</Text>
                </View>
            </View>
        </>
    )
}

export default MainContainer(Login)