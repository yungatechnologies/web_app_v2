
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlarmDto, DeviceDto, DoorBellDto } from 'src/app/devices/devices.dto';
import { CommonsService } from 'src/app/commons/commons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-doorbell-details',
    templateUrl: './doorbell-details.component.html',
    styleUrls: ['./doorbell-details.component.scss']
})
export class DoorbellDetailsComponent implements AfterViewInit, OnInit {

  
    displayedColumns: string[] = ['no', 'deviceNumber', 'date', 'guest', 'note', 'userId'];

    dataSource!: MatTableDataSource<DoorBellDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    doorbells: DoorBellDto[] = []

    constructor(private commonsService: CommonsService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private dashboardService: DashboardService
    ) {


    }
    ngOnInit(): void {

        console.log('Entry to loading device alarms list: ');

        this.dashboardService.deviceDoorbellSubject.subscribe(
            {
                next: response => {
                    this.doorbells = response;
                    console.log('deviceDoorbellSubject:: ' + this.doorbells.length)
                },
                error: error => {
                    console.log('ERROR:: deviceDoorbellSubject:: ', error)

                }
            }
        );

        this.getDevicesDoorbells();

    }




    getDevicesDoorbells() {

        this.dataSource = new MatTableDataSource(this.doorbells);
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

