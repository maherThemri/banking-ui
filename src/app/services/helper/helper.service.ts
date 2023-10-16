import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private decodedToken: any;
  constructor() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token') as string)
  }
  get userId(): number {
    return this.decodedToken.UserId;
  }
  get userFullName(): String {
    return this.decodedToken.fullname;
  }
  // get RoleUser(): String {
  //   return this.decodedToken.authorities[0].authority;
  // }
}
