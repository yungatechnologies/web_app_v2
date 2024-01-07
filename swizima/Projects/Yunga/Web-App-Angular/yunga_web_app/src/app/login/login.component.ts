
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit,OnInit {

    hide = true;
    email = new FormControl('');
    password = new FormControl('');


    constructor(private route: ActivatedRoute, private authService: AuthService) {

    }
    ngOnInit(): void {
        this.authService.autoLogin();
    }
    ngAfterViewInit(): void {
        //throw new Error('Method not implemented.');
    }

    login() {
        let email = this.email.value;
        let password = this.password.value;

        //console.log(`Email: ${email}`);
        // console.log(`password: ${password}`);

        if (email != null && password != null) {

            this.authService.login(email, password);
        } else {
            alert('Please enter username or password');
        }


    }



}

