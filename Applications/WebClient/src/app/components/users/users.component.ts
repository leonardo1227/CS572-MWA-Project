import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserRow {
  _id?: number;
  name: string;
  role: string;
  email: string;
  actived: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'role', 'email', 'status'];
  private dataSource: UserRow[];

  constructor(public http: HttpClient) {
    this.dataSource = []
  }


  ngOnInit() {
    this.http.get('http://localhost:1001/staff').subscribe(
      (result: UserRow[]) => {
        this.dataSource = result;
      }
    )
  }

  switchStatus(element) {
    const body = {
      id:element._id,
      value: !element.actived
    }
    this.http.patch('http://localhost:1001/staff',body).subscribe(
      (result) => {
        element.actived = result['value'];
      }
    )
  }

}
