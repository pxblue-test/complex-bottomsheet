import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BottomSheet } from './bottom-sheet';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatBottomSheetRef
} from '@angular/material';
import { AppService } from '../app.service';

describe('BottomSheet', () => {
  let app: BottomSheet;
  let fixture: ComponentFixture<BottomSheet>;
  let bottomSheetRef: MatBottomSheetRef;
  let appService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BottomSheet
      ],
      imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatBottomSheetModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AppService, {provide: MatBottomSheetRef, useValue: {
        dismiss: (dialogResult: any) => { }
      }}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(BottomSheet);
      app = fixture.debugElement.componentInstance;
    });

    bottomSheetRef = TestBed.get(MatBottomSheetRef);
    appService = TestBed.get(AppService);

  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('openLink', async(() => {
    let spy = spyOn(bottomSheetRef, 'dismiss').and.returnValue(true);
    app.openLink(); 
    expect(bottomSheetRef.dismiss).toHaveBeenCalled();
    expect(bottomSheetRef.dismiss).toBeTruthy();
  }));

  it('filterData if active filters has the passed item', async(() => {
    let spy = spyOn(appService, 'filterAlarms').and.returnValue(null);
    app.activefilters = ['events', 'time', 'session'];
    app.filterData('events'); 
    expect(appService.filterAlarms).toHaveBeenCalled();
    expect(app.activefilters).toEqual(['time', 'session']);
    expect(app.activefilters.length).toEqual(2);
  }));

  it('filterData if active filters not having the passed item', async(() => {
    let spy = spyOn(appService, 'filterAlarms').and.returnValue(null);
    app.activefilters = ['time', 'session'];
    app.filterData('events'); 
    expect(appService.filterAlarms).toHaveBeenCalled();
    expect(app.activefilters).toEqual(['time', 'session', 'events']);
    expect(app.activefilters.length).toEqual(3);
  }));

  it('sortData', async(() => {
    let spy = spyOn(appService, 'sortAlarms').and.returnValue(null);
    app.sortData('time'); 
    expect(appService.sortAlarms).toHaveBeenCalled();
    expect(app.activeSort).toEqual('time');
  }));

  it('checkActive if active filters has the passed item', async(() => {
    app.activefilters = ['events', 'time', 'session'];
    expect(app.checkActive('time')).toBeTruthy();
  }));

  it('checkActive if active filters not having the passed item', async(() => {
    app.activefilters = ['events', 'session'];
    expect(app.checkActive('time')).toBeFalsy();
  }));
});