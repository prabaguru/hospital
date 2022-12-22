import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable, of } from "rxjs";
@Injectable({ providedIn: "root" })
export class sharedDataService {
  private sharedDataInfo: any = {};
  private doctorDetailsObj = new BehaviorSubject<any>(null);
  doctorDetails = this.doctorDetailsObj.asObservable();

  constructor(public snackBar: MatSnackBar) {}

  setData(typeofData: any, value: any) {
    this.sharedDataInfo[typeofData] = value;
  }

  getData(key: any) {
    return this.sharedDataInfo[key];
  }
  deleteData(key: any) {
    delete this.sharedDataInfo[key];
  }
  showNotification(colorName, text: any, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  setDoctorObj(obj: any) {
    this.doctorDetailsObj.next(obj);
  }
}
