import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = {};
  constructor(private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  login() {
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: async (data) => {
        console.log("token data", data);
        this.toastr.success('You are Welcome');
        localStorage.setItem("token", data.token!);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(data.token!);
        let fullName: string = "";
        let id: string = "";
        fullName = decodedToken.fullname as string;
        id = decodedToken.UserId as string;
        localStorage.setItem("FullName", fullName);
        localStorage.setItem("id", id);
        console.log("here id", id);

        localStorage.setItem("ConnectedUser", "true");
        console.log("here decoded token", decodedToken);
        if (decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          localStorage.setItem("Role", 'admin');
          await this.router.navigate(['admin/dashboard']);
        } else {
          localStorage.setItem("Role", 'user');
          await this.router.navigate(['user/dashboard']);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.errorMessage, 'Oops!');
      }
    });
  }
  async register() {
    await this.router.navigate(["register"]);
  }

}
