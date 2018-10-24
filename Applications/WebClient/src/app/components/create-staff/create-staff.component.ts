import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public http: HttpClient) {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'role': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required],
      'actived': ['']
    })
  }

  ngOnInit() {
  }

  async submitForm() {
    this.http.post('http://localhost:1001/staff/', this.form.value).subscribe(
      result => {
        console.log('result')
        console.log(result)
      }
    )

    
  }
}
