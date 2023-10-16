import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatepickerOptions } from 'ng2-datepicker';
import { lastValueFrom } from 'rxjs';
import { LightInfoInput } from 'src/app/components/light-info/light-info.component';
import { HelperService } from 'src/app/services/helper/helper.service';
import { StatisticsService } from 'src/app/services/services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  accountInfoList: Array<LightInfoInput> = [];
  accountBalance = 0;
  highestTransfer = 0;
  highestDeposit = 0;
  id: any;;
  chartType: ChartType = "line";
  datasets: ChartDataSets[] = [];
  labels: Label[] = [];
  chartOptions: any = {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 15,
        usePointStyle: true
      }
    }
  };
  dateOptions: DatepickerOptions = {
    format: 'yyyy/MM/dd'
  };
  startDate: Date = new Date();
  endDate: Date = new Date();
  constructor(
    private statisticService: StatisticsService,
    private helperService: HelperService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.initializeAccountInfo();
  }
  getData() {
    this.statisticService.findSumTractionsByDate({
      "user-id": this.helperService.userId,
      "start-date": this.datePipe.transform(this.startDate, 'yyyy-MM-dd') as string,
      "end-date": this.datePipe.transform(this.endDate, 'yyyy-MM-dd') as string
    }).subscribe({
      next: (values) => {
        console.log("here statis Data", values);
        this.datasets = [];
        this.labels = [];
        const chartDataSet: ChartDataSets = {};
        const dataValues: Array<number> = [];
        for (let record of values) {
          this.labels.push(record.transactionDate!);
          dataValues.push(record.amount!);
        }
        chartDataSet.label = "Transaction by date";
        chartDataSet.data = dataValues;
        this.datasets.push(chartDataSet);

      }
    });
  }
  private async initializeAccountInfo() {
    this.id = localStorage.getItem("id");
    this.accountBalance = await lastValueFrom(this.statisticService.getAccountBalance({ "user-id": this.id }));
    console.log(this.accountBalance);

    this.highestDeposit = await lastValueFrom(this.statisticService.highestDeposit({ "user-id": this.id }));
    this.highestTransfer = await lastValueFrom(this.statisticService.highestTransfer({ "user-id": this.id }));

    this.accountInfoList = [
      {
        title: 'Account balance',
        amount: this.accountBalance,
        infoStyle: 'bg-primary'
      },
      {
        title: 'Highest transfer',
        amount: this.highestTransfer,
        infoStyle: 'bg-warning'
      },
      {
        title: 'Highest deposit',
        amount: this.highestDeposit,
        infoStyle: 'bg-success'
      }
    ];
  }
}

