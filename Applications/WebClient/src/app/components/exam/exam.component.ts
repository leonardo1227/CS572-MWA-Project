import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  user = {}

  questions: object[];
  appId: string;
  examId: string;
  currentQuestionIndex: number = 0;
  question: object = {};
  editor:any;

  constructor(public http: HttpClient, private router: Router) { 
  }

  ngOnInit() {
    this.loadCredentials();

    this.appId = this.user['appId']
    this.examId = this.user['examId']
    this.http.get('http://localhost:1001/exams/' + this.appId + '/' + this.examId).subscribe(data => {
      if (data['questions']) {
        this.questions = data['questions'];
        this.loadQuestion();
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

  submitQuestion(editor) {
    if (this.currentQuestionIndex + 1 == this.questions.length) {
      this.logout();
      return;
    }
    this.currentQuestionIndex++;
    this.loadQuestion();
    editor.text = '';
  }
  logout() {
    this.user = {}
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  loadQuestion() {
    this.question = this.questions[this.currentQuestionIndex];
  }
}
