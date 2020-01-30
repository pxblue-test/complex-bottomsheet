import { Component, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DataService } from '../data.service';
import { FiltersList } from '../filter';

type filterDataObject = {
    ACTIVE_ALARMS: string;
    ALARMS: string;
    TIME: string;
    SETTINGS: string;
    EVENT_TYPE: string;
    SESSION: string;
};

@Component({
    selector: 'bottom-sheet',
    templateUrl: './bottomsheet.component.html',
    styleUrls: ['./bottomsheet.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BottomsheetComponent {
    activefilters: string[];
    filterTypes: filterDataObject;
    activeSort: string;

    constructor(
        private readonly bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>,
        private readonly dataService: DataService
    ) {}

    ngOnInit(): void {
        this.activefilters = this.dataService.activeFilters;
        this.activeSort = this.dataService.activeSort;
        this.filterTypes = FiltersList;
    }

    // this is the placeholder for actual functionality
    openLink(): void {
        this.bottomSheetRef.dismiss();
    }

    filterData(filter: string): void {
        const index = this.activefilters.indexOf(filter);
        if (index > -1) {
            this.activefilters.splice(index, 1);
        } else {
            this.activefilters.push(filter);
        }
        this.dataService.updateFilters(this.activefilters);
    }

    sortData(sortText: string): void {
        this.activeSort = sortText;
        this.dataService.updateSort(sortText);
    }

    checkActive(filter: string): boolean {
        return this.activefilters.includes(filter);
    }
}
