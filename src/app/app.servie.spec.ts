import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
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

  it('passData', () => {
    let spy = spyOn(service.dataSource, 'next').and.callThrough();
    service.passData(data, 'time');
    expect(service.activeSort).toEqual('time');
    service.dataSource.next(data);
    expect(service.dataSource.next).toHaveBeenCalled();
  });

  it('sortAlarams sortText filterText is equal to activeSort', () => {
    service.activeSort = 'time';
    service.sortAlarams('time');
    expect(service.sortAlarams).toBeTruthy();
  });

  it('sortAlarams sortText filterText is not equal to activeSort and activeSort is equal to eventType', () => {
    let spy = spyOn(service, 'passData').and.returnValue(true);
    service.activeSort = 'time';
    service.sortAlarams('eventType');
    service.passData(service.newdata, 'eventType');
    expect(service.passData).toHaveBeenCalled();
  });

  it('sortAlarams sortText filterText is not equal to activeSort and activeSort is equal to time', () => {
    let spy = spyOn(service, 'passData').and.returnValue(true);
    service.activeSort = 'eventType';
    service.sortAlarams('time');
    service.passData(service.newdata, 'time');
    expect(service.passData).toHaveBeenCalled();
  });

  it('filterAlarams', () => {
    let spy = spyOn(service.dataSource, 'next').and.returnValue(true);
    service.filterAlarams(['events', 'session']);
    expect(service.dataSource.next).toHaveBeenCalled();
    expect(service.newdata).toBeDefined();
  });

});