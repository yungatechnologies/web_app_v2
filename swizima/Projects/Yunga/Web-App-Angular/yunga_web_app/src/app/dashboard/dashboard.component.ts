import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'angular-highcharts';
import { CommonsService } from '../commons/commons.service';
import { DeviceDto, DeviceStatusDto, DoorBellDto } from '../devices/devices.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  longText: string = 'Testing dashboard';

  chart1!: Chart;

  chart2!: Chart;

  public innerWidth: any;

  value = 'Clear me';

  installedDevices!: number;
  testingDevices!: number

  onlineDevices!: number;
  offlineDevices!: number;
  onlineTestingDevices!: number

  armedDevices!: number;
  fullArmedDevices!: number;
  halfArmedDevices!: number;


  installedDevicesArray: DeviceDto[] = [];
  onlineDevicesArray: DeviceDto[] = [];
  offlineDevicesArray: DeviceDto[] = [];
  testingDevicesArray: DeviceDto[] = [];

  armedDevicesArray: DeviceStatusDto[] = [];
  halfArmedDevicesArray: DeviceStatusDto[] = [];
  fullArmedDevicesArray: DeviceStatusDto[] = [];

  triggeredDoorBells:DoorBellDto[]=[];


  constructor(
    private breakpointObserver: BreakpointObserver,
    private commonsService: CommonsService,
    private route: ActivatedRoute, private router: Router,
    private dashboardService: DashboardService

  ) { }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );



  ngOnInit(): void {


    this.getDeviceStatistics();

    this.getDeviceStatus();

    this.defaultDoorbell();

    this.innerWidth = window.innerWidth;
    let columnChartColors1 = ['#00A4EF', '#b1f160', '#FFC300'];
    let columnChartColors2 = ['#FF9209', '#b1f160', '#FFC300'];

    this.chart1 = this.initFeatureUsageColumnChart("System Feature Usage", columnChartColors1)

    this.chart2 = this.initCustomerOnboardingColumnChart("Customer Onboarding Trends (2023)", columnChartColors2)


  }

  initCustomerOnboardingColumnChart(title: string, colors: string[]) {
    return new Chart(
      {
        chart: {
          type: 'column',
          width: (this.innerWidth * 0.4),
        },

        title: {
          text: title,
          align: 'center'
        },
        colors: colors,
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            cursor: 'pointer',
            showInLegend: true
          }
        },
        legend: {
          accessibility: {
            enabled: true
          },
          align: 'center',
          enabled: true
        },
        xAxis: {

          title: {
            text: 'Months'
          },
          categories: [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of Customers'
          }
        },
        series: [

          {
            name: 'Male',
            type: 'column',
            data: [20, 30, 25, 50, 42, 84, 105, 104, 91, 83, 106, 0]

          }

        ],
      });
  }




  initFeatureUsageColumnChart(title: string, colors: string[]) {
    return new Chart(
      {
        chart: {
          type: 'column',
          width: (this.innerWidth * 0.4),
        },

        title: {
          text: title,
          align: 'center'
        },
        colors: colors,
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
            cursor: 'pointer',
            showInLegend: true
          }
        },
        legend: {
          accessibility: {
            enabled: true
          },
          align: 'center',
          enabled: true
        },
        xAxis: {

          title: {
            text: 'System Features'
          },
          categories: [
            'Door Bell',
            'Panic Button',
            'Community Button',
            'Motion Trigers',
            'Alarm',
            'Half Arm',
            'Full Arm'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Number of Teachers'
          }
        },
        series: [

          {
            name: 'Feature',
            type: 'column',
            data: [20, 30, 25, 60, 37, 90, 45]

          }
        ],
      });
  }



  getDeviceStatistics() {

    this.commonsService.getDocuments('devices')
      .pipe(map(data => data as DeviceDto[]))
      .subscribe({
        next: response => {

          let devices: DeviceDto[] = response;
          //INSTALLED


          this.installedDevicesArray = devices.filter(d => d.status === 'INSTALLED');
          this.onlineDevicesArray = devices.filter(d => d.online && d.status === 'INSTALLED');
          this.offlineDevicesArray = devices.filter(d => !d.online && d.status === 'INSTALLED');
          this.testingDevicesArray = devices.filter(d => d.online && d.status !== 'INSTALLED');

          this.installedDevices = this.installedDevicesArray.length;
          this.testingDevices = (devices.length - this.installedDevices);

          this.onlineDevices = this.onlineDevicesArray.length;
          this.offlineDevices = this.offlineDevicesArray.length;

          this.onlineTestingDevices = this.testingDevicesArray.length;


        },
        error: error => console.log('ERROR ', error)
      });

  }

  getDeviceStatus() {

    this.commonsService.getDocuments('deviceStatus')
      .pipe(map(data => data as DeviceStatusDto[]))
      .subscribe({
        next: response => {

          let deviceStatus: DeviceStatusDto[] = response;
          //INSTALLED


          this.armedDevicesArray = deviceStatus.filter(d => d.armed != 0);
          this.halfArmedDevicesArray = deviceStatus.filter(d => d.armed === 1);
          this.fullArmedDevicesArray = deviceStatus.filter(d => d.armed === 2);

          let onlineDevicesArray: DeviceStatusDto[] = deviceStatus.filter(d => d.armed === 2);

          this.armedDevices = this.armedDevicesArray.length;
          this.halfArmedDevices = this.halfArmedDevicesArray.length;
          this.fullArmedDevices = this.fullArmedDevicesArray.length;


        },
        error: error => console.log('ERROR ', error)
      });

  }


  loadInstalledDevices() {
    this.dashboardService.onlineDevicesSubject.next(this.installedDevicesArray);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  loadOnlineDevices() {
    this.dashboardService.onlineDevicesSubject.next(this.onlineDevicesArray);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  loadOfflineDevices() {
    this.dashboardService.onlineDevicesSubject.next(this.offlineDevicesArray);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  loadTestingDevices() {
    this.dashboardService.onlineDevicesSubject.next(this.testingDevicesArray);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }



  loadArmedDevices() {

    let armedDevices: DeviceDto[] = [];

    this.installedDevicesArray.forEach(element => {
      if (this.deviceExists(this.armedDevicesArray, element.deviceNumber)) {
        armedDevices.push(element);
      }
    });


    this.dashboardService.onlineDevicesSubject.next(armedDevices);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  loadHalfArmedDevices() {

    let halfArmedDevices: DeviceDto[] = [];

    this.installedDevicesArray.forEach(element => {
      if (this.deviceExists(this.halfArmedDevicesArray, element.deviceNumber)) {
        halfArmedDevices.push(element);
      }
    });

    this.dashboardService.onlineDevicesSubject.next(halfArmedDevices);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  loadFullArmedDevices() {

    let fullArmedDevices: DeviceDto[] = [];

    this.installedDevicesArray.forEach(element => {
      if (this.deviceExists(this.fullArmedDevicesArray, element.deviceNumber)) {
        fullArmedDevices.push(element);
      }
    });

    this.dashboardService.onlineDevicesSubject.next(fullArmedDevices);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  loaddDisArmedDevices() {

    let disarmTimermedDevices: DeviceDto[] = [];

    this.installedDevicesArray.forEach(element => {
      if (!this.deviceExists(this.armedDevicesArray, element.deviceNumber)) {
        disarmTimermedDevices.push(element);
      }
    });

    this.dashboardService.onlineDevicesSubject.next(disarmTimermedDevices);
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

  deviceExists(devicesStatus: DeviceStatusDto[], deviceNumber: string): boolean {
    let size = devicesStatus.filter(status => status.deviceNumber === deviceNumber).length;
    if (size > 0) {
      return true;
    }
    return false;
  }


  alarmInputDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {

    console.log('alarmDateChanged', event.value?.getDate());

    //this.events.push(`${type}: ${event.value}`);
  }

  alarmDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {

    console.log('alarmDateChanged', event.value?.getDate());

    //this.events.push(`${type}: ${event.value}`);
  }

  doorbellDateInputChanged(type: string, event: MatDatepickerInputEvent<Date>) {

    console.log('doorbellDateInputChanged', event.value?.getDate());
  }

  doorbellDateChanged(type: string, event: MatDatepickerInputEvent<Date>) {

    let day = event.value?.getDate();
    let month = event.value!.getMonth();
    let convertedMonth = month + 1;
    let year = event.value?.getFullYear();

    let date: string = year + '-' + convertedMonth + '-' + day;

    console.log('doorbells', date);

    this.commonsService.getDoorBellsByDate('doorbells', date).pipe(map(data => data as DoorBellDto[]))
      .subscribe({
        next: response => {

          this.triggeredDoorBells=response;
          //console.log(response);
          this.triggeredDoorBells.forEach(element => {
            console.log(element.deviceNumber, element.date.toDate());

            
          });
        },
        error: error => {

          console.log(error);
        }

      });
  }


  defaultDoorbell() {

    let today=new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let convertedMonth = month + 1;
    let year = today.getFullYear();

    let date: string = year + '-' + convertedMonth + '-' + day;

    console.log('doorbells', date);

    this.commonsService.getDoorBellsByDate('doorbells', date).pipe(map(data => data as DoorBellDto[]))
      .subscribe({
        next: response => {

          this.triggeredDoorBells=response;
          //console.log(response);
          this.triggeredDoorBells.forEach(element => {
            console.log(element.deviceNumber, element.date.toDate());

            
          });
        },
        error: error => {

          console.log(error);
        }

      });
  }

}
