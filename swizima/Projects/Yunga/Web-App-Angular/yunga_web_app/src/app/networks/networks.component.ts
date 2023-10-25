
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NetworksDto } from './networks.dto';
import { CommonsService } from '../commons/commons.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NetworksPopupComponent } from './popups/networks-popup.component';

@Component({
    selector: 'app-networks',
    templateUrl: './networks.component.html',
    styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements AfterViewInit {

    //name,district,status
    displayedColumns: string[] = ['no','name','code','community'];
    dataSource!: MatTableDataSource<NetworksDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    //@ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>

    networks!:NetworksDto[];

    constructor(private commonsService: CommonsService,public dialog: MatDialog) {
        // this.myDiv.nativeElement.innerHTML = 'GALIWANGO'
        // Create 100 users 
        // Assign the data to the data source for the table to render
        
        this.getNetworks();
    }

    getNetworks() {

        this.commonsService.getDocuments('networks')
            .pipe(map(data => data as NetworksDto[]))
            .subscribe({
                next: response => {  

                    this.networks = response; 
                    this.dataSource = new MatTableDataSource(this.networks);

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

    addNewNetwork(){
        this.dialog.open(NetworksPopupComponent,{
            width:'30%', 
        });
    }

}
 
 

 