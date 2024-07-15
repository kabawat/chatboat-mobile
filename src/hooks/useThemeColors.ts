import GlobalColor from '@style/colors';
import { registerCallableModule, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const useThemeColors = () => {
    const isDark = useColorScheme() === 'dark';
    const dimBackground = isDark ? GlobalColor.primaryDimDark : GlobalColor.primaryDimLight;
    const mainColor = isDark ? GlobalColor.primary : GlobalColor.primary;
    const mainLight = isDark ? Colors.black : Colors.white;
    const mainDark = isDark ? Colors.dark : Colors.light;
    const headingColor = isDark ? Colors.lighter : Colors.dark;
    const dicsColor = isDark ? Colors.light : Colors.dark;
    const textColor = isDark ? Colors.white : Colors.dark;
    const background = isDark ? Colors.black : Colors.white;

    const dicsDim = isDark ? '#aaa' : '#666';

    return {
        mainColor,
        mainLight,
        headingColor,
        dicsColor,
        textColor,
        mainDark,
        background,
        dicsDim,
        dimBackground
    };
};

export default useThemeColors;
