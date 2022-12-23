import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControlOptions,
} from "@angular/forms";
import {
  AuthService,
  sharedDataService,
  ApiService,
  MustMatch,
} from "../../core";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { first } from "rxjs/operators";
import * as moment from "moment";
(moment as any).suppressDeprecationWarnings = true;

@Component({
  selector: "hospital-doctor-manage",
  templateUrl: "./manage-doctors.component.html",
  styleUrls: ["./manage-doctors.component.scss"],
})
export class ManageDoctorsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @ViewChild("closeMD") close: ElementRef;
  userData: any;
  submitted: boolean = false;
  public showPassword: boolean = false;
  public showPassword2: boolean = false;
  lastLogin: string = "";
  loginForm: FormGroup;
  doctorsListing = [];
  active = [];
  inactive = [];
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
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
    this.loginForm = this.formBuilder.group(
      {
        firstName: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z '-]+$")],
        ],
        email: [
          "",
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        mobile: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern("[0-9]{10}"),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      } as AbstractControlOptions
    );
    this.getDoctorsByHId();
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      let obj = {
        hId: this.userData._id,
        hName: this.userData.firstName,
        firstName: this.loginForm.value.firstName,
        email: this.loginForm.value.email,
        mobile: {
          nationalNumber: `0${this.loginForm.value.mobile}`,
          e164Number: `+91${this.loginForm.value.mobile}`,
          number: this.loginForm.value.mobile,
          internationalNumber: `+91${this.loginForm.value.mobile}`,
          countryCode: "IN",
          dialCode: "+91",
        },
        password: this.loginForm.value.password,
        role: "Doctor",
      };
      this.subs.sink = this.apiService
        .register(obj)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.sharedDataService.showNotification(
              "snackbar-success",
              "Registration Successfull. Add doctor details",
              "top",
              "center"
            );
            this.close.nativeElement.click();
            this.loginForm.reset();
            this.submitted = false;
            this.setDocDetails(data);
            // this.router.navigate(["/authentication/signin"], {
            //   queryParams: { loginType: "Doctor", email: this.f.email.value },
            // });
          },
          error: (error) => {
            this.sharedDataService.showNotification(
              "snackbar-danger",
              error,
              "top",
              "center"
            );
            this.submitted = false;
          },
          complete: () => {
            //this.alertService.success("Registration successful", true);
          },
        });
    }
  }
  getDoctorsByHId() {
    this.subs.sink = this.apiService
      .getDoctorsById(this.userData._id)
      .subscribe({
        next: (data: any) => {
          this.doctorsListing = data.length > 0 ? data : [];
          this.doctorsListing = data;
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
  setDocDetails(data: any) {
    this.sharedDataService.setDoctorObj(null);
    this.sharedDataService.setDoctorObj(data);
    this.router.navigate(["/hospital/doctordetails"]);
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
}
