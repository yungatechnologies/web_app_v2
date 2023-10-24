
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommunitiesDto } from './communities.dto';
import { CommonsService } from '../commons/commons.service';
import { map } from 'rxjs/operators';
import { CommunitiesPopupComponent } from './popups/communities-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-communities',
    templateUrl: './communities.component.html',
    styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements AfterViewInit {

    //name,district,status
    displayedColumns: string[] = ['no','name', 'district', 'status'];
    dataSource!: MatTableDataSource<CommunitiesDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    //@ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>

    communities!: CommunitiesDto[];



    constructor(private commonsService: CommonsService,public dialog: MatDialog) {
        // this.myDiv.nativeElement.innerHTML = 'GALIWANGO'
        // Create 100 users

        this.getCommunities();

    }


    getCommunities() {

        this.commonsService.getDocuments('communities')
            .pipe(map(data => data as CommunitiesDto[]))
            .subscribe({
                next: response => {  
                    this.communities = response;
                    this.dataSource = new MatTableDataSource(this.communities);

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

    addNewCommunity(){
        this.dialog.open(CommunitiesPopupComponent,{
            width:'30%', 
        });
    }

}
