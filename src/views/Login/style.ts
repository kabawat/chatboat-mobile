import { windowHeight, windowWidth } from "@utils/comman";
import { RootTagContext, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
    introSection: {
        position: "absolute",
        width: windowWidth,
        height: 'auto',
        bottom: 0,
        top: 0,
    },
    introBgImg: {
        position: 'absolute',
        width: windowWidth,
        height: 'auto',
        bottom: 0,
        top: 0,
    },
    topSection: {
        justifyContent: 'center',
        flex: 0.6,
        width: windowWidth,
        paddingLeft: 50
    },
    heading: {
        fontSize: 60,
        color: Colors.white,
        fontWeight: 'bold',
    },
    disc: {
        fontSize: 22,
        color: Colors.light
    },
    loginContainer: {
        height: windowHeight * 0.5,
        paddingHorizontal: 40,
    },
    inputContainer: {
        borderWidth: 1,
        // borderColor: Colors.light,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    checkboxText: {
        marginLeft: 6,
        fontSize: 16,
    },
    input: {
        flex: 1,
        fontSize: 17
    },
    optionSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    btnContainer: {
        marginTop: 80,
        alignItems: 'center',
        paddingHorizontal: 50
    },
    btn: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 25
    },
    btnText: {
        fontSize: 23,
        lineHeight: 23,
        fontWeight: 'bold',
        color: Colors.white,
        textAlign: 'center'
    }
})
export default styles;