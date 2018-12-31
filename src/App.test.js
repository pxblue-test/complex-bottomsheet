import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlarmList from './App';


Enzyme.configure({adapter: new Adapter()});

it('allows to display all events', () => {
 
    const register= shallow(<AlarmList></AlarmList>).dive().instance();
    const spy = spyOn(register, 'resetFilter').and.callThrough();
    const data = [{ "date": 1545428583069, "active": false, "location": "Parker Field West", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1544988929886, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1545414474034, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1544980111274, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Under Voltage Fault" }, { "date": 1545768504078, "active": false, "location": "Jameson Field", "device": "Pentair Aurora", "details": "Over Voltage Fault" }, { "date": 1545124209799, "active": false, "location": "Parker Field West", "device": "Pentair Aurora", "details": "Under Current Fault" }, { "date": 1545822693218, "active": false, "location": "Dos Valley Field", "device": "PXL DG1", "details": "Under Voltage Fault" }, { "date": 1545167308761, "active": true, "location": "Jameson Field", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1545732452179, "active": false, "location": "Dos Valley Field", "device": "Pentair Aurora", "details": "Under Voltage Fault" }, { "date": 1545846972700, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Under Voltage Fault" }];
    register.state={
        alarmList: data,
        activeFilter: 'events'
      }
      register.filterAlarams('events')
      expect(register.resetFilter).toHaveBeenCalled();
      expect(register.state.activeFilter).toBeNull(); 
});

it('allows to display all active-alarms', () => {
 
    const register= shallow(<AlarmList></AlarmList>).dive().instance();
    const spy = spyOn(register, 'resetFilter').and.callThrough();
    const data = [{ "date": 1545428583069, "active": false, "location": "Parker Field West", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1544988929886, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1545414474034, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1544980111274, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Under Voltage Fault" }, { "date": 1545768504078, "active": false, "location": "Jameson Field", "device": "Pentair Aurora", "details": "Over Voltage Fault" }, { "date": 1545124209799, "active": false, "location": "Parker Field West", "device": "Pentair Aurora", "details": "Under Current Fault" }, { "date": 1545822693218, "active": false, "location": "Dos Valley Field", "device": "PXL DG1", "details": "Under Voltage Fault" }, { "date": 1545167308761, "active": true, "location": "Jameson Field", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1545732452179, "active": false, "location": "Dos Valley Field", "device": "Pentair Aurora", "details": "Under Voltage Fault" }, { "date": 1545846972700, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Under Voltage Fault" }];
    register.state={
        alarmList: data,
        activeFilter: 'ACTIVE_ALARMS'
      }
      register.filterAlarams('ACTIVE_ALARMS')
      expect(register.resetFilter).toHaveBeenCalled();
      expect(register.state.activeFilter).toBeNull(); 
});

it('allows to display all alarms', () => {
 
    const register= shallow(<AlarmList></AlarmList>).dive().instance();
    const spy = spyOn(register, 'resetFilter').and.callThrough();
    const data = [{ "date": 1545428583069, "active": false, "location": "Parker Field West", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1544988929886, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1545414474034, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1544980111274, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Under Voltage Fault" }, { "date": 1545768504078, "active": false, "location": "Jameson Field", "device": "Pentair Aurora", "details": "Over Voltage Fault" }, { "date": 1545124209799, "active": false, "location": "Parker Field West", "device": "Pentair Aurora", "details": "Under Current Fault" }, { "date": 1545822693218, "active": false, "location": "Dos Valley Field", "device": "PXL DG1", "details": "Under Voltage Fault" }, { "date": 1545167308761, "active": true, "location": "Jameson Field", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1545732452179, "active": false, "location": "Dos Valley Field", "device": "Pentair Aurora", "details": "Under Voltage Fault" }, { "date": 1545846972700, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Under Voltage Fault" }];
    register.state={
        alarmList: data,
        activeFilter: 'ALARMS'
      }
      register.filterAlarams('ALARMS')
      expect(register.resetFilter).toHaveBeenCalled();
      expect(register.state.activeFilter).toBeNull(); 
});
it('allows to display time', () => {
 
    const register= shallow(<AlarmList></AlarmList>).dive().instance();
    const spy = spyOn(register, 'resetFilter').and.callThrough();
    const data = [{ "date": 1545428583069, "active": false, "location": "Parker Field West", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1544988929886, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1545414474034, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1544980111274, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Under Voltage Fault" }, { "date": 1545768504078, "active": false, "location": "Jameson Field", "device": "Pentair Aurora", "details": "Over Voltage Fault" }, { "date": 1545124209799, "active": false, "location": "Parker Field West", "device": "Pentair Aurora", "details": "Under Current Fault" }, { "date": 1545822693218, "active": false, "location": "Dos Valley Field", "device": "PXL DG1", "details": "Under Voltage Fault" }, { "date": 1545167308761, "active": true, "location": "Jameson Field", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1545732452179, "active": false, "location": "Dos Valley Field", "device": "Pentair Aurora", "details": "Under Voltage Fault" }, { "date": 1545846972700, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Under Voltage Fault" }];
    register.state={
        alarmList: data,
        activeFilter: 'time'
      }
      register.filterAlarams('time')
      expect(register.resetFilter).toHaveBeenCalled();
      expect(register.state.activeFilter).toBeNull(); 
});

it('allows time to be displayed', () => {
 
    const register= shallow(<AlarmList></AlarmList>).dive().instance();
    const spy = spyOn(register, 'passData').and.callThrough();
    const data = [{ "date": 1545428583069, "active": false, "location": "Parker Field West", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1544988929886, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1545414474034, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1544980111274, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Under Voltage Fault" }, { "date": 1545768504078, "active": false, "location": "Jameson Field", "device": "Pentair Aurora", "details": "Over Voltage Fault" }, { "date": 1545124209799, "active": false, "location": "Parker Field West", "device": "Pentair Aurora", "details": "Under Current Fault" }, { "date": 1545822693218, "active": false, "location": "Dos Valley Field", "device": "PXL DG1", "details": "Under Voltage Fault" }, { "date": 1545167308761, "active": true, "location": "Jameson Field", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1545732452179, "active": false, "location": "Dos Valley Field", "device": "Pentair Aurora", "details": "Under Voltage Fault" }, { "date": 1545846972700, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Under Voltage Fault" }];
    register.state={
        alarmList: data,
        activeFilter: 'events'
      }
      register.filterAlarams('time')
      expect(register.passData).toHaveBeenCalled();
      expect(register.state.activeFilter).toEqual('time');
    
});







 

