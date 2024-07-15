import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import styles from './style'; // Assuming this imports your stylesheet
import { useThemeColors } from '@hooks/main';
const Start = ({ navigation }: any) => {
  const colors = useThemeColors()

  const handleRedirect = (path: string) => {
    navigation.replace(path);
  }

  const handleOpenKabawat = () => {
    Linking.openURL('https://kabawat.com/');
  };
  return (
    <View style={{ backgroundColor: colors.mainLight, flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 5, marginTop: 40 }}>
        <Image source={require('@assets/lending.png')} style={styles.img} />
      </View>
      <View style={{ flex: 5 }}>
        <View>
          <Text style={{ ...styles.heading, color: colors.headingColor }}>Welcome Back!</Text>
          <View style={styles.disc}>
            <Text style={{ ...styles.disc_text, color: colors.dicsColor }}>Please log in to continue </Text>
            <Text style={{ ...styles.disc_text, color: colors.dicsColor }}>chatting with your friends. </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <TouchableOpacity style={{ ...styles.btn, ...styles.login_btn }} onPress={() => handleRedirect('Login')}>
            <Text style={{ ...styles.btn_text, ...styles.login_text }} >Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.btn }} onPress={() => handleRedirect('Registration')}>
            <Text style={{ ...styles.btn_text, ...styles.signup_text }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        <Text style={{ color: colors.dicsColor }}> Powered by </Text>
        <Text style={{ color: '#1976d2', textDecorationLine: 'underline' }} onPress={handleOpenKabawat}>Kabawat</Text>
      </View>
    </View >
  );
}

export default Start;
