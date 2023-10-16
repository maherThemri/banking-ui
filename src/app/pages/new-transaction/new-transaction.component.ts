import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ContactDto, TransactionDto } from 'src/app/services/models';
import { ContactService, StatisticsService, TransactionsService } from 'src/app/services/services';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {
  transaction: TransactionDto = {};
  contacts: Array<ContactDto> = [];
  accountBalance!: number;
  constructor(
    private statisticService: StatisticsService,
    private contactService: ContactService,
    private transactionService: TransactionsService,
    private helperService: HelperService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAccountBalance();
    this.findAllByUserId();
  }
  findAllByUserId() {
    this.contactService.findAllByUserId1({ "user-id": this.helperService.userId }).subscribe({
      next: (data) => {
        this.contacts = data;
        console.log(data);

      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  getAccountBalance() {
    this.statisticService.getAccountBalance({ "user-id": this.helperService.userId }).subscribe({
      next: (data) => {
        this.accountBalance = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  cancel() {
    this.router.navigate(['user/my-transactions']);
  }
  save() {
    this.transaction.userId = this.helperService.userId;
    this.transactionService.save1({ body: this.transaction }).subscribe({
      next: (data) => {
        this.transaction = {};
        //this.router.navigate(['user/my-transactions']);
        this.getAccountBalance();
        this.toastrService.success("Operation with success", "GOOD!");
      },
      error: (err) => {
        this.toastrService.error("Error Operation", "Oops!");
      }
    });
  }

}
