import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as ace from '../syntaxhighlighter/src-noconflict/ace.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebClient';
  private progressArray: Array<object>

  constructor(public http: HttpClient) {
    this.progressArray = new Array();
  }

  ngOnInit(): void {
    
    this.http.get('http://localhost:1001/exams/1/1').subscribe(
      data => {
        this.progressArray = data['questions'][0].snapshots;
        console.log(this.progressArray)
      },
      err => console.error(err)
    )
  }
}
