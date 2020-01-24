import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { DataService } from './data.service';
import { FiltersList } from './filter';

describe('Service: DataService', () => {
    let service;
    let data = [
        {
            date: 1545428583069,
            active: false,
            location: 'Parker Field West',
            device: 'MX Power Pro',
            details: 'Over Voltage Fault',
        },
        {
            date: 1544988929886,
            active: false,
            location: 'Jameson Field',
            device: 'MX Power Pro',
            details: 'Over Voltage Fault',
        },
        {
            date: 1545414474034,
            active: false,
            location: 'Parker Field West',
            device: 'PXL DG1',
            details: 'Over Voltage Fault',
        },
        {
            date: 1544980111274,
            active: false,
            location: 'Jameson Field',
            device: 'MX Power Pro',
            details: 'Under Voltage Fault',
        },
        {
            date: 1545768504078,
            active: false,
            location: 'Jameson Field',
            device: 'Pentair Aurora',
            details: 'Over Voltage Fault',
        },
        {
            date: 1545124209799,
            active: false,
            location: 'Parker Field West',
            device: 'Pentair Aurora',
            details: 'Under Current Fault',
        },
        {
            date: 1545822693218,
            active: false,
            location: 'Dos Valley Field',
            device: 'PXL DG1',
            details: 'Under Voltage Fault',
        },
        {
            date: 1545167308761,
            active: true,
            location: 'Jameson Field',
            device: 'PXL DG1',
            details: 'Over Voltage Fault',
        },
        {
            date: 1545732452179,
            active: false,
            location: 'Dos Valley Field',
            device: 'Pentair Aurora',
            details: 'Under Voltage Fault',
        },
        {
            date: 1545846972700,
            active: false,
            location: 'Parker Field West',
            device: 'PXL DG1',
            details: 'Under Voltage Fault',
        },
    ];

    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [DataService],
        })
    );

    beforeEach(inject([DataService], s => {
        service = s;
    }));

    it('should create the service', async(() => {
        expect(service).toBeTruthy();
    }));

    it('updateSort works', () => {
        service.updateSort(FiltersList.EVENT_TYPE);
        expect(service.activeSort).toBe(FiltersList.EVENT_TYPE);
    });

    it('updateFilters works', () => {
        service.updateFilters([FiltersList.ACTIVE_ALARMS]);
        expect(service.activeFilters).toEqual([FiltersList.ACTIVE_ALARMS]);
        service.updateFilters([FiltersList.ACTIVE_ALARMS, FiltersList.ALARMS]);
        expect(service.activeFilters).toEqual([FiltersList.ACTIVE_ALARMS, FiltersList.ALARMS]);
        service.updateFilters([]);
        expect(service.activeFilters).toEqual([]);
    });

    it('sort works', () => {
        const sampleData = [
            { date: 1, type: 'C' },
            { date: 3, type: 'B' },
            { date: 2, type: 'A' },
        ];
        const sampleData_byTime = [
            { date: 3, type: 'B' },
            { date: 2, type: 'A' },
            { date: 1, type: 'C' },
        ];
        const sampleData_byType = [
            { date: 2, type: 'A' },
            { date: 3, type: 'B' },
            { date: 1, type: 'C' },
        ];
        service.updateSort(FiltersList.TIME);
        expect(service.sortAlarms(sampleData)).toEqual(sampleData_byTime);
        service.updateSort(FiltersList.EVENT_TYPE);
        expect(service.sortAlarms(sampleData)).toEqual(sampleData_byType);
    });

    it('filter works', () => {
        const sampleData = [
            { date: 1, type: 'C' },
            { date: 3, type: 'B' },
            { date: 2, type: 'A' },
        ];
        service.updateFilters('A');
        expect(service.filterAlarms(sampleData)).toEqual([{ date: 2, type: 'A' }]);
        service.updateFilters(['B', 'C']);
        expect(service.filterAlarms(sampleData)).toEqual([
            { date: 1, type: 'C' },
            { date: 3, type: 'B' },
        ]);
    });
});
