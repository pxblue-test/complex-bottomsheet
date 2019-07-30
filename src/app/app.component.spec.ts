import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatBottomSheetModule,
  MatBottomSheet
} from '@angular/material';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let bottomSheetRef: MatBottomSheet;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatBottomSheetModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AppService]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });

    bottomSheetRef = TestBed.get(MatBottomSheet);

  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('opens the bottomsheet correctly', async(() => {
    let spy = spyOn(bottomSheetRef, 'open').and.returnValue(true);
    app.showBottomSheet();
    expect(bottomSheetRef.open).toHaveBeenCalled();
    expect(bottomSheetRef.open).toBeTruthy();
  }));

});