import React, { ComponentType } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Body } from '@pxblue/react-native-components';

type IconToggleProps = {
    IconComponent: ComponentType<{ size: number; color: string }>;
    label: string;
    active: boolean;
    onPress: () => void;
    style?: object;
};

const styles = StyleSheet.create({
    iconContainer: {
        margin: 8,
    },
});

class IconToggle extends React.PureComponent<IconToggleProps> {
    constructor(props: IconToggleProps) {
        super(props);
    }

    render(): JSX.Element {
        const { IconComponent, label, active, onPress } = this.props;
        const { iconContainer } = styles;
        const color = active ? Colors.blue['500'] : Colors.black['500'];
        return (
            <View style={iconContainer}>
                <TouchableOpacity onPress={onPress}>
                    <View>
                        <IconComponent size={32} color={color} />
                    </View>
                </TouchableOpacity>
                <Body style={{ color: color, textAlign: 'center', marginTop: 8 }}>{label}</Body>
            </View>
        );
    }
}

export default IconToggle;
