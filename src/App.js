import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Close from '@material-ui/icons/Close';
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsActive from '@material-ui/icons/NotificationsActive';
import AccessTime from '@material-ui/icons/AccessTime';
import Info from '@material-ui/icons/Info';
import Settings from '@material-ui/icons/Settings';
import Update from '@material-ui/icons/Update';

import IconToggle from './components/iconToggle';
import { withStyles } from '@material-ui/core/styles';
import * as PXBColors from '@pxblue/colors';
import './style.css';

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

class AlarmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      alarmList: alarms(20),
      currentSort: 'time',
      showAlarms: true,
      showActiveAlarms: true,
      showEvents: true,
      showSessions: true
    }
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
    const { classes } = this.props;
    let alarmList = this.filteredEvents(this.sortedEvents());
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar data-cy="pxb-toolbar">
            <IconButton color="inherit">
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flex: '1 1 0px' }}>
              Complex Bottom Sheet
              </Typography>

            <IconButton data-cy="action-menu" color="inherit" onClick={() => this.setState({ showMenu: true })}>
              <MoreVert />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List data-cy="list-content" className={classes.list}>
          {
            alarmList.map((item, i) => (
              <ListItem key={'item_' + i} className={classes.alarmRow + ' ' + (item.active ? classes.active : '')} >
                <Avatar className={classes.avatar + ' ' + (item.active ? classes.active : '')}>
                  {item.type === 'alarm' && item.active && <NotificationsActive />}
                  {item.type === 'alarm' && !item.active && <Notifications />}
                  {item.type === 'settings' && <Settings />}
                  {item.type === 'session' && <Update />}
                </Avatar>
                <ListItemText
                  secondary={formatDate(item.date)}
                  primary={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                  primaryTypographyProps={{ className: classes.alarmText + ' ' + (item.active ? classes.active : '') }}
                ></ListItemText>
              </ListItem>
            )
            )
          }
        </List>

        {/* Custom/Complex Bottom Sheet Definition */}
        <Drawer
          anchor={'bottom'}
          transitionDuration={250}
          open={this.state.showMenu}
          onClose={() => this.setState({ showMenu: false })}
          className={classes.drawer}
          classes={{ paper: classes.paper }}
        >
          <List style={{ padding: 0 }}>
            <ListItem data-cy="btm-sheet-sort" className={classes.sheetListItem}>
              <Typography variant="body1" gutterBottom>Sort By:</Typography>
              <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                <IconToggle iconComponent={<AccessTime />} label="Time" onClick={() => this.setState({ currentSort: FILTERS.TIME })} active={this.state.currentSort === FILTERS.TIME} />
                <IconToggle iconComponent={<Info />} label="Type" onClick={() => this.setState({ currentSort: FILTERS.TYPE })} active={this.state.currentSort === FILTERS.TYPE} />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem data-cy="btm-sheet-show" className={classes.sheetListItem}>
              <Typography variant="body1" gutterBottom>Show:</Typography>
              <Grid container spacing={0} alignItems={'center'} justify={'center'}>
                <IconToggle
                  iconComponent={<NotificationsActive />}
                  label="Active Alarms" data-cy="active-alarms"
                  onClick={() => this.setState({ showActiveAlarms: !this.state.showActiveAlarms })}
                  active={this.state.showActiveAlarms}
                />
                <IconToggle xs={3}
                  iconComponent={<Notifications />}
                  label="Alarms"
                  onClick={() => this.setState({ showAlarms: !this.state.showAlarms })}
                  active={this.state.showAlarms}
                />
                <IconToggle xs={3}
                  iconComponent={<Settings />}
                  label="Settings"
                  onClick={() => this.setState({ showEvents: !this.state.showEvents })}
                  active={this.state.showEvents}
                />
                <IconToggle xs={3}
                  iconComponent={<Update />}
                  label="Sessions"
                  onClick={() => this.setState({ showSessions: !this.state.showSessions })}
                  active={this.state.showSessions}
                />
              </Grid>
            </ListItem>
            <Divider />
            <ListItem data-cy="btm-sheet-close" className={classes.row} onClick={() => this.setState({ showMenu: false })}>
              <ListItemIcon data-cy="btm-sheet-close-btn"><Close /></ListItemIcon>
              <ListItemText primary={'Close'} />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  list: {
    paddingTop: 0,
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 7
    }
  },
  alarmRow: {
    borderLeft: theme.spacing.unit * 0.5 + 'px solid transparent',
    '&$active': {
      borderColor: '#ff3333'//PXBColors.red['500']
    }
  },
  avatar: {
    color: PXBColors.black['500'],
    background: 'transparent',
    '&$active': {
      color: 'white',
      background: '#ff3333'//PXBColors.red['500']
    }
  },
  alarmText: {
    fontWeight: '600',
    '&$active': {
      color: '#ff3333'//PXBColors.red['500']
    }
  },
  active: {},
  paper: {
    width: '100%',
    maxWidth: 600,
    margin: 'auto',
    userSelect: 'none'
  },
  sheetListItem: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  row: {
    cursor: 'pointer',
    width: '100%',
    '&:hover': {
      backgroundColor: PXBColors.gray['50']
    }
  }
})

export default withStyles(styles)(AlarmList);
