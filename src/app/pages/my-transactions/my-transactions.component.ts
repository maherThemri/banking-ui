import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';
import { TransactionDto } from 'src/app/services/models';
import { TransactionsService } from 'src/app/services/services';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit {
  transactions: Array<TransactionDto> = [];
  constructor(private transactionService: TransactionsService,
    private helperService: HelperService) { }

  ngOnInit(): void {
    console.log(this.helperService.userFullName);
    console.log(this.helperService.userId);

    this.transactionService.findAllByUserId({ "user-id": this.helperService.userId }).subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {

      }
    });
  }

}
