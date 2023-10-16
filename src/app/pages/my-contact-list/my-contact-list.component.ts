import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ContactDto } from 'src/app/services/models';
import { ContactService } from 'src/app/services/services';

@Component({
  selector: 'app-my-contact-list',
  templateUrl: './my-contact-list.component.html',
  styleUrls: ['./my-contact-list.component.scss']
})
export class MyContactListComponent implements OnInit {
  contactsList: Array<ContactDto> = [];
  userIdToDelete = -1;
  constructor(private contactService: ContactService,
    private helperService: HelperService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.findAllByUserId();
  }
  findAllByUserId() {
    this.contactService.findAllByUserId1({ "user-id": this.helperService.userId }).subscribe({
      next: (data) => {
        this.contactsList = data;
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  updateContact(id: number) {
    this.router.navigate([`user/new-contact/${id}`])
  }

  deleteContact() {
    console.log("here id delete", this.userIdToDelete);

    if (this.userIdToDelete) {
      this.contactService.delete2({ 'contact-id': this.userIdToDelete }).subscribe({
        next: (data) => {
          this.findAllByUserId();
          this.toastrService.success("Operation with success", "GOOD!");
        }
      });
    }
  }
}
