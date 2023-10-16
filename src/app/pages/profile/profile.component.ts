import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { UserDto } from 'src/app/services/models';
import { UserService } from 'src/app/services/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  userDto: UserDto = {
    email: '',
    firstname: '',
    lastname: '',
    password: ''
  };

  successMsg = '';

  constructor(
    private userService: UserService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.userService.findById({
      'user-id': this.helperService.userId
    }).subscribe({
      next: (data) => {
        this.userDto = data;
      }
    });
  }

  save() {
    this.successMsg = '';
    this.userDto.id = this.helperService.userId;
    console.log(this.userDto);

    this.userService.save({
      body: this.userDto
    }).subscribe({
      next: () => {
        this.successMsg = 'Your profile has been successfully updated';
      }
    });
  }
}
