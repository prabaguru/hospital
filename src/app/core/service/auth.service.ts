import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/doctor";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("hospitals"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  updateUserObjOnSave(user) {
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/hospitals/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.deleteLS();
          localStorage.setItem("hospitals", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("hospitals");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }

  deleteLS() {
    if ("hospitals" in localStorage) {
      localStorage.removeItem("hospitals");
    } else {
      //alert("no");
    }
  }
}
