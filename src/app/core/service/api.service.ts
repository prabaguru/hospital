import { Injectable } from "@angular/core";
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IDoctor } from "../index";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  Registration(data: IDoctor): Observable<IDoctor[]> {
    return this.http
      .post<IDoctor[]>(`${environment.apiUrl}/hospitals/register`, data)
      .pipe(catchError(this.handleError));
  }

  forgotPassWordSendEmail(data: any) {
    return this.http
      .post(`${environment.apiUrl}/hospitals/forgotPasswordEmail`, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(err) {
    //console.log("error caught in service");
    //console.error(err);
    //Handle the error here
    return throwError(err);
  }

  update(user) {
    return this.http.put(`${environment.apiUrl}/hospitals/update`, user);
  }
  PasswordUpdate(user) {
    return this.http.put(`${environment.apiUrl}/hospitals/resetPassword`, user);
  }

  updatePassword(user) {
    return this.http.put(
      `${environment.apiUrl}/hospitals/changePassWord`,
      user
    );
  }

  getDoctorsLIsting() {
    return this.http
      .get(`${environment.apiUrl}/doctors/getAllDoc`)
      .pipe(catchError(this.handleError));
  }

  getAllDoctorsById(data: any) {
    //let params = new HttpParams({ fromObject: data });
    //console.log(params);
    return this.http
      .get(`${environment.apiUrl}/doctors/getById/${data}`)
      .pipe(catchError(this.handleError));
  }
  getAllDoctorAppoinmentsById(data: any) {
    let params = new HttpParams({ fromObject: data });
    return this.http
      .get(`${environment.apiUrl}/patient_appointments/getDocAppById`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }
  updateSingle(user) {
    return this.http
      .put(`${environment.apiUrl}/doctors/sdelete`, user)
      .pipe(catchError(this.handleError));
  }

  updateAllUserStatus(obj) {
    return this.http
      .put(`${environment.apiUrl}/doctors/users/updateAllStatus`, obj)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/doctors/${id}`);
  }
}
