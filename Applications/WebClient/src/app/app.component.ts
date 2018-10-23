import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    console.log('initttt ')
    console.log(this.http)
    this.http.get('http://localhost:1001/exams/1/1').subscribe(
      data => {
        this.progressArray = data['questions'][0].snapshots;
        console.log(this.progressArray)
      },
      err => console.error(err)
    )

    /*this.progressArray.push({ progress: 'a' })
    this.progressArray.push({ progress: 'as' })
    this.progressArray.push({ progress: 'asd' })
    this.progressArray.push({ progress: 'asde' })
    this.progressArray.push({ progress: 'asde ' })
    this.progressArray.push({ progress: 'asde f' })*/
  }
}
