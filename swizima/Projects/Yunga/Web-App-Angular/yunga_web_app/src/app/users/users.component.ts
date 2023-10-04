
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersDto } from './users.dto';
import { CommonsService } from '../commons/commons.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

    displayedColumns: string[] = ['no','name', 'email', 'role', 'email', 'phoneNumber'];
    dataSource!: MatTableDataSource<UsersDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    //@ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>

    users!: UsersDto[];

    constructor(private commonsService: CommonsService) { 
        // Assign the data to the data source for the table to render
        this.getUsers();
    }

    getUsers() {
        this.commonsService.getDocuments('admins')
            .pipe(map(data => data as UsersDto[]))
            .subscribe({
                next: response => {  

                    this.users = response; 
                    this.dataSource = new MatTableDataSource(this.users);

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

}

