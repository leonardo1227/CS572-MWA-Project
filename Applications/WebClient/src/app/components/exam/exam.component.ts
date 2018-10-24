import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  question1 : String;
  question2 : String;
  question3 : String;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:1001/questions').subscribe(data => {
      console.log(JSON.stringify(data));
       this.question1 = data[0].problemStatement;
       this.question2 = data[1].problemStatement;
       this.question3 = data[2].problemStatement;
    });
  }

}
