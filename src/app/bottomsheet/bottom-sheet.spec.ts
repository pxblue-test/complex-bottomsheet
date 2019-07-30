import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BottomSheet } from './bottom-sheet';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
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
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatBottomSheetModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AppService, {
        provide: MatBottomSheetRef, useValue: {
          dismiss: (dialogResult: any) => { }
        }
      }]
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

  it('updating filters should work', async(() => {
    let spy = spyOn(appService, 'updateFilters').and.returnValue(null);
    app.activefilters = [];
    app.filterData('XX');
    app.filterData('YY');
    expect(appService.updateFilters).toHaveBeenCalled();
    expect(app.activefilters).toContain('XX');
    expect(app.activefilters).toContain('YY');
    app.filterData('XX');
    expect(appService.updateFilters).toHaveBeenCalled();
    expect(app.activefilters).toContain('YY');
    expect(app.activefilters).not.toContain('XX');
  }));

  it('updating sort should work', async(() => {
    let spy = spyOn(appService, 'updateSort').and.returnValue(null);
    app.activeSort = 'X';
    app.sortData('Y');
    expect(app.activeSort).toBe('Y');
    expect(appService.updateSort).toHaveBeenCalled();
  }));

  it('check active should work', async(() => {
    app.activefilters = [];
    expect(app.checkActive('XX')).toBeFalsy();
    app.filterData('XX');
    expect(app.checkActive('XX')).toBeTruthy();
  }));

  it('closes bottomsheet correctly', async(() => {
    let spy = spyOn(bottomSheetRef, 'dismiss').and.returnValue(true);
    app.openLink();
    expect(bottomSheetRef.dismiss).toHaveBeenCalled();
    expect(bottomSheetRef.dismiss).toBeTruthy();
  }));
});