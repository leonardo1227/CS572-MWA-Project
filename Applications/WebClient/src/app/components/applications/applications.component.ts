import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'studentEmail', 'review'];
  private dataSource: object[];

  constructor(private route: Router,public http: HttpClient) {
    this.dataSource = []
  }

  ngOnInit() {
    this.http.get('http://localhost:1001/applicationProcesses').subscribe(
      (result: any[]) => {
        this.dataSource = result;
      }
    )
  }

  reviewExam(element) {
    console.log(element)
    this.route.navigate(['reviewExam'])
  }

}
