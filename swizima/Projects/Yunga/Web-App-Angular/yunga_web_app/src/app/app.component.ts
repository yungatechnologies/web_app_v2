import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yunga_web_app';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {

    this.authService.autoLogin();

  }

}
