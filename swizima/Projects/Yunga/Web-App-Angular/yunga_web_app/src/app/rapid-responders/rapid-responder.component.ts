
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RapidRespondersDto } from './rapid-responders.dto';
import { CommonsService } from '../commons/commons.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-rapid_responder',
    templateUrl: './rapid-responder.component.html',
    styleUrls: ['./rapid-responder.component.scss']
})
export class RapidRespondersComponent implements AfterViewInit {

    displayedColumns: string[] = ['no','name','phoneNumber','email','address'];
    dataSource!: MatTableDataSource<RapidRespondersDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    //@ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>

    rapidResponders!:RapidRespondersDto[];

    constructor(private commonsService:CommonsService) {
        // this.myDiv.nativeElement.innerHTML = 'GALIWANGO'
        // Create 100 users 
        // Assign the data to the data source for the table to render

        this.getRapidResponders();
         
    }

    getRapidResponders() {

        this.commonsService.getDocuments('rapidResponse')
            .pipe(map(data => data as RapidRespondersDto[]))
            .subscribe({
                next: response => {  

                    this.rapidResponders = response; 
                    this.dataSource = new MatTableDataSource(this.rapidResponders); 
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
  