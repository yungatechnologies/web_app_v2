import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CommonsService } from 'src/app/commons/commons.service';
import{v4 as uuidv4 } from "uuid"

@Component({
    selector: 'app-device-popup',
    templateUrl: './device-popup.component.html',
    styleUrls: ['./device-popup.component.scss']
})
export class DevicePopupComponent implements AfterViewInit {



    constructor(private formBuilder: FormBuilder, private commonsService: CommonsService) {

    }

    myform = this.formBuilder.group({
        deviceNumber: this.formBuilder.control(''),
        serialNumber: this.formBuilder.control(''),
        phone: this.formBuilder.control(''),
        stage: this.formBuilder.control(''),
        status: this.formBuilder.control(''), 

    }); 

    save() {
         
        console.log("Saving devices data");
        this.commonsService.addDocument("devices", {
            id:uuidv4(),
            deviceNumber: this.myform.value.deviceNumber,
            serialNumber: this.myform.value.serialNumber,
            phone: this.myform.value.phone,
            stage: this.myform.value.stage,
            status: this.myform.value.status,
            online:false,
            createdAt:new Date()
        }).subscribe({
            next: response => {

                console.log("On saving Devices", response);

                alert("Device successfully enrolled on the system");
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