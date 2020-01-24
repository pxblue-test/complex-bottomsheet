import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './data.service';
import * as Colors from '@pxblue/colors';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    data = [];
    Colors = Colors;

    constructor(
        private readonly bottomSheet: MatBottomSheet,
        private readonly platform: Platform,
        private readonly splashScreen: SplashScreen,
        private readonly statusBar: StatusBar,
        private readonly dataService: DataService
    ) {
        this.initializeApp();
    }

    ngOnInit(): void {
        this.dataService.list.subscribe(list => (this.data = list));
    }

    initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    showBottomSheet(): MatBottomSheetRef {
        return this.bottomSheet.open(BottomsheetComponent, { restoreFocus: false, panelClass: 'bottomPanel' });
    }
}
