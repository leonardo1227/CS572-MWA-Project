import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: String, password: String, callback) {
    this.http
      .post("http://localhost:1001/authentication", {
        email: email,
        password: password
      })
      .subscribe(result => callback(result), err => callback(err));
  }
}
