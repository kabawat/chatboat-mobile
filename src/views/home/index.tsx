import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import useThemeColors from '@hooks/useThemeColors';
import Chat from './screen/chat';
const Tab = createBottomTabNavigator();

const Home = () => {
    const colors = useThemeColors()
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.dimBackground,
                    ...styles.tabBarStyle,
                    ...styles.shadow,
                    borderColor: 'transparent',
                    paddingTop: 10
                },
            }}
            sceneContainerStyle={{
                backgroundColor: colors.background,
            }}
        >
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={styles.iconSetion}>
                            <Ionicons name="chatbubbles-outline" color={focused ? colors.mainColor : colors.headingColor} size={24} />
                            <Text style={{ color: focused ? colors.mainColor : colors.headingColor, marginTop: 2 }}>Chat</Text>
                        </View>
                    ),
                    tabBarBadge: 10,
                    tabBarBadgeStyle: styles.tabBarBadge
                }}
            />
            <Tab.Screen
                name="Reel"
                component={Child}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={styles.iconSetion}>
                            <Ionicons name="call-outline" color={focused ? colors.mainColor : colors.headingColor} size={24} />
                            <Text style={{ color: focused ? colors.mainColor : colors.headingColor, marginTop: 2 }}>Call</Text>
                        </View>
                    )
                }}
            />
            {/* <Tab.Screen
                name="Home"
                component={Child}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={{
                            ...styles.iconSetion,
                            ...styles.shadow,
                            backgroundColor: colors.background,
                            bottom: 30,
                            width: 75,
                            height: 75,
                            borderRadius: 75,

                        }}>
                            <AntDesign name="plus" color={color} size={40} />
                        </View>
                    )
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                component={Child}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={styles.iconSetion}>
                            <Feather name="camera" color={focused ? colors.mainColor : colors.headingColor} size={24} />
                            <Text style={{ color: focused ? colors.mainColor : colors.headingColor, marginTop: 2 }}>Status</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Child}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={styles.iconSetion}>
                            <Feather name="user" color={focused ? colors.mainColor : colors.headingColor} size={size} />
                            <Text style={{ color: focused ? colors.mainColor : colors.headingColor, marginTop: 2 }}>Profile</Text>
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
    );
};

export default Home;

function Child() {
    return (
        <View style={styles.iconSetion}>
            <Text>Child</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        right: 20,
        borderRadius: 15,
        height: 80
    },
    iconSetion: {
        justifyContent: 'center',
        alignItems: "center",
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
    tabBarBadge: {
        justifyContent: 'center',
        lineHeight: 20,
        alignItems: 'center',
        width: 20,
        fontSize: 10,
        height: 20
    }
})