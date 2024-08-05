import { windowHeight, windowWidth } from "@utils/comman";
import { StyleSheet } from "react-native";
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
        width: windowWidth < 400 ? windowWidth : windowWidth,
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
        justifyContent: 'center',
        height: windowHeight * 0.6,
        paddingHorizontal: 40,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
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
    },
    moreOption: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        paddingTop: 20
    },
    moreOptionText: {
        fontSize: 18
    },
    formHeading: {
        alignItems: 'center',
    },
    formHeadingText: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})
export default styles;