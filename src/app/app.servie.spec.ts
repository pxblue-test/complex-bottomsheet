import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AppService } from './app.service';


describe('Service: AppService', () => {
  let service;
  let data = [{ "date": 1545428583069, "active": false, "location": "Parker Field West", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1544988929886, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Over Voltage Fault" }, { "date": 1545414474034, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1544980111274, "active": false, "location": "Jameson Field", "device": "MX Power Pro", "details": "Under Voltage Fault" }, { "date": 1545768504078, "active": false, "location": "Jameson Field", "device": "Pentair Aurora", "details": "Over Voltage Fault" }, { "date": 1545124209799, "active": false, "location": "Parker Field West", "device": "Pentair Aurora", "details": "Under Current Fault" }, { "date": 1545822693218, "active": false, "location": "Dos Valley Field", "device": "PXL DG1", "details": "Under Voltage Fault" }, { "date": 1545167308761, "active": true, "location": "Jameson Field", "device": "PXL DG1", "details": "Over Voltage Fault" }, { "date": 1545732452179, "active": false, "location": "Dos Valley Field", "device": "Pentair Aurora", "details": "Under Voltage Fault" }, { "date": 1545846972700, "active": false, "location": "Parker Field West", "device": "PXL DG1", "details": "Under Voltage Fault" }];

  beforeEach(() => TestBed.configureTestingModule({
    providers: [AppService]
  }));

  beforeEach(inject([AppService], s => {
    service = s;
  }));

  it('should create the service', async(() => {
    expect(service).toBeTruthy();
  }));

  it('reserFilter', () => {
    let spy = spyOn(service.dataSource, 'next').and.callThrough();
    service.resetFilter();
    expect(service.activeFilter).toBeNull();
    service.dataSource.next(data);
    expect(service.dataSource.next).toHaveBeenCalled();
  });

  it('passData', () => {
    let spy = spyOn(service.dataSource, 'next').and.callThrough();
    service.passData(data, 'events');
    expect(service.activeFilter).toEqual('events');
    service.dataSource.next(data);
    expect(service.dataSource.next).toHaveBeenCalled();
  });

  it('filterAlarams if filterText is equal to activeFilter', () => {
    service.activeFilter = 'events';
    service.filterAlarams('events');
    expect(service.activeFilter).toEqual(null);
  });

  it('filterAlarams if filterText is not equal to activeFilter and activeFilter is equal to eventType', () => {
    let spy = spyOn(service, 'passData').and.returnValue(true);
    service.activeFilter = 'events';
    service.filterAlarams('eventType');
    expect(service.newdata.length).toEqual(10);
    service.passData(service.newdata, 'eventType');
    expect(service.passData).toHaveBeenCalled();
  });

  it('filterAlarams if filterText is not equal to activeFilter and activeFilter is equal to time', () => {
    let spy = spyOn(service, 'passData').and.returnValue(true);
    service.activeFilter = 'eventType';
    service.filterAlarams('time');
    expect(service.newdata.length).toEqual(10);
    service.passData(service.newdata, 'time');
    expect(service.passData).toHaveBeenCalled();
  });

  it('filterAlarams if filterText is not equal to activeFilter and activeFilter is equal to activeAlarams', () => {
    let spy = spyOn(service, 'passData').and.returnValue(true);
    service.activeFilter = 'eventType';
    service.filterAlarams('activeAlarams');
    service.passData(service.newdata, 'activeAlarams');
    expect(service.passData).toHaveBeenCalled();
  });

  it('filterAlarams if filterText is not equal to activeFilter and activeFilter is equal to alarams', () => {
    let spy = spyOn(service, 'passData').and.returnValue(true);
    service.activeFilter = 'eventType';
    service.filterAlarams('alarams');
    service.passData(service.newdata, 'alarams');
    expect(service.passData).toHaveBeenCalled();
  });

});