import React from 'react';
import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import * as Colors from '@pxblue/colors'

type BottomSheetState = {
    bounceValue: any;
}

type BottomSheetProps = {
    show: boolean;
    style: object;
}

class BottomSheet extends React.PureComponent<BottomSheetProps, BottomSheetState> {
    constructor(props: BottomSheetProps) {
        super(props);
        this.state = { bounceValue: new Animated.Value(this.props.show ? 0 : 400) }
    }
    componentDidUpdate(prevProps: BottomSheetProps) {
        if (this.props.show !== prevProps.show) {
            const bounceValue = this.props.show ? 0 : 400;
            Animated.timing(
                this.state.bounceValue,
                {
                    toValue: bounceValue,
                    duration: 200,
                }
            ).start();
        }
    }
    render() {
        return (
            <Animated.View
                style={[this.props.style,
                { transform: [{ translateY: this.state.bounceValue }] }]}
            >
                <SafeAreaView style={styles.safeContainer}>
                    {this.props.children}
                </SafeAreaView>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: Colors.white[100],
        flex: 1,
    }
});

export default BottomSheet;