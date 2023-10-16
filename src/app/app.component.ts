import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banking-ui';
  constructor(private router: Router,
  ) {

  }
  ngOnInit() {
    if (localStorage.getItem("Role") == "admin") {
      this.router.navigate(["admin/dashboard"]);
    } else {
      this.router.navigate(["user/dashboard"]);
    }

    if (localStorage.getItem("token") == null) {

      this.router.navigate(['login']);
    }

  }
}
