import { useThemeColors } from '@hooks/main';
import { windowHeight } from '@utils/comman';
import React from 'react';
import { View } from 'react-native';

const MainContainer = (WrappedComponent) => {
    return (props) => {
        const colors = useThemeColors();
        return (
            <View style={{ backgroundColor: colors.mainLight, height: windowHeight }}>
                <WrappedComponent {...props} />
            </View>
        );
    };
};

export default MainContainer;
