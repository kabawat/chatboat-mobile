import LoadingAnimation from '@components/loader/CubeAnimation';
import useThemeColors from '@hooks/useThemeColors';
import { ServiceVerifyApi } from '@service/verify.service';
import { windowHeight, windowWidth } from '@utils/comman';
import endpoint from 'config/api_endpoint';
import dialogBox from 'Dialogs';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, useColorScheme } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const VerifyOTP = ({ navigation, route }) => {
    const { payload } = route.params;
    const isDark = useColorScheme() == 'dark'
    const colors = useThemeColors()
    const [loader, setLoader] = useState(false)
    const [otp, setOtp] = useState("");
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace']

    const handleKeyPress = (e, index) => {
        const { key } = e.nativeEvent
        if (keys.includes(key)) {
            let value = otp.split("")
            if (key == 'Backspace') {
                value[index] = " "
                if (index > 0) {
                    inputRefs[index - 1].current.focus();
                }
            } else {
                value[index] = key
                if (index < 4) {
                    inputRefs[index + 1].current.focus();
                }
            }
            setOtp(value.join(""))
        }
    };

    const handleSubmit = async () => {
        try {
            const Service = await ServiceVerifyApi()
            if (!otp) {
                dialogBox("Please Enter OTP", 'WARNING')
                return
            }
            if (otp?.length < 5) {
                dialogBox("Please Valid OTP", 'WARNING')
                return
            }
            setLoader(true)
            const res = await Service.post(endpoint.VERIFY_EMAIL_USING_OTP, { otp })
            if (res.data.status) {
                navigation.navigate('StepTwo')
            }
        } catch (error) {
            if (error?.response) {
                dialogBox(error?.response?.data?.error)
            }
            setLoader(false)
        }
    }

    const inputUI = { ...styles.otpInput, borderBottomColor: colors.dicsColor, color: colors.dicsColor }
    return (
        <>
            <View style={{ ...styles.container, backgroundColor: colors.background, position: 'relative' }}>
                <View style={{ position: 'absolute', height: windowHeight, width: windowWidth }}>
                    <Image source={require('@assets/form-bg.png')} style={{ ...styles.BgImg, opacity: isDark ? 0.1 : 1, }} />
                </View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace" size={35} color={colors.dicsColor} />
                    </TouchableOpacity>
                    <Text style={{ ...styles.headerText, color: colors.dicsColor }}>OTP</Text>
                    <View></View>
                </View>
                <View style={styles.form}>
                    <Text style={{ ...styles.title, color: colors.dicsColor }}>Verification code</Text>
                    <View style={{ ...styles.subtitle }}>
                        <Text style={{ ...styles.subTitleText, color: colors.dicsDim }}> We have sent the </Text>
                        <Text style={{ ...styles.subTitleText, color: colors.dicsDim }}> code verification to your email </Text>
                    </View>

                    <Text style={{ ...styles.email, color: colors.dicsColor }}>{payload.email}</Text>
                    <View style={styles.otpContainer}>
                        {inputRefs.map((ref, index) => (
                            <TextInput
                                key={index}
                                ref={ref}
                                style={inputUI}
                                value={otp[index]}
                                maxLength={1}
                                keyboardType="numeric"
                                placeholder=''
                                aria-disabled={true}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resendContainer}>
                        <Text style={styles.resendText}>Tap to Resend</Text>
                    </TouchableOpacity>
                </View>
            </View >
            {loader ? <LoadingAnimation message="Verifying Wait..." /> : <></>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    BgImg: {
        width: windowWidth,
        height: windowHeight
    },
    header: {
        height: 100,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingRight: 40,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 100
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    subtitle: {
        alignItems: 'center',
        marginBottom: 20
    },
    subTitleText: {
        fontSize: 16,
        textAlign: 'center'
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    otpInput: {
        borderBottomWidth: 1,
        fontSize: 24,
        textAlign: 'center',
        width: 40,
        marginHorizontal: 5,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 40,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    resendContainer: {
        marginTop: 20,
    },
    resendText: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default VerifyOTP
