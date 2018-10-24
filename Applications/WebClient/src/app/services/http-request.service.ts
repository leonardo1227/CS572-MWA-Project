import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpRequestService {
  constructor(private http: HttpClient) {}

  // get(url: string, headers: HttpHeaders) {
  //   if (headers) {
  //     return this.http.get(url,headers);
  //   } else {
  //     return this.http.get(url);
  //   }
  // }

  // post(url: string, body: Object, headers:HttpHeaders) {
  //   if(headers){
  //     return this.http.options(url,headers,)
  //   }else{
  //     return this.http.options(url);
  //   }
  // }
}
