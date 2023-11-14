import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';
import { CommonsService } from 'src/app/commons/commons.service';
import{v4 as uuidv4 } from "uuid"

@Component({
    selector: 'app-networks-popup',
    templateUrl: './networks-popup.component.html',
    styleUrls: ['./networks-popup.component.scss']
})
export class NetworksPopupComponent implements AfterViewInit {



    constructor(private formBuilder: FormBuilder, private commonsService: CommonsService) {

    }

    

    myform = this.formBuilder.group({
        name: this.formBuilder.control(''),
        code: this.formBuilder.control(''), 
        community: this.formBuilder.control(''), 

    }); 


    // id: string;
    // name: string;
    // code: string;
    // community: string;

    save() {
         
        console.log("Saving Networks data");
        this.commonsService.addDocument("networks", {
            id:uuidv4(),
            name: this.myform.value.name,
            code: this.myform.value.code, 
            community: this.myform.value.community, 
            createdAt:new Date()
        }).subscribe({
            next: response => {

                console.log("On saving Networks", response);

                alert("Network  successfully enrolled on the system");
            },
            error: error => {
                alert(error);
            }
        });
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }



   

}