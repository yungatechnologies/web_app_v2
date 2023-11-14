import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  /** Based on the screen size, switch from standard to one column per row */

  longText: string = 'Testing dashboard';

  // chart8!: Chart;

  public innerWidth: any;

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

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit():void {

    this.innerWidth = window.innerWidth;
    let columnChartColors = ['#00A4EF', '#b1f160', '#FFC300']; 
    //this.chart8 = this.initColumnChart3("Number of Teachers with Special Needs per Sub-Region by Gender", columnChartColors)
  }

  // initColumnChart3(title: string, colors: string[]) {
  //   return new Chart(
  //     {
  //       chart: {
  //         type: 'column',
  //         width: (this.innerWidth * 0.75),
  //       },

  //       title: {
  //         text: title,
  //         align: 'center'
  //       },
  //       colors: colors,
  //       plotOptions: {
  //         column: {
  //           pointPadding: 0.2,
  //           borderWidth: 0,
  //           cursor: 'pointer',
  //           showInLegend: true
  //         }
  //       },
  //       legend: {
  //         accessibility: {
  //           enabled: true
  //         },
  //         align: 'center',
  //         enabled: true
  //       },
  //       xAxis: {

  //         title: {
  //           text: 'Sub-Regions'
  //         },
  //         categories: [
  //           'Acholi',
  //           'Ankole',
  //           'Buganda',
  //           'Bukedi',
  //           'Bunyoro',
  //           'Busoga',
  //           'Elgon',
  //           'Karamoja',
  //           'Kigezi',
  //           'Lango',
  //           'Teso',
  //           'Toro',
  //           'West Nile'
  //         ],
  //         crosshair: true
  //       },
  //       yAxis: {
  //         min: 0,
  //         title: {
  //           text: 'Number of Teachers'
  //         }
  //       },
  //       series: [

  //         {
  //           name: 'Male',
  //           type: 'column',
  //           data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3, 45]

  //         },
  //         {
  //           name: 'Female',
  //           type: 'column',
  //           data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2, 30]

  //         },

  //       ],
  //     });   }
   

}
