import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltersList } from './filter';


@Injectable()

export class AppService {

  data: any[] = [];
  activeFilter = 'events';
  public newdata;

  public dataSource = new BehaviorSubject(this.data);
  list = this.dataSource.asObservable();

  public NOW = Date.now();
  public LOCATIONS = ['Dos Valley Field', 'Jameson Field', 'Parker Field West', 'Parker Field East', 'North Park Garden'];
  public DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
  public DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.data.push(this.getRandomData());
    }
  }

  getRandomData() {
    const date = Math.round(this.NOW - Math.random() * 1000000);
    return {
      date: Math.round(this.NOW - Math.random() * 1000000000),
      active: Math.random() < .3,
      location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
      device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
      details: this.DETAILS[Math.floor(Math.random() * this.DETAILS.length)]
    }
  }

  resetFilter() {
    this.activeFilter = null;
    this.dataSource.next(this.data);
  }

  passData(data, filterText) {
    this.dataSource.next(data);
    this.activeFilter = filterText;
  }

  filterAlarams(filterText) {
    if (this.activeFilter == filterText) {
      this.resetFilter();
    } else {
      switch (filterText) {
        case FiltersList.ACTIVE_ALARAMS:
          this.newdata = this.data.filter((item) => item.active);
          this.passData(this.newdata, filterText);
          break;
        case FiltersList.ALARAMS:
          this.newdata = this.data.filter((item) => !item.active);
          this.passData(this.newdata, filterText);
          break;
        case FiltersList.TIME:
          this.newdata = [...this.data].sort((a, b) => a.date - b.date);
          this.passData(this.newdata, filterText);
          break;
        case FiltersList.EVENTS:
          this.resetFilter();
          this.activeFilter = filterText;
          break;
        case FiltersList.EVENT_TYPE:
          this.newdata = [...this.data].sort((a, b) => {
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
      }
    }
  }

}