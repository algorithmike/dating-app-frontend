import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  uniqueName: string;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.uniqueName = (this.authService.decodedToken) ?
      this.authService.decodedToken.unique_name : '';
  }

  login(): void {
    this.authService.login(this.model).subscribe(x => {
      this.alertify.success('You\'ve successfully logged in!');
      this.uniqueName = x.unique_name;
    }, () => {
      this.alertify.error('Login attempt failed.');
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.alertify.message('You\'ve logged out.');
    this.router.navigate(['/home']);
  }

}
