import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonsService } from 'src/app/commons/commons.service';

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
        this.commonsService.addDocument("testMessaging", {
            surname: this.myform.value.surname,
            givenName: this.myform.value.givenName,
            phone: this.myform.value.phone,
        });
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

}