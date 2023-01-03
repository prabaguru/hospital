import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService, sharedDataService, ApiService } from "../../core";
import * as moment from "moment";
(moment as any).suppressDeprecationWarnings = true;
declare var $: any;
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
import * as Dayjs from "dayjs/esm";
@Component({
  selector: "hospital-app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("close") close: ElementRef;
  panelOpenState = false;
  userData: any;
  lastLogin: string = "";
  doc: any;
  dob: any;
  cdate: any;
  ldate: any;
  doctorsListing = {
    docCount: 0,
    active: 0,
    inActive: 0,
  };
  getAppointments: any = {
    appCount: 0,
  };
  generateChartFlag: boolean = false;
  alwaysShowCalendars: boolean;
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
  };
  invalidDates: moment.Moment[] = [
    moment().add(2, "days"),
    moment().add(3, "days"),
    moment().add(5, "days"),
  ];
  maxDate = moment(new Date()).format("MM/DD/YYYY");
  minDate = "12/01/2022";
  dateLimit = "365";

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private sharedDataService: sharedDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.alwaysShowCalendars = true;
  }

  ngOnInit() {
    this.userData = this.authService.currentUserValue;
    this.lastLogin = moment(this.userData.lastLogin).format(
      "DD/MM/YYYY hh.mm a"
    );

    this.subs.sink = this.apiService
      .getAllDocByHospitals(this.userData._id)
      .subscribe({
        next: (data: any) => {
          this.doctorsListing = data;
        },
        error: (err) => {
          this.sharedDataService.showNotification(
            "snackbar-danger",
            err,
            "top",
            "center"
          );
        },
      });
  }
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some((d) => d.isSame(m, "day"));
  };
  change(e) {
    let obj = {
      id: this.userData?._id,
      start: e.startDate?.$d,
      end: e.endDate?.$d,
    };
    if (!obj.start) {
      return;
    }
    this.getHospitalDocAppointments("search", obj);
  }
  getHospitalDocAppointments(reset?: string, objD?: any) {
    let obj = {};
    if (reset === "search") {
      obj = objD;
    }
    //console.log(obj);
    this.subs.sink = this.apiService
      .getHospitalDocAppointments(obj)
      .pipe(first())
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.getAppointments = data;
          let doc = [];
          let app = [];
          let docData = this.getAppointments.agg.length;
          for (let i = 0; i < docData; i++) {
            doc.push(this.getAppointments.agg[i].doctorName.toUpperCase());
            app.push(this.getAppointments.agg[i].count);
          }
          this.getAppointments?.appCount > 0
            ? this.generateChart(doc, app)
            : (this.generateChartFlag = false);
        },
        error: (error) => {
          this.sharedDataService.showNotification(
            "snackbar-danger",
            error,
            "top",
            "center"
          );
        },
        complete: () => {},
      });
  }

  generateChart(doc: any, app: any) {
    this.chartOptions = {
      series: [
        {
          name: "Appointments",
          data: app,
        },
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "Doctor Appointments chart",
      },
      xaxis: {
        categories: doc,
      },
    };
    this.generateChartFlag = true;
  }
}
