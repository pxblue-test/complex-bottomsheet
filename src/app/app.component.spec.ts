import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

        TestBed.configureTestingModule({
            imports: [AppModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should call showBottomSheet() when clicking the top right icon', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        const showBottomSheetSpy = spyOn(app, 'showBottomSheet').and.stub();
        const buttonElt = fixture.nativeElement.querySelector('.toolbar-button');
        buttonElt.click();
        expect(showBottomSheetSpy).toHaveBeenCalled();
    });

    it('should display the bottom sheet when clicking the top right icon', (done) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.showBottomSheet()
            .afterOpened()
            .subscribe(() => {
                const bottomSheet = document.getElementsByClassName('bottomPanel')[0];
                expect(bottomSheet).toBeTruthy();
                done();
            });
    });

    it('should render menu items in the bottom sheet', (done) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.showBottomSheet()
            .afterOpened()
            .subscribe(() => {
                const menuItem = document.getElementById('bottom-panel-item-1');
                expect(menuItem).toBeTruthy();
                const menuItem2 = document.getElementById('bottom-panel-item-2');
                expect(menuItem2).toBeTruthy();
                done();
            });
    });

    it('should cancel the bottom sheet when clicking on the overlay', (done) => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        const bottomSheetRef = app.showBottomSheet();
        bottomSheetRef.afterDismissed().subscribe(() => {
            const bottomSheet = document.getElementsByClassName('bottomPanel')[0];
            expect(bottomSheet).toBeFalsy();
            done();
        });
        const overlayClass = 'cdk-overlay-backdrop';
        const overlay = document.getElementsByClassName(overlayClass)[0] as HTMLElement;
        overlay.click();
    });
});
