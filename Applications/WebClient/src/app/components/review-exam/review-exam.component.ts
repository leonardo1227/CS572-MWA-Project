import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review-exam',
  templateUrl: './review-exam.component.html',
  styleUrls: ['./review-exam.component.css']
})
export class ReviewExamComponent implements OnInit {

  private progressArray: Array<object>

  constructor(public http: HttpClient) { 
    this.progressArray = new Array();
  }

  ngOnInit() {
    this.http.get('http://localhost:1001/exams/1/1').subscribe(
      data => {
        this.progressArray = data['questions'][0].snapshots;
        console.log(this.progressArray)
      },
      err => console.error(err)
    )
  }

}
