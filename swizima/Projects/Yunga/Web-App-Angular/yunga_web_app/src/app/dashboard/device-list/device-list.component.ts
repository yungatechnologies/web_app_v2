
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDto } from 'src/app/devices/devices.dto';
import { CommonsService } from 'src/app/commons/commons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements AfterViewInit, OnInit {

    displayedColumns: string[] = ['no', 'deviceNumber', 'serialNumber', 'phoneNumber', 'status', 'stage'];

    dataSource!: MatTableDataSource<DeviceDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    devices: DeviceDto[] = []

    constructor(private commonsService: CommonsService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private dashboardService: DashboardService
    ) {


    }
    ngOnInit(): void {

        console.log('Entry to loading device list: ');

        this.dashboardService.onlineDevicesSubject.subscribe(
            {
                next: response => {
                    this.devices = response;
                    console.log('onlineDevicesSubject:: ' + this.devices.length)
                },
                error: error => {
                    console.log('ERROR:: onlineDevicesSubject:: ')
                    console.log(error);
                }
            }
        );

        this.getDevices();

    }




    getDevices() {

        this.dataSource = new MatTableDataSource(this.devices);
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

