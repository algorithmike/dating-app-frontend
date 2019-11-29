import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.model).subscribe(x => {
      this.alertify.success('You\'ve successfully logged in!');
    }, () => {
      this.alertify.error('Login attempt failed.');
    });
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.alertify.message('You\'ve logged out.');
  }

}
