import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltersList } from './filter';

type alarmDataObject = {
    date: number;
    type: string;
    active: boolean;
    location: string;
    device: string;
    details: string;
};

@Injectable({
    providedIn: 'root',
})
export class DataService {
    dataList: alarmDataObject[] = [];
    activeFilters = ['settings', 'activeAlarms', 'alarms', 'session'];
    activeSort = FiltersList.TIME;

    private readonly dataSource = new BehaviorSubject(this.dataList);
    list = this.dataSource.asObservable();

    public NOW = Date.now();
    public TYPES = ['alarms', 'settings', 'session'];
    public LOCATIONS = [
        'Dos Valley Field',
        'Jameson Field',
        'Parker Field West',
        'Parker Field East',
        'North Park Garden',
    ];
    public DEVICES = ['MX Power Pro', 'PXL DG1', 'Pentair Aurora'];
    public DETAILS = ['Over Voltage Fault', 'Over Current Fault', 'Under Voltage Fault', 'Under Current Fault'];

    constructor() {
        for (let i = 1; i <= 20; i++) {
            this.dataList.push(this.getRandomData());
        }
        this.dataList.sort((a, b) => b.date - a.date);
    }

    getRandomData(): alarmDataObject {
        const date = Math.round(this.NOW - Math.random() * 1000000000);
        const type = this.TYPES[Math.floor(Math.random() * this.TYPES.length)];
        switch (type) {
            case 'alarms':
                return {
                    date: date,
                    type: type,
                    active: Math.random() < 0.3,
                    location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
                    device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
                    details: this.DETAILS[Math.floor(Math.random() * this.DETAILS.length)],
                };
            case 'settings':
                return {
                    date: date,
                    type: type,
                    active: false,
                    location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
                    device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
                    details: 'Settings changed',
                };
            case 'session':
                return {
                    date: date,
                    type: type,
                    active: false,
                    location: this.LOCATIONS[Math.floor(Math.random() * this.LOCATIONS.length)],
                    device: this.DEVICES[Math.floor(Math.random() * this.DEVICES.length)],
                    details: 'Run Session',
                };
            default:
                return null;
        }
    }

    passData(): void {
        this.dataSource.next(this.sortAlarms(this.filterAlarms(this.dataList)));
    }

    updateSort(sortType): void {
        this.activeSort = sortType;
        this.passData();
    }
    updateFilters(filterList): void {
        this.activeFilters = filterList;
        this.passData();
    }

    sortAlarms(data): alarmDataObject[] {
        switch (this.activeSort) {
            case FiltersList.EVENT_TYPE:
                return data.sort((a, b) => {
                    // primary sort by type
                    if (a.type < b.type) {
                        return -1;
                    } else if (a.type > b.type) {
                        return 1;
                    }
                    // secondary sort by alarm active and/or date
                    if (a.type !== 'alarms') {
                        return b.date - a.date;
                    }
                    if (a.active && !b.active) {
                        return -1;
                    } else if (b.active && !a.active) {
                        return 1;
                    }
                    return b.date - a.date;
                });
            case FiltersList.TIME:
                return data.sort((a, b) => b.date - a.date);
            default:
                return data.sort((a, b) => b.date - a.date);
        }
    }

    filterAlarms(data): alarmDataObject[] {
        return data.filter(item => {
            if (item.type === 'alarms' && !item.active) {
                return this.activeFilters.includes('alarms') ? true : false;
            } else if (item.type === 'alarms' && item.active) {
                return this.activeFilters.includes('activeAlarms') ? true : false;
            }
            return this.activeFilters.includes(item.type);
        });
    }
}
