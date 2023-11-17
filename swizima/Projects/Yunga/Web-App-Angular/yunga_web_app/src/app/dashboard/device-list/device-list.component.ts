
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDto } from 'src/app/devices/devices.dto';
import { CommonsService } from 'src/app/commons/commons.service';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements AfterViewInit {

    displayedColumns: string[] = ['no', 'deviceNumber', 'serialNumber', 'phoneNumber', 'status', 'stage'];

    dataSource!: MatTableDataSource<DeviceDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input() devicesDetailsList: DeviceDto[] = [];

    constructor(private commonsService: CommonsService, public dialog: MatDialog) {


    }


    ngOnInit(): void {

        this.getDevices();
    }


    getDevices() {
        console.log('loading device list: '+this.devicesDetailsList.length);
        this.dataSource = new MatTableDataSource(this.devicesDetailsList);
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

