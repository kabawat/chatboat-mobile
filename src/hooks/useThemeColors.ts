import GlobalColor from '@style/colors';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const useThemeColors = () => {
    const isDark = useColorScheme() === 'dark';
    const mainColor = isDark ? GlobalColor.primary : GlobalColor.primary;
    const mainLight = isDark ? Colors.black : Colors.white;
    const mainDark = isDark ? Colors.dark : Colors.light;
    const headingColor = isDark ? Colors.lighter : Colors.dark;
    const dicsColor = isDark ? Colors.light : Colors.dark;
    const textColor = isDark ? Colors.white : Colors.dark;

    return {
        mainColor,
        mainLight,
        headingColor,
        dicsColor,
        textColor,
        mainDark
    };
};

export default useThemeColors;
