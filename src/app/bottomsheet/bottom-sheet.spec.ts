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

  it('filterData', async(() => {
    let spy = spyOn(appService, 'filterAlarams').and.returnValue(null);
    app.filterData('events'); 
    expect(appService.filterAlarams).toHaveBeenCalled();
  }));

});