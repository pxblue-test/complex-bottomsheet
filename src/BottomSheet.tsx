import React from 'react';
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native';


type BottomSheetProps = {
    show: boolean;
    dismissBottomSheet: () => void;
    style: object;
};

class BottomSheet extends React.PureComponent<BottomSheetProps> {
    constructor(props: BottomSheetProps) {
        super(props);
    }
    render(): JSX.Element {
        return (
            <Modal 
                isVisible={this.props.show}
                onBackdropPress={this.props.dismissBottomSheet}
                onBackButtonPress={this.props.dismissBottomSheet}
                style={this.props.style}
            >
                <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                    {this.props.children}
                </SafeAreaView>
            </Modal>
            
        );
    }
}

export default BottomSheet;
