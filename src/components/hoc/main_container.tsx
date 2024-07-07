import { useThemeColors } from '@hooks/main';
import { windowHeight } from '@utils/comman';
import React from 'react';
import { View } from 'react-native';

const MainContainer = (WrappedComponent: any) => {
    return (props: any) => {
        const colors = useThemeColors();
        return (
            <View style={{ backgroundColor: colors.mainLight, height: windowHeight }}>
                <WrappedComponent {...props} />
            </View>
        );
    };
};

export default MainContainer;
