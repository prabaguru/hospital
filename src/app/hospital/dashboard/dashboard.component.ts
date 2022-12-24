import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { AuthService, sharedDataService, ApiService } from "../../core";
import * as moment from "moment";
(moment as any).suppressDeprecationWarnings = true;
declare var $: any;
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "hospital-app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild("close") close: ElementRef;
  panelOpenState = false;
  userData: any;
  lastLogin: string = "";
  doctorsListing = [];
  active = [];
  inactive = [];
  doc: any;
  dob: any;
  cdate: any;
  ldate: any;
  getAppointments: any = [];
  pending: any = [];
  closed: any = [];
  totalApp: number = 0;
  getAppointments2: any = [];
  pending2: any = [];
  closed2: any = [];
  appClinic1: boolean = false;
  appClinic2: boolean = false;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private sharedDataService: sharedDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.userData = this.authService.currentUserValue;
    this.lastLogin = moment(this.userData.lastLogin).format(
      "DD/MM/YYYY hh.mm a"
    );

    this.subs.sink = this.apiService
      .getDoctorsById(this.userData._id)
      .subscribe({
        next: (data: any) => {
          this.doctorsListing = [];
          this.doctorsListing = data.length > 0 ? data : [];
          //console.log(this.doctorsListing);
          this.active = this.doctorsListing.filter((x) => x.approved == true);
          this.inactive = this.doctorsListing.filter(
            (x) => x.approved == false
          );
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
}
