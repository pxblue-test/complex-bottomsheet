import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DataService } from '../data.service';
import { FiltersList } from '../filter';

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BottomsheetComponent {

  activefilters;
  filterTypes:any;
  activeSort;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>, private dataService:DataService) {}

  ngOnInit(){
    this.activefilters = this.dataService.activeFilters;
    this.activeSort = this.dataService.activeSort;
    this.filterTypes = FiltersList;
  }

// this is the placeholder for actual functionality
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss(); 
  }

  filterData(filter){
    const index = this.activefilters.indexOf(filter);
    if(index > -1){
      this.activefilters.splice(index,1)
    }else{
      this.activefilters.push(filter);
    }
    this.dataService.updateFilters(this.activefilters);
  }

  sortData(sortText){
    this.activeSort = sortText;
    this.dataService.updateSort(sortText);
  }

  checkActive(filter){
    return this.activefilters.indexOf(filter) > -1;
  }

}
