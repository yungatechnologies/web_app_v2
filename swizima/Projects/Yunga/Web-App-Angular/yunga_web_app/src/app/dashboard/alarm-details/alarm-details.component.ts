
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlarmDto, DeviceDto } from 'src/app/devices/devices.dto';
import { CommonsService } from 'src/app/commons/commons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-alarm-details',
    templateUrl: './alarm-details.component.html',
    styleUrls: ['./alarm-details.component.scss']
})
export class AlarmDetailsComponent implements AfterViewInit, OnInit {
 

    displayedColumns: string[] = ['no', 'deviceNumber', 'date', 'name', 'userPhone', 'address','source'];

    dataSource!: MatTableDataSource<AlarmDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    alarms: AlarmDto[] = []

    constructor(private commonsService: CommonsService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private dashboardService: DashboardService
    ) {


    }
    ngOnInit(): void {

        console.log('Entry to loading device alarms list: ');

        this.dashboardService.deviceAlarmSubject.subscribe(
            {
                next: response => {
                    this.alarms = response;
                    console.log('deviceAlarmSubject:: ' + this.alarms.length)
                },
                error: error => {
                    console.log('ERROR:: deviceAlarmSubject:: ',error)
                     
                }
            }
        );

        this.getDevicesAlarms();

    }




    getDevicesAlarms() {

        this.dataSource = new MatTableDataSource(this.alarms);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}

