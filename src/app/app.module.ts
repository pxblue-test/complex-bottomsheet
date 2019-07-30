import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {BottomSheet} from './bottomsheet/bottom-sheet';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import {AppComponent} from './app.component';
import { AppService } from './app.service';

@NgModule({
  exports: [
    // CDK
    ObserversModule,
    OverlayModule,
    
    // Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatBottomSheetModule,
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
    entryComponents: [BottomSheet],
  declarations: [AppComponent,BottomSheet ],
  bootstrap: [AppComponent],
  providers: [ AppService ]
})
export class AppModule {}
