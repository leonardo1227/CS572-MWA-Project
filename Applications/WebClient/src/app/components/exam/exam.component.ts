import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  user = {}

  questions: object[];
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.loadCredentials();

    const appId = this.user['appId']
    const examId = this.user['examId']
    console.log(this.user)
    this.http.get('http://localhost:1001/exams/' + appId + '/' + 1).subscribe(data => {
      console.log(data)
      if (data['questions']) {
        this.questions = data['questions'];
      }
    });
  }

  loadCredentials() {
    this.user = {};
    const email = sessionStorage.getItem('email')
    if (email) {
      this.user['examId'] = sessionStorage.getItem('examId')
      this.user['appId'] = sessionStorage.getItem('applicationProcessId')
    }
  }

}
