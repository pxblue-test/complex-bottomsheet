import React from 'react';
import TestRenderer, { ReactTestInstance } from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Alarms from '../src/Alarms';
import BottomSheet from '../src/BottomSheet';

describe('bottom sheet', function() {
    let instance: ReactTestInstance;
    beforeEach(() => {
        instance = TestRenderer.create(<Alarms />).root;
    });

    it('should display overlay when menu icon clicked', () => {
        expect(instance.findAll(x => x.props.testID === 'overlay')).toHaveLength(0);

        const actionItem1 = instance.find(x => x.props.testID === 'header-action-item0');
        actionItem1.props.onPress();
        expect(instance.findAll(x => x.props.testID === 'overlay')).not.toHaveLength(0);
    });

    it('should close overlay when cancel button clicked', () => {
        expect(instance.findAll(x => x.props.testID === 'overlay')).toHaveLength(0);

        const actionItem1 = instance.find(x => x.props.testID === 'header-action-item0');
        actionItem1.props.onPress();
        expect(instance.findAll(x => x.props.testID === 'overlay')).not.toHaveLength(0);

        const cancelItem = instance.find(x => x.props.testID === 'cancel-button');
        cancelItem.props.onPress();
        expect(instance.findAll(x => x.props.testID === 'overlay')).toHaveLength(0);
    });

    it('should close overlay when overlay pressed', () => {
        const actionItem1 = instance.find(x => x.props.testID === 'header-action-item0');
        actionItem1.props.onPress();
        expect(instance.findAll(x => x.props.testID === 'overlay')).not.toHaveLength(0);

        const overlayItem = instance.find(x => x.props.testID === 'overlay');
        overlayItem.props.onTouchStart();

        expect(instance.findAll(x => x.props.testID === 'overlay')).toHaveLength(0);
    });

    it('should update bottomsheet state accordingly', () => {
        const wrapper = shallow(<Alarms />);
        expect(wrapper.instance().state.showBottomSheet).toEqual(false);
        expect(wrapper.find(BottomSheet).props().show).toEqual(false);

        wrapper.instance().setState({ showBottomSheet: true });
        expect(wrapper.find(BottomSheet).props().show).toEqual(true);

        wrapper.instance().setState({ showBottomSheet: false });
        expect(wrapper.find(BottomSheet).props().show).toEqual(false);
    });

    it('sorts events correctly', () => {
        const wrapper = shallow(<Alarms></Alarms>);
        const data = [
            { type: 'alarm', date: 0, active: 0 },
            { type: 'alarm', date: 10, active: 1 },
            { type: 'settings', date: 4 },
            { type: 'session', date: 8 },
        ];
        const sortedTime = [
            { type: 'alarm', date: 10, active: 1 },
            { type: 'session', date: 8 },
            { type: 'settings', date: 4 },
            { type: 'alarm', date: 0, active: 0 },
        ];
        const sortedType = [
            { type: 'alarm', date: 10, active: 1 },
            { type: 'alarm', date: 0, active: 0 },
            { type: 'session', date: 8 },
            { type: 'settings', date: 4 },
        ];
        wrapper.instance().state = {
            showMenu: false,
            alarmList: data,
            currentSort: 'time',
        };
        let sorted = wrapper.instance().sortedEvents();
        expect(sorted).toEqual(sortedTime);
        wrapper.instance().setState({ currentSort: 'type' });
        sorted = wrapper.instance().sortedEvents();
        expect(sorted).toEqual(sortedType);
    });

    it('filters events correctly', () => {
        const wrapper = shallow(<Alarms></Alarms>);
        const data = [
            { type: 'alarm', date: 0, active: 0 },
            { type: 'alarm', date: 10, active: 1 },
            { type: 'settings', date: 4 },
            { type: 'session', date: 8 },
        ];

        // show all
        const all = [
            { type: 'alarm', date: 10, active: 1 },
            { type: 'alarm', date: 0, active: 0 },
            { type: 'session', date: 8 },
            { type: 'settings', date: 4 },
        ];

        // show alarms
        const alarms = [
            { type: 'alarm', date: 10, active: 1 },
            { type: 'alarm', date: 0, active: 0 },
        ];

        // show sessions
        const sessions = [{ type: 'session', date: 8 }];

        // show settings and active alarms
        const settingsandactive = [
            { type: 'alarm', date: 10, active: 1 },
            { type: 'settings', date: 4 },
        ];

        wrapper.instance().state = {
            showMenu: false,
            alarmList: data,
            currentSort: 'type',
            showAlarms: true,
            showActiveAlarms: true,
            showEvents: true,
            showSessions: true,
        };

        // all
        let sorted = wrapper.instance().filteredEvents(wrapper.instance().sortedEvents());
        expect(sorted).toEqual(all);

        // alarms
        wrapper
            .instance()
            .setState({ showAlarms: true, showActiveAlarms: true, showEvents: false, showSessions: false });
        sorted = wrapper.instance().filteredEvents(wrapper.instance().sortedEvents());
        expect(sorted).toEqual(alarms);

        // sessions
        wrapper
            .instance()
            .setState({ showAlarms: false, showActiveAlarms: false, showEvents: false, showSessions: true });
        sorted = wrapper.instance().filteredEvents(wrapper.instance().sortedEvents());
        expect(sorted).toEqual(sessions);

        // settings and active
        wrapper
            .instance()
            .setState({ showAlarms: false, showActiveAlarms: true, showEvents: true, showSessions: false });
        sorted = wrapper.instance().filteredEvents(wrapper.instance().sortedEvents());
        expect(sorted).toEqual(settingsandactive);
    });
});
