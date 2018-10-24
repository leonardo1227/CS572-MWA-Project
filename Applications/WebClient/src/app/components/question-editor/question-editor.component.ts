import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {
  question1 : String;
  question2 : String;
  question3 : String;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:1001/questions/active').subscribe(data => {
      console.log(JSON.stringify(data));
      //  this.question1 = data[0].problemStatement;
      //  this.question2 = data[1].problemStatement;
      //  this.question3 = data[2].problemStatement;
    });
  }
}
