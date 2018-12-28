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

  activefilter:any=FiltersList;

  filterTypes:any;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheet>, private appService:AppService) {}

  ngOnInit(){
    this.activefilter = this.appService.activeFilter;
    this.filterTypes = FiltersList;
  }

  openLink(): void {
    this.bottomSheetRef.dismiss(); 
  }

  filterData(filter){
    this.appService.filterAlarams(filter);
    this.openLink(); 
  }
}
