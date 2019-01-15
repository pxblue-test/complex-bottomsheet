import { Component, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material';
import { AppService } from '../app.service';
import { FiltersList } from '../filter';

@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.html',
  styleUrls: ['./bottom-sheet.scss'],
  encapsulation: ViewEncapsulation.None
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
    this.appService.sortAlarms(this.activeSort);
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
    this.appService.filterAlarms(this.activefilters);
  }

  sortData(sortText){
    this.activeSort = sortText;
    this.appService.sortAlarms(sortText);
  }

  checkActive(filter){
    return this.activefilters.indexOf(filter) > -1;
  }
}
