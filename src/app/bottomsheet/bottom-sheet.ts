import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { AppService } from '../app.service';
import { FiltersList } from '../filter';

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.html',
  styleUrls: [],
})
export class BottomSheet {

  activefilters;
  filterTypes:any;
  activeSort;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>, private appService:AppService) {}

  ngOnInit(){
    this.activefilters = this.appService.activeFilters;
    this.filterTypes = FiltersList;
    this.activeSort = this.appService.activeSort;
    this.appService.sortAlarams(this.activeSort);
    console.log(this.activefilters)
  }

  openLink(): void {
    this.bottomSheetRef.dismiss(); 
  } 

  filterData(filter){
    const index = this.activefilters.indexOf(filter);
    if(index > -1){
      this.activefilters.splice(index,1)
    }else{
      this.activefilters.push(filter);
    }
    this.appService.filterAlarams(this.activefilters);
  }

  sortData(sortText){
    this.activeSort = sortText;
    this.appService.sortAlarams(sortText);
  }

  checkActive(filter){
    return this.activefilters.indexOf(filter) > -1;
  }
}
