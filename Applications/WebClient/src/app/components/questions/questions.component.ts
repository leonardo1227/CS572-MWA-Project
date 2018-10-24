import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  private dataSource: object[];
  displayedColumns: string[] = ['question', 'status'];

  constructor(public http: HttpClient) {
    this.dataSource = []
  }

  ngOnInit() {
    this.http.get('http://localhost:1001/questions').subscribe(
      (result:any) => {
        console.log(result)
        this.dataSource = result;
      }
    )
  }

  switchStatus(element) {
    const body = {
      id:element._id,
      value: !element.actived
    }
    console.log(body)
    this.http.patch('http://localhost:1001/questions',body).subscribe(
      (result) => {
        element.actived = result['value'];
      }
    )
  }

}
