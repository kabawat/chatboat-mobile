import { windowHeight, windowWidth } from "@utils/comman";
import { StyleSheet } from "react-native";

const mainStyle = StyleSheet.create({
    header: {
        width: windowWidth,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    container: {
        height: windowHeight - 80,
        paddingHorizontal: 4,
        paddingVertical: 10,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
})

export default mainStyle