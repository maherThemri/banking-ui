import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userDto: UserDto = { email: '', firstname: '', lastname: '', password: '' };
  errorMessages?: string[];
  errorEmailMessage?: string;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  async login() {
    await this.router.navigate(["login"]);
  }
  register() {
    this.errorMessages = [];
    this.authService.register({ body: this.userDto }).subscribe({
      next: async (data) => {
        await this.router.navigate(["confirm-register"]);
        console.log(data);
        //this.toastr.success('Operation with success!', 'Good!');
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
        if (!this.errorMessages?.length) {
          this.errorEmailMessage = err.error.errorMessage;
        }

      }
    });
  }
}
