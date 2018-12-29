import React from 'react';
import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography 
}from '@material-ui/core';
import {Close, Menu, MoreVert, Notifications, NotificationsActive, AccessTime, Info} from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import * as PXBColors from '@pxblue/colors';
import './style.css';

import alarms, {formatDate} from './alarmData';

const FiltersList = {
  ACTIVE_ALARAMS : "activeAlarams",
  ALARAMS : "alarams",
  TIME : "time",
  EVENTS : "events",
  EVENT_TYPE : "eventType"
}

class AlarmList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showMenu: false,
      alarmList: alarms,
      activeFilter: 'events'
    }
  }

  resetFilter = () => {
    this.setState({alarmList: alarms, activeFilter: null});
    this.closeBottomSheet();
  }

  passData = (data, filterText) => {
    this.setState({alarmList: data, activeFilter: filterText});
    this.closeBottomSheet();
  }

  filterAlarams = (filterText) => {
    if (this.state.activeFilter === filterText) {
      this.resetFilter();
    } else {
      switch (filterText) {
        case FiltersList.ACTIVE_ALARAMS:
          this.newdata = alarms.filter((item) => item.active);
          this.passData(this.newdata, filterText);
          break;
        case FiltersList.ALARAMS:
          this.newdata = alarms.filter((item) => !item.active);
          this.passData(this.newdata, filterText);
          break;
        case FiltersList.TIME:
          this.newdata = [...alarms].sort((a, b) => a.date - b.date);
          this.passData(this.newdata, filterText);
          break;
        case FiltersList.EVENTS:
          this.resetFilter();
          this.setState({activeFilter: filterText});
          break;
        case FiltersList.EVENT_TYPE:
          this.newdata = [...alarms].sort((a, b) => {
            const itemA = a.details.toUpperCase();
            const itemB = b.details.toUpperCase();
            let comparison = 0;
            if (itemA > itemB) {
              comparison = 1;
            } else if (itemA < itemB) {
              comparison = -1;
            }
            return comparison;
          });
          this.passData(this.newdata, filterText);
          break;
          default:
          break;
      }
    }
  }

  closeBottomSheet = () => {
    this.setState({showMenu: false});
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit">
              <Menu /> 
            </IconButton>
              <Typography variant="h6" color="inherit" style={{flex: '1 1 0px'}}>
                Complex Bottom Sheet
              </Typography>

            <IconButton color="inherit" onClick={()=>this.setState({showMenu: true})}>
              <MoreVert/> 
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classes.list}>
          {
            this.state.alarmList.map((item, i) => (
                <ListItem key={'item_' + i} className={classes.alarmRow + ' ' + (item.active ? classes.active : '')} >
                  <Avatar className={classes.avatar + ' ' + (item.active ? classes.active : '')}>
                    {item.active ? <NotificationsActive /> : <Notifications/> }
                  </Avatar>
                  <ListItemText 
                    secondary={formatDate(item.date)} 
                    primary={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                    primaryTypographyProps={{className: classes.alarmText + ' ' + (item.active ? classes.active : '')}}
                  ></ListItemText>
                </ListItem>
              )
            )
          }
        </List>
        <Drawer 
            anchor={'bottom'}
            transitionDuration={250}
            open={this.state.showMenu} 
            onClose={() => this.setState({showMenu: false})}
            className={classes.drawer}
            classes={{paper: classes.paper}}
        >
          <div className={classes.footerList}>
            <Typography variant="h6" gutterBottom>Sort by</Typography>
            <Grid container spacing={0}>
              <Grid item xs={4} className={`${classes.col} ${this.state.activeFilter === FiltersList.TIME ? classes.activeText: null}`} onClick={ this.filterAlarams.bind(this, FiltersList.TIME) }>
                  <AccessTime />
                  <Typography color="inherit">Time</Typography>
              </Grid>
              <Grid item xs={4} className={`${classes.col} ${this.state.activeFilter === FiltersList.EVENT_TYPE ? classes.activeText: null}`} onClick={ this.filterAlarams.bind(this, FiltersList.EVENT_TYPE) }>
                  <Info />
                  <Typography color="inherit">Event Type</Typography>
              </Grid>
            </Grid>
          </div>
          <div className={classes.footerList}>
            <Typography variant="h6" gutterBottom>Filter by</Typography>
            <Grid container spacing={0}>
              <Grid item xs={3} className={`${classes.col} ${this.state.activeFilter === FiltersList.ACTIVE_ALARAMS ? classes.activeText: null}`} onClick={ this.filterAlarams.bind(this, FiltersList.ACTIVE_ALARAMS) }>
                  <NotificationsActive />
                  <Typography color="inherit">Active Alarams</Typography>
              </Grid>
              <Grid item xs={3} className={`${classes.col} ${this.state.activeFilter === FiltersList.ALARAMS ? classes.activeText: null}`} onClick={ this.filterAlarams.bind(this, FiltersList.ALARAMS) }>
                  <Notifications />
                  <Typography color="inherit">Alarms</Typography>
              </Grid>
              <Grid item xs={3} className={`${classes.col} ${this.state.activeFilter === FiltersList.EVENTS ? classes.activeText: null}`} onClick={ this.filterAlarams.bind(this, FiltersList.EVENTS)}>
                  <Info />
                  <Typography color="inherit">Events</Typography>
              </Grid>
            </Grid>
          </div>
          <List style={{padding: 0}}>
            <ListItem className={classes.row} onClick={ this.closeBottomSheet}>
              <ListItemIcon><Close /></ListItemIcon>
              <ListItemText primary={'Cancel'} />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  list:{
    paddingTop: 0,
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]:{
      marginTop: theme.spacing.unit * 7
    }
  },
  alarmRow:{
    borderLeft: theme.spacing.unit*0.5 + 'px solid transparent',
    '&$active':{
      borderColor: '#ff3333'//PXBColors.red['500']
    }
  },
  avatar:{
    color: PXBColors.black['500'],
    background: 'transparent',
    '&$active':{
      color: 'white',
      background: '#ff3333'//PXBColors.red['500']
    }
  },
  alarmText:{
    fontWeight: '600',
    '&$active':{
      color: '#ff3333'//PXBColors.red['500']
    }
  },
  active: {},
  paper:{
    width: '100%',
    maxWidth: 600,
    margin: 'auto',
    userSelect: 'none',
    cursor: 'pointer'
  },
  row:{
    width: '100%',
    '&:hover':{
      backgroundColor: PXBColors.gray['50']
    }
  },
  footerList: {
    flexGrow: 1,
    padding: '15px',
    borderBottom: '1px solid #ccc'
  },
  col: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    '&:hover':{
      backgroundColor: PXBColors.gray['50']
    }
  },
})

export default withStyles(styles)(AlarmList);
