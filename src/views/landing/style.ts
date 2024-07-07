import GlobalColor from "@style/colors";
import { windowWidth } from "@utils/comman";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
const styles = StyleSheet.create({
    img: {
        width: windowWidth,
        height: windowWidth
    },
    heading: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: "OpenSans-Regular",
    },
    disc: {
        alignItems: 'center',
        paddingVertical: 10
    },
    disc_text: {
        fontFamily: "OpenSans-Regular",
        textAlign: 'center',
        fontSize: 18
    },
    btn: {
        width: windowWidth * 0.5,
        height: 50,
        marginBottom: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: GlobalColor.primary
    },
    login_btn: {
        backgroundColor: GlobalColor.primary,
    },

    btn_text: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    login_text: {
        color: Colors.white
    },
    signup_text: {
        color: GlobalColor.primary,
    }
})
export default styles