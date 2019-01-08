import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltersList } from './filter';


@Injectable()

export class AppService {

  data: any[] = [];
  activeFilters = ['settings', 'activeAlarms', 'alarms', 'session'];
  public newdata = this.data;
  activeSort;

  private dataSource = new BehaviorSubject(this.data);
  list = this.dataSource.asObservable();

  public NOW = Date.now();
  public TYPES = ['alarms', 'settings', 'session'];
  public LOCATIONS = ['Dos Valley Field', 'Jameson Field', 'Parker Field West', 'Parker Field East', 'North Park Garden'];
  public DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
  public DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.data.push(this.getRandomData());
    }
    this.sortAlarms(FiltersList.TIME);
  }

  getRandomData() {
    const date = Math.round(this.NOW - Math.random() * 1000000);
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


  passData(data, filterText) {
    this.dataSource.next(data);
    this.activeSort = filterText;
  }

  sortAlarms(sortText) {
    if (sortText == this.activeSort) {
      return;
    }
    switch (sortText) {
      case FiltersList.EVENT_TYPE:
        this.newdata = [...this.newdata].sort((a, b) => {
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
        this.passData(this.newdata, sortText);
        break;
      case FiltersList.TIME:
        this.newdata = [...this.newdata].sort((a, b) => b.date - a.date);
        this.passData(this.newdata, sortText);
        break;
    }
  }

  filterAlarms(filterArray) {
    let filterdata = [...this.newdata].filter((item) => {
      if (item.type == 'alarms' && !item.active) {
        return (filterArray.indexOf('alarms') > -1) ? true : false;
      } else if (item.type == 'alarms' && item.active) {
        return (filterArray.indexOf('activeAlarms') > -1) ? true : false;
      } else {
        return filterArray.indexOf(item.type) > -1;
      }
    });
    this.dataSource.next(filterdata);
  }

} 