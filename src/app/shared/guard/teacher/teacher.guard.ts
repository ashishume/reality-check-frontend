import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { NavbarService } from '../../services/navbar-service/navbar.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isTeacher === 'Teacher') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
