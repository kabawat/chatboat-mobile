import * as React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { windowWidth } from '@utils/comman';
import useThemeColors from '@hooks/useThemeColors';
import ProfileScreen from './screen/profile';
import StatusScreen from './screen/status';
import CallScreen from './screen/call';
import ChatScreen from './screen/chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../App';
import { get_profile } from '@redux_store/slice/profile';
// import ContactScreen from '@views/contact';
// import AntDesign from 'react-native-vector-icons/AntDesign';

const renderScene = SceneMap({
    chat: ChatScreen,
    call: CallScreen,
    // newchat: ContactScreen,
    status: StatusScreen,
    profile: ProfileScreen,

});

const getButtonStyle = (key, colors) => {
    if (key == "newchat") {
        return {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            bottom: 30,
            width: 75,
            height: 75,
            borderRadius: 75,
            shadowOffset: {
                width: 0,
                height: 10,
            },
            backgroundColor: colors.background,
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5
        };
    } else {
        return {
            justifyContent: 'center',
            width: (windowWidth - 50) / 5,
            alignItems: 'center',
            display: 'flex',
            borderRadius: 80
        }
    }
}

export default function Home({ navigation }) {
    const profile = useSelector(state => state.profile)
    const [index, setIndex] = React.useState(0);

    const dispatch = useDispatch()
    const { socket } = useSocket()
    const colors = useThemeColors();
    const layout = useWindowDimensions();

    const [routes] = React.useState([
        { navigation: navigation, key: 'chat', title: 'Chat', icon: 'chatbubbles-outline', IconComponent: Ionicons },
        { navigation: navigation, key: 'call', title: 'Call', icon: 'call-outline', IconComponent: Ionicons },
        // {  navigation:navigation, key: 'newchat', title: '', icon: 'plus', IconComponent: AntDesign },
        { navigation: navigation, key: 'status', title: 'Status', icon: 'camera-outline', IconComponent: Ionicons },
        { navigation: navigation, key: 'profile', title: 'Profile', icon: 'user', IconComponent: Feather },
    ]);
    React.useEffect(() => {
        if (!profile?.status && !profile.loading && !profile?.error) {
            dispatch(get_profile())
        }
        if (profile.status && !profile.loading && socket) {
            socket.emit('login', {
                username: profile?.data?.username,
                _id: profile?.data?._id
            })
        }
    }, [profile, socket])

    return (
        <View style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={() => null} // Disable default tab bar
            />
            <View style={[styles.tabBar, styles.shadow, { backgroundColor: colors.dimBackground }]}>
                {routes.map((route, idx) => {
                    return (
                        <TouchableOpacity key={route.key} style={getButtonStyle(route.key, colors)} onPress={() => setIndex(idx)}>
                            <route.IconComponent
                                name={route.icon}
                                size={route.title ? 24 : 34}
                                style={{ fontWeight: !route.key ? 'bold' : 'normal' }}
                                color={index === idx ? colors.mainColor : colors.headingColor}
                            />
                            {
                                route.title ? <Text style={{ color: index === idx ? colors.mainColor : colors.headingColor, marginTop: 2 }}>
                                    {route.title}
                                </Text> : <></>
                            }
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        borderRadius: 15,
        height: 80,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});
