import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'role': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'actived': [false]
    })
  }

  ngOnInit() {
  }

  async submitForm() {
    this.http.post('http://localhost:1001/staff/', this.form.value).subscribe(
      result => {
        console.log('result')
        console.log(result)
        this.form.reset();
        this.router.navigate(['/']);
      }
    )

    
  }
}
