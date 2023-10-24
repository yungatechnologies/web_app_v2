import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CommonsService } from 'src/app/commons/commons.service';
import{v4 as uuidv4 } from "uuid"

@Component({
    selector: 'app-communities-popup',
    templateUrl: './communities-popup.component.html',
    styleUrls: ['./communities-popup.component.scss']
})
export class CommunitiesPopupComponent implements AfterViewInit {



    constructor(private formBuilder: FormBuilder, private commonsService: CommonsService) {

    }

    

    myform = this.formBuilder.group({
        name: this.formBuilder.control(''),
        district: this.formBuilder.control(''), 
        status: this.formBuilder.control(''), 

    }); 

    save() {
         
        console.log("Saving communities data");
        this.commonsService.addDocument("communities", {
            id:uuidv4(),
            name: this.myform.value.name,
            district: this.myform.value.district, 
            status: this.myform.value.status, 
            createdAt:new Date()
        }).subscribe({
            next: response => {

                console.log("On saving Devices", response);

                alert("Community  successfully enrolled on the system");
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