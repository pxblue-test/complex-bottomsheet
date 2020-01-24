import { TestBed, inject, async } from '@angular/core/testing';
import { DataService } from './data.service';
import { FiltersList } from './filter';

describe('Service: DataService', () => {
    let service;

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
        const sampleDataByTime = [
            { date: 3, type: 'B' },
            { date: 2, type: 'A' },
            { date: 1, type: 'C' },
        ];
        const sampleDataByType = [
            { date: 2, type: 'A' },
            { date: 3, type: 'B' },
            { date: 1, type: 'C' },
        ];
        service.updateSort(FiltersList.TIME);
        expect(service.sortAlarms(sampleData)).toEqual(sampleDataByTime);
        service.updateSort(FiltersList.EVENT_TYPE);
        expect(service.sortAlarms(sampleData)).toEqual(sampleDataByType);
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
