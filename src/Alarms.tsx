import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from 'react-native';
import * as Colors from '@pxblue/colors';
import { Divider, Icon, ListItem } from 'react-native-elements';
import { Header, InfoListItem, wrapIcon } from '@pxblue/react-native-components';

const MenuIcon = wrapIcon({ IconClass: Icon, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: Icon, name: 'more-vert' });
const NotificatonsIcon = wrapIcon({ IconClass: Icon, name: 'notifications' });
const NotificatonsActiveIcon = wrapIcon({ IconClass: Icon, name: 'notifications-active' });
const InfoIcon = wrapIcon({ IconClass: Icon, name: 'info' });
const AccessTimeIcon = wrapIcon({ IconClass: Icon, name: 'access-time' })
const SettingsIcon = wrapIcon({ IconClass: Icon, name: 'settings' });
const UpdateIcon = wrapIcon({ IconClass: Icon, name: 'update' });
import BottomSheet from './BottomSheet';
import IconToggle from './components/IconToggle';

import alarms, { formatDate } from './alarmData';

const FILTERS = {
    TIME: "time",
    TYPE: "type"
}
  
const TYPES = {
    ALARM: 'alarm',
    SESSION: 'session',
    EVENT: 'settings'
}  

type alarmDataObject = {
    date: number,
    type: string,
    active: boolean,
    location: string,
    device: string,
    details: string
}

type AlarmsState = {
    showBottomSheet: boolean;
    alarmList: Array<alarmDataObject>;
    currentSort: string;
    showAlarms: boolean;
    showActiveAlarms: boolean;
    showEvents: boolean;
    showSessions: boolean;
}

class Alarms extends React.Component<{}, AlarmsState> {
    constructor(props: object) {
        super(props);
        this.state = {
            showBottomSheet: false,
            alarmList: alarms(20),
            currentSort: 'time',
            showAlarms: true,
            showActiveAlarms: true,
            showEvents: true,
            showSessions: true
        };
    }

    sortedEvents() {
        switch (this.state.currentSort) {
          case FILTERS.TYPE:
            return this.state.alarmList.sort((a, b) => {
              // primary sort by type
              if (a.type < b.type) { return -1; }
              else if (a.type > b.type) { return 1; }
              else {
                // secondary sort by alarm active and/or date 
                if (a.type !== TYPES.ALARM) { return b.date - a.date; }
                else {
                  if (a.active && !b.active) { return -1; }
                  else if (b.active && !a.active) { return 1; }
                  else { return b.date - a.date }
                }
              }
            });
          case FILTERS.TIME:
          default:
            return this.state.alarmList.sort((a, b) => b.date - a.date);
        }
      }
    
      filteredEvents(events) {
        return events.filter((item) => {
          if (!this.state.showActiveAlarms && item.type === TYPES.ALARM && item.active) { return false }
          if (!this.state.showAlarms && item.type === TYPES.ALARM && !item.active) { return false }
          if (!this.state.showEvents && item.type === TYPES.EVENT) { return false }
          if (!this.state.showSessions && item.type === TYPES.SESSION) { return false }
          return true;
        });
      }

    render() {
        let alarmList = this.filteredEvents(this.sortedEvents());
        return (
            <>
                <Header
                    navigation={{ icon: MenuIcon, onPress: () => { } }}
                    title={'Complex Bottom Sheet'}
                    actionItems={[
                        { icon: MoreIcon, onPress: () => { this.setState({ showBottomSheet: true }) } }
                    ]}
                />
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        {
                            alarmList.map((item, index) => (
                                <InfoListItem
                                    key={index}
                                    title={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                                    subtitle={formatDate(item.date)}
                                    backgroundColor={Colors.white[50]}
                                    IconClass={
                                        item.type === 'alarm' && item.active && NotificatonsActiveIcon ||
                                        item.type === 'alarm' && !item.active && NotificatonsIcon ||
                                        item.type === 'settings' && SettingsIcon ||
                                        item.type === 'session' && UpdateIcon
                                    }
                                    iconColor={item.active ? Colors.white[100] : Colors.black[500]}
                                    fontColor={item.active ? Colors.red[500] : Colors.black[500]}
                                    statusColor={item.active ? Colors.red[500] : Colors.white[100]}
                                    avatar={item.active}
                                />
                            ))
                        }
                    </ScrollView>
                </SafeAreaView>
                {this.state.showBottomSheet ? 
                        <View 
                            style={styles.overlay}
                            onTouchStart={() => this.setState({ showBottomSheet: false })}
                            testID={'overlay'}
                            >
                        </View>
                        : null
                }
                <BottomSheet 
                    style={styles.footer} 
                    show={this.state.showBottomSheet}
                    >
                    <View style={styles.rowHeader}>
                        <Text style={styles.listHeader} >Sort By: </Text>
                        <View style={styles.row}>
                            <IconToggle IconComponent={AccessTimeIcon} active={this.state.currentSort === FILTERS.TIME} label={'Time'} onPress = {() => this.setState({ currentSort: FILTERS.TIME })}   > </IconToggle>
                            <IconToggle IconComponent={InfoIcon} active={this.state.currentSort === FILTERS.TYPE} label={'Type'} onPress = {() => this.setState({ currentSort: FILTERS.TYPE })}   > </IconToggle>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.rowHeader}>
                        <Text style={styles.listHeader} >Show: </Text>
                        <View style={styles.row}>
                            <IconToggle IconComponent={NotificatonsActiveIcon} active={this.state.showActiveAlarms} label={'Active Alarms'} onPress = {() => this.setState({ showActiveAlarms: !this.state.showActiveAlarms })}   > </IconToggle>
                            <IconToggle IconComponent={NotificatonsIcon} active={this.state.showAlarms} label={'Alarms'} onPress = {() => this.setState({ showAlarms: !this.state.showAlarms })}   > </IconToggle>
                            <IconToggle IconComponent={SettingsIcon} active={this.state.showEvents} label={'Settings'} onPress = {() => this.setState({ showEvents: !this.state.showEvents })}   > </IconToggle>
                            <IconToggle IconComponent={UpdateIcon} active={this.state.showSessions} label={'Sessions'} onPress = {() => this.setState({ showSessions: !this.state.showSessions })}   > </IconToggle>
                        </View>
                    </View>
                    <Divider />
                    <ListItem
                        title={'Close'}
                        leftIcon={{ name: 'clear' }}
                        onPress={() => this.setState({ showBottomSheet: false })}
                        titleStyle={styles.bottomSheetItemTitle}
                        testID={'cancel-button'}
                    />
                </BottomSheet>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white[100],
        flex: 1,
    },
    footer: {
        margin: 0,
        backgroundColor: Colors.white[100],
        shadowColor: Colors.black[900],
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%', 
        maxWidth: 600,
    },
    bottomSheetItemTitle: {
        paddingLeft: 16,
    },
    listHeader:{
        fontSize: 17
    },
    overlay: {
        backgroundColor: Colors.black[900],
        opacity: 0.7,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowHeader: {
        padding: 10,
    }
});
export default Alarms;