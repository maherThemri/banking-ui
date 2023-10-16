import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/services/models';
import { UserService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  customers: Array<UserDto> = [];
  showInactiveUserOnly!: false;
  updateState: boolean | undefined;
  userIdToUpdate = -1;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.findAllCustomers();
  }
  findAllCustomers() {
    this.userService.findAll().subscribe({
      next: (data) => {
        console.log("here all customers", data);
        this.customers = data;
      }
    })
  }
  filterCustomers() {
    if (this.showInactiveUserOnly) {
      this.customers = this.customers.filter((c) => !c.active);
    } else {
      this.findAllCustomers();
    }
  }

  changeUserState(active: boolean | undefined, id: number | undefined) {
    this.userIdToUpdate = id as number;
    this.updateState = active;
  }

  updateUserState() {
    if (this.updateState) {
      this.userService.validateAccount({
        'user-id': this.userIdToUpdate as number
      }).subscribe({
        next: () => {
          this.findAllCustomers();
        }
      });
    } else {
      this.userService.invalidateAccount({
        'user-id': this.userIdToUpdate as number
      }).subscribe({
        next: () => { }
      });
    }
  }

  cancelUpdate() {
    const user = this.customers.find((c) => c.id === this.userIdToUpdate);
    if (user) {
      user.active = !user.active
    }
    this.userIdToUpdate = -1;
    this.updateState = undefined
  }
}
