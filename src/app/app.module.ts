import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BottomsheetComponent } from './bottomsheet/bottomsheet.component';
import { Overlay } from '@angular/cdk/overlay';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatBottomSheetModule,
  ]
})
export class MaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    BottomsheetComponent
  ],
  entryComponents: [
    BottomsheetComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    ScrollingModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Overlay
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
