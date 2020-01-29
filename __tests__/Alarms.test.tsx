import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Alarms from '../src/Alarms';
import BottomSheet from '../src/BottomSheet';

describe('bottom sheet', () => {

    it('should update bottomsheet state accordingly', () => {
        const wrapper = shallow<Alarms>(<Alarms />);
        expect(wrapper.instance().state.showBottomSheet).toEqual(false);
        expect(wrapper.find(BottomSheet).props().show).toEqual(false);

        wrapper.instance().setState({ showBottomSheet: true });
        expect(wrapper.find(BottomSheet).props().show).toEqual(true);

        wrapper.instance().setState({ showBottomSheet: false });
        expect(wrapper.find(BottomSheet).props().show).toEqual(false);
    });

    it('sorts events correctly', () => {
        const wrapper = shallow<Alarms>(<Alarms />);
        const data = [
            { type: 'alarm', date: 0, active: false, location: '', device:'', details: ''},
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device:'', details: '' },
            { type: 'session', date: 8, active: true, location: '', device:'', details: '' },
        ];
        const sortedTime = [
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'session', date: 8, active: true, location: '', device:'', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device:'', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device:'', details: '' },
        ];
        const sortedType = [
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device:'', details: '' },
            { type: 'session', date: 8, active: true, location: '', device:'', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device:'', details: '' },
        ];
        wrapper.instance().state = {
            showBottomSheet: false,
            alarmList: data,
            currentSort: 'time',
            showAlarms: false,
            showActiveAlarms: false,
            showEvents: false,
            showSessions: false,
        };
        let sorted = wrapper.instance().sortedEvents();
        expect(sorted).toEqual(sortedTime);
        wrapper.instance().setState({ currentSort: 'type' });
        sorted = wrapper.instance().sortedEvents();
        expect(sorted).toEqual(sortedType);
    });

    it('filters events correctly', () => {
        const wrapper = shallow<Alarms>(<Alarms />);
        const data = [
            { type: 'alarm', date: 0, active: false, location: '', device:'', details: ''},
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device:'', details: '' },
            { type: 'session', date: 8, active: true, location: '', device:'', details: '' },
        ];

        // show all
        const all = [
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device:'', details: ''},
            { type: 'session', date: 8, active: true, location: '', device:'', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device:'', details: '' },
        ];

        // show alarms
        const alarms = [
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'alarm', date: 0, active: false, location: '', device:'', details: ''},
        ];

        // show sessions
        const sessions = [ 
            { type: 'session', date: 8, active: true, location: '', device:'', details: '' },
        ];

        // show settings and active alarms
        const settingsandactive = [
            { type: 'alarm', date: 10, active: true, location: '', device:'', details: '' },
            { type: 'settings', date: 4, active: true, location: '', device:'', details: '' },
        ];

        wrapper.instance().state = {
            showBottomSheet: false,
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
