import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/material/core';
import { BottomSheet } from './bottomsheet/bottom-sheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AppService } from './app.service';

@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet, private appService:AppService) {

  }
  version = VERSION;
  data: any[] = [];


  ngOnInit(): void {
    this.appService.list.subscribe((list) => this.data = list);
  }

  showBottomSheet(): void {
    this.bottomSheet.open(BottomSheet, {restoreFocus: false, panelClass: 'bottomPanel'});
  }
} 
