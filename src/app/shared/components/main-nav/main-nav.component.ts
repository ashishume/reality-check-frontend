import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service/auth.service';
import { NavbarService } from '../../services/navbar-service/navbar.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  username;
  userType;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {
    this.authService.username.subscribe(username => {
      this.username = username;
    })
    if (this.username == null) {
      this.username = localStorage.getItem('username')
    }
  }
}
