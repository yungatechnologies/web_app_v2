import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Chart } from 'angular-highcharts';
import { CommonsService } from '../commons/commons.service';
import { DeviceDto, DeviceStatusDto } from '../devices/devices.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

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


  constructor(
    private breakpointObserver: BreakpointObserver,
    private commonsService: CommonsService,
    private route: ActivatedRoute, private router: Router,
    private dashboardService: DashboardService

  ) { }

  loadOnlineDevices() {
    this.router.navigate(['device_list'], { relativeTo: this.route });
  }

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
          let installedDevicesArray: DeviceDto[] = devices.filter(d => d.status === 'INSTALLED');

          let onlineDevicesArray: DeviceDto[] = devices.filter(d => d.online && d.status === 'INSTALLED');
          let offlineDevicesArray: DeviceDto[] = devices.filter(d => !d.online && d.status === 'INSTALLED');

          let onlineTestingDevicesArray: DeviceDto[] = devices.filter(d => d.online && d.status !== 'INSTALLED');

          this.installedDevices = installedDevicesArray.length;
          this.testingDevices = (devices.length - this.installedDevices);

          this.onlineDevices = onlineDevicesArray.length;
          this.offlineDevices = offlineDevicesArray.length;

          this.onlineTestingDevices = onlineTestingDevicesArray.length;

          this.dashboardService.onlineDevicesSubject.next(installedDevicesArray);

          console.log('===================installedDevicesArray===================:: ' + installedDevicesArray.length);

          this.dashboardService.onlineDevicesSubject.subscribe(
            {
              next: response => {
                console.log('===================onlineDevicesSubject===================:: ' + response.length);
              }
            }
          );



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
          let armedDevicesArray: DeviceStatusDto[] = deviceStatus.filter(d => d.armed != 0);
          let halfArmedDevicesArray: DeviceStatusDto[] = deviceStatus.filter(d => d.armed === 1);
          let fullArmedDevicesArray: DeviceStatusDto[] = deviceStatus.filter(d => d.armed === 2);

          let onlineDevicesArray: DeviceStatusDto[] = deviceStatus.filter(d => d.armed === 2);

          this.armedDevices = armedDevicesArray.length;
          this.halfArmedDevices = halfArmedDevicesArray.length;
          this.fullArmedDevices = fullArmedDevicesArray.length;


        },
        error: error => console.log('ERROR ', error)
      });

  }


}
