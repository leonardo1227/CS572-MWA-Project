import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  getRequest(url, callback) {
    const headers = new HttpHeaders();

    const bearerToken = sessionStorage.getItem("token");
    if (bearerToken) {
      headers.set("Authorization", `Bearer ${bearerToken}`);
    }

    this.http
      .get(url, { headers })
      .subscribe(result => callback(result), err => callback(err));
  }
}
