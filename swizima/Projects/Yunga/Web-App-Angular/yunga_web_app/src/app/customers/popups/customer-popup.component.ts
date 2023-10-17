import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-customer-popup',
    templateUrl: './customer-popup.component.html',
    styleUrls: ['./customer-popup.component.scss']
})
export class CustomerPopupComponent implements AfterViewInit {



    constructor(private formBuilder:FormBuilder) {

    }

    myform=this.formBuilder.group({
        surname:this.formBuilder.control(''),
        givenName:this.formBuilder.control(''),
        phone:this.formBuilder.control(''),
        email:this.formBuilder.control(''),
        address:this.formBuilder.control(''),

    });

    save(){
        
    }

    ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }

}