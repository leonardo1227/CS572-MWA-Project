import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  getRequest(url, callback) {
    const headers = this.buildHeader();
    this.http
      .get(url, { headers })
      .subscribe(result => callback(result), err => callback(err));
  }

  postRequest(url, body, callback) {
    const headers = this.buildHeader();
    this.http
      .post(url, body, { headers })
      .subscribe(result => callback(result), err => callback(err));
  }

  putRequest(url, body, callback) {
    const headers = this.buildHeader();
    this.http
      .put(url, body, { headers })
      .subscribe(result => callback(result), err => callback(err));
  }

  deleteRequest(url, callback) {
    const headers = this.buildHeader();
    this.http
      .delete(url, { headers })
      .subscribe(result => callback(result), err => callback(err));
  }

  patchRequest(url, body, callback) {
    const headers = this.buildHeader();
    this.http
      .patch(url, body, { headers })
      .subscribe(result => callback(result), err => callback(err));
  }

  buildHeader() {
    let headers = new HttpHeaders();
    const bearerToken = sessionStorage.getItem("token");
    if (bearerToken) {
      headers = new HttpHeaders().set("Authorization", `Bearer ${bearerToken}`);
    }
    return headers;
  }
}
