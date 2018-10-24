import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder, public http: HttpClient) {
    this.form = this.fb.group({
      'question': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'actived': [false]
    })
  }

  ngOnInit() {
  }

  async submitForm() {
    this.http.post('http://localhost:1001/questions/', this.form.value).subscribe(
      result => {
        console.log(result)
      }
    ) 
}
}
