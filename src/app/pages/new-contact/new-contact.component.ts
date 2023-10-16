import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ContactDto } from 'src/app/services/models';
import { ContactService } from 'src/app/services/services';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  contact: ContactDto = {};
  constructor(private contactService: ContactService,
    private helperService: HelperService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.params['idContact'];
    if (contactId) {
      this.contactService.findById2({ 'contact-id': contactId }).subscribe({
        next: (data) => {
          this.contact = data;
          console.log(data);

        },
        error: (err) => {
          console.log(err);

        }
      });
    }
  }
  saveContact() {
    let userId = this.helperService.userId;
    this.contact.userId = userId;
    this.contactService.save2({ body: this.contact }).subscribe({
      next: (data) => {
        console.log("here data contact", data);
        this.toastrService.success("Operation with success", "GOOD!");
        this.router.navigate(["user/my-contact-list"]);
      },
      error: (err) => {
        console.log("here error contact", err);
        this.toastrService.error("Error", "OOPS!");
      }
    });
  }
  cancel() {
    this.router.navigate(["user/my-contact-list"]);
  }

}
