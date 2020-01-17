import React, { ComponentType } from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import * as Colors from '@pxblue/colors'

type IconToggleProps = {
    IconComponent: ComponentType<{ size: number, color: string }>;
    label: string;
    active: boolean;
    onPress: () => void;
    style?: object;
}

class IconToggle extends React.PureComponent<IconToggleProps>{
    constructor(props: IconToggleProps) {
        super(props);
    }

    render() {
        const {IconComponent, label, active, onPress } = this.props;
        const { iconContainer } = styles;
        let color = active ? Colors.blue['500'] : Colors.black['500']
        return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={iconContainer} >
                    <IconComponent size={32} color={color} />
                </View>
            </TouchableOpacity>
            <Text style={{color: color, textAlign: 'center'}} >{label}</Text>
        </View>
        )
    }
}

export default IconToggle;

const styles = StyleSheet.create({
    iconContainer: {
      margin: 20
    },
  });