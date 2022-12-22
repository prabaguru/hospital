import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { AuthService, sharedDataService, ApiService } from "../../core";
import * as moment from "moment";
(moment as any).suppressDeprecationWarnings = true;
declare var $: any;
import { first } from "rxjs/operators";
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
          this.doctorsListing = data.filter((x) => x.approved == true);
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

  getDocDetails(id: string) {
    this.appClinic1 = false;
    this.appClinic2 = false;
    //let obj = { id: id };
    this.subs.sink = this.apiService.getAllDoctorsById(id).subscribe({
      next: (data: any) => {
        this.doc = null;
        this.doc = data[0];
        //console.log(this.doctorDetails);
        this.dob = moment(this.doc.dob).format("DD/MM/YYYY");
        this.cdate = moment(this.doc.createdDate).format("DD/MM/YYYY hh.mm a");
        this.ldate = moment(this.doc.lastLogin).format("DD/MM/YYYY hh.mm a");
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

  getAllDoctorAppoinmentsById(did: string, Clinic: string) {
    if (!did) {
      return;
    }
    let obj = {};
    obj = {
      id: did,
      clinic: Clinic,
      report: true,
    };
    this.subs.sink = this.apiService
      .getAllDoctorAppoinmentsById(obj)
      .pipe(first())
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.getAppointments = [];
          this.getAppointments = data;
          //console.log(this.getAppointments);
          this.pending = this.getAppointments.filter(
            (x: any) => x.AppointmentStatus == "Booked"
          );
          this.closed = this.getAppointments.filter(
            (x: any) => x.AppointmentStatus == "Closed"
          );
          this.appClinic1 = true;
          //this.smallChart2();
        },
        error: (error) => {
          this.sharedDataService.showNotification(
            "snackbar-danger",
            error,
            "top",
            "center"
          );
          this.appClinic1 = false;
        },
        complete: () => {},
      });
  }

  getAllDoctorAppoinmentsById2(did: string, Clinic: string) {
    if (!did) {
      return;
    }
    let obj = {};
    obj = {
      id: did,
      clinic: Clinic,
      report: true,
    };
    this.subs.sink = this.apiService
      .getAllDoctorAppoinmentsById(obj)
      .pipe(first())
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.getAppointments2 = [];
          this.getAppointments2 = data;
          //console.log(this.getAppointments);
          this.pending2 = this.getAppointments2.filter(
            (x: any) => x.AppointmentStatus == "Booked"
          );
          this.closed2 = this.getAppointments2.filter(
            (x: any) => x.AppointmentStatus == "Closed"
          );
          this.appClinic2 = true;
          //this.smallChart2();
        },
        error: (error) => {
          this.sharedDataService.showNotification(
            "snackbar-danger",
            error,
            "top",
            "center"
          );
          this.appClinic2 = false;
        },
        complete: () => {},
      });
  }
  deactivateDoctor(did: string, active: boolean) {
    let obj = {};
    obj = {
      id: did,
      approved: active,
    };
    this.subs.sink = this.apiService.updateSingle(obj).subscribe({
      next: (data: any) => {
        //this.doc.approved = active;
        let mess = "";
        active
          ? (mess = "Doctor activated Successfully...")
          : (mess = "Doctor deactivated Successfully...");
        this.close.nativeElement.click();
        this.sharedDataService.showNotification(
          "snackbar-success",
          mess,
          "top",
          "center"
        );
        let doc: any = this.doctorsListing;
        for (let i = 0; i < doc.length; i++) {
          if (doc[i]._id === did) {
            doc[i].approved = active;
          }
        }
        this.deactivateAllClinicUsers(did, active);
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

  deactivateAllClinicUsers(did: string, active: boolean) {
    let obj = {};
    obj = {
      id: did,
      flag: active,
    };
    this.subs.sink = this.apiService.updateAllUserStatus(obj).subscribe({
      next: (data: any) => {},
      error: (err) => {},
    });
  }
}
