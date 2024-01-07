import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    loggedInUserSubject = new BehaviorSubject<LoggedInUser | null>(null);

    constructor(private http: HttpClient, private router: Router) {

    }

    login(email: string, password: string) {

        let apiKey = environment.firebase.apiKey;

        this.http.post<LoggedInUser>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true

            }
        ).subscribe(
            {
                next: response => {

                    console.log('Login data', response);

                    this.router.navigate(['/main']);

                    this.loggedInUserSubject.next(response);

                    localStorage.setItem('loggedUser', JSON.stringify(response));

                },

                error: errorRes => {
                    console.log(errorRes.error.error.message);
                }
            });;



    }

    logout() {

        localStorage.removeItem('loggedUser');
        this.loggedInUserSubject.next(null);
        this.router.navigate(['/login']);

    }

    autoLogin() {

        let logedUserItem = localStorage.getItem('loggedUser');

        if (logedUserItem === 'undefined') {

            this.loggedInUserSubject.next(null);

        } else {

            if (logedUserItem) {

                let loggedInUserJsonObject = JSON.parse(logedUserItem);

                this.loggedInUserSubject.next({
                    localId: loggedInUserJsonObject.localId,
                    email: loggedInUserJsonObject.email,
                    displayName: loggedInUserJsonObject.displayName,
                    idToken: loggedInUserJsonObject.idToken,
                    registered: loggedInUserJsonObject.registered,
                    refreshToken: loggedInUserJsonObject.refreshToken,
                    expiresIn: loggedInUserJsonObject.expiresIn

                });

                this.router.navigate(['/main']);


            } else {

                this.loggedInUserSubject.next(null);
            }
        }




    }
}

interface LoggedInUser {
    localId: string,
    email: string,
    displayName: string,
    idToken: string,
    registered: boolean,
    refreshToken: string,
    expiresIn: string

}