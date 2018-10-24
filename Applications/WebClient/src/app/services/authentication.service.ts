import { HttpRequestService } from "./http-request.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpRequest: HttpRequestService) {}

  login(email: String, password: String, callback) {
    this.httpRequest.postRequest(
      "http://localhost:1001/authentication",
      { email: email, password: password },
      result => {
        callback(result);
      }
    );
    // this.http
    //   .post("http://localhost:1001/authentication", {
    //     email: email,
    //     password: password
    //   })
    //   .subscribe(result => callback(result), err => callback(err));
  }
}
