
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonsService } from '../commons/commons.service';
import { CustomerDto } from './customer.dto';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CustomerPopupComponent } from './popups/customer-popup.component';

@Component({
    selector: 'app-customer',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements AfterViewInit {

    displayedColumns: string[] = ['no','phoneNumber','surname','lastName','email','address'];

    dataSource!: MatTableDataSource<CustomerDto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    //@ViewChild('myDiv') myDiv!: ElementRef<HTMLElement>

    customers!: CustomerDto[];

    constructor(private commonsService: CommonsService,public dialog: MatDialog) {
        // this.myDiv.nativeElement.innerHTML = 'GALIWANGO'
        // Create 100 users
        //const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render

        this.getCustomers();
       
    }



    getCustomers() {

        this.commonsService.getDocuments('users')
            .pipe(map(data => data as CustomerDto[]))
            .subscribe({
                next: response => { 

                    //console.log(response); 

                    this.customers = response; 
                    this.dataSource = new MatTableDataSource(this.customers);

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

    addNewCustomer(){
        this.dialog.open(CustomerPopupComponent,{
            width:'30%', 
        });
    }

}
  