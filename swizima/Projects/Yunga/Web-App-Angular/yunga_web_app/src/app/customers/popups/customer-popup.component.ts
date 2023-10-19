import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CommonsService } from 'src/app/commons/commons.service';
import{v4 as uuidv4 } from "uuid"

@Component({
    selector: 'app-customer-popup',
    templateUrl: './customer-popup.component.html',
    styleUrls: ['./customer-popup.component.scss']
})
export class CustomerPopupComponent implements AfterViewInit {



    constructor(private formBuilder: FormBuilder, private commonsService: CommonsService) {

    }

    myform = this.formBuilder.group({
        surname: this.formBuilder.control(''),
        givenName: this.formBuilder.control(''),
        phone: this.formBuilder.control(''),
        email: this.formBuilder.control(''),
        address: this.formBuilder.control(''),

    });

    save() {
        //console.log(this.myform.value);
        console.log("Saving data");
        this.commonsService.addDocument("users", {
            id:uuidv4(),
            surname: this.myform.value.surname,
            givenName: this.myform.value.givenName,
            phone: this.myform.value.phone,
            email: this.myform.value.email,
            address: this.myform.value.address,
            createdAt:new Date()
        }).subscribe({
            next: response => {

                console.log("On saving Customer", response);

                alert("Customer successfully added");
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