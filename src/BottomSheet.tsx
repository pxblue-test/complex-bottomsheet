import React from 'react';
import Modal from 'react-native-modal';

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
                {this.props.children}
            </Modal>
        );
    }
}

export default BottomSheet;
