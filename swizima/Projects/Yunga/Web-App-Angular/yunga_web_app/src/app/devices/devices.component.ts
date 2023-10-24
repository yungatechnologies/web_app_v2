
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, of } from 'rxjs';
import { CommonsService } from '../commons/commons.service';
import { DeviceDto } from './devices.dto';
import { MatDialog } from '@angular/material/dialog';
import { DevicePopupComponent } from './popups/device-popup.component';

@Component({
    selector: 'app-device',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements AfterViewInit {

    displayedColumns: string[] = ['no', 'deviceNumber', 'serialNumber', 'phoneNumber', 'status', 'stage'];

    dataSource!: MatTableDataSource<DeviceDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    //@ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>

    devices!: DeviceDto[];

    constructor(private commonsService: CommonsService, public dialog: MatDialog) {
        // this.myDiv.nativeElement.innerHTML = 'GALIWANGO'
        // Create 100 users
        //const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render

        this.getDevices();


    }

    getDevices() {

        this.commonsService.getDocuments('devices')
            .pipe(map(data => data as DeviceDto[]))
            .subscribe({
                next: response => {

                    this.devices = response;

                    this.dataSource = new MatTableDataSource(this.devices);

                },
                error: error => console.log('ERROR ', this.dataSource)
            });

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

    addNewDevice() {
        this.dialog.open(DevicePopupComponent, {
            width: '30%',
        });
    }

}

