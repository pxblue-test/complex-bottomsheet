import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltersList } from './filter';


@Injectable()

export class AppService {

  fullData: any[] = [];
  activeFilters = ['settings', 'activeAlarms', 'alarms', 'session'];
  activeSort = FiltersList.TIME;

  private dataSource = new BehaviorSubject(this.fullData);
  list = this.dataSource.asObservable();

  public NOW = Date.now();
  public TYPES = ['alarms', 'settings', 'session'];
  public LOCATIONS = ['Dos Valley Field', 'Jameson Field', 'Parker Field West', 'Parker Field East', 'North Park Garden'];
  public DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
  public DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.fullData.push(this.getRandomData());
    }
    this.sortAlarms(this.fullData);
  }

  getRandomData() {
    const type = this.TYPES[Math.floor(Math.random() * this.TYPES.length)];
    switch (type) {
      case 'alarms':
        return {
          date: Math.round(this.NOW - Math.random() * 1000000000),
          type: type,
          active: Math.random() < .3,
          location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
          device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
          details: this.DETAILS[Math.floor(Math.random() * this.DETAILS.length)]
        }
      case 'settings':
        return {
          date: Math.round(this.NOW - Math.random() * 1000000000),
          type: type,
          location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
          device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
          details: 'Settings changed'
        }
      case 'session':
      default:
        return {
          date: Math.round(this.NOW - Math.random() * 1000000000),
          type: type,
          location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
          device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
          details: 'Run Session'
        }
    }
  }


  passData() {
    this.dataSource.next(
      this.sortAlarms(
        this.filterAlarms(this.fullData)
      )
    );
  }

  updateSort(sortType) {
    this.activeSort = sortType;
    this.passData();
  }
  updateFilters(filterList) {
    this.activeFilters = filterList;
    this.passData();
  }

  sortAlarms(data) {
    switch (this.activeSort) {
      case FiltersList.EVENT_TYPE:
        return data.sort((a, b) => {
          // primary sort by type
          if (a.type < b.type) { return -1; }
          else if (a.type > b.type) { return 1; }
          else {
            // secondary sort by alarm active and/or date 
            if (a.type !== 'alarms') { return b.date - a.date; }
            else {
              if (a.active && !b.active) { return -1; }
              else if (b.active && !a.active) { return 1; }
              else { return b.date - a.date }
            }
          }
        });
      case FiltersList.TIME:
        return data.sort((a, b) => b.date - a.date);
    }
  }


  filterAlarms(data) {
    return data.filter((item) => {
      if (item.type == 'alarms' && !item.active) {
        return (this.activeFilters.indexOf('alarms') > -1) ? true : false;
      } else if (item.type == 'alarms' && item.active) {
        return (this.activeFilters.indexOf('activeAlarms') > -1) ? true : false;
      } else {
        return this.activeFilters.indexOf(item.type) > -1;
      }
    });
  }

} 