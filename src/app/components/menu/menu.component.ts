import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() isAdmin = false;
  fullName: string = "";
  role = 'user';
  connectedUser: boolean = false;
  constructor(private helperService: HelperService,
    private router: Router) { }

  ngOnInit(): void {
    this.fullName = "";
    if (localStorage.getItem("ConnectedUser")) {

      this.fullName = localStorage.getItem("FullName") as string;
      this.connectedUser = true;

    }
    if (this.isAdmin) {
      this.role = 'admin';
    }

  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Role");
    localStorage.removeItem("FullName");
    localStorage.removeItem("ConnectedUser");
    this.router.navigate(['login'])
      .then(() => {
        window.location.reload();
      });

  }

}
