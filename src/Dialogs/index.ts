import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export function dialogBox(message: string, type: string = "DANGER", _callback = () => { }) {
    if (type) {
        let capitalizedText = capitalizeText(type);
        Dialog.show({
            type: ALERT_TYPE[type],
            title: type == 'DANGER' ? "Failed" : capitalizedText, // 'DANGER' | 'SUCCESS' | 'WARNING' | 'INFO'
            textBody: message,
            button: 'Got it!',
            onHide: _callback,
            autoClose: true,
            closeOnOverlayTap: true
        })
    }
}

export default dialogBox
function capitalizeText(text) {
    return text.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

