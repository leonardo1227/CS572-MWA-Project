import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MainComponentService } from './services/mainComponentCommunication';
//import * as ace from '../syntaxhighlighter/src-noconflict/ace.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user = {}
  
  //private progressArray: Array<object>

  constructor(public http: HttpClient, private router: Router, private mainComponent: MainComponentService) {
    //this.progressArray = new Array();
  }

  ngOnInit(): void {
    this.mainComponent.emitter.subscribe(() => this.loadCredentials());
    this.loadCredentials();
    /*
    this.http.get('http://localhost:1001/exams/1/1').subscribe(
      data => {
        this.progressArray = data['questions'][0].snapshots;
        console.log(this.progressArray)
      },
      err => console.error(err)
    )*/
 
  }

  loadCredentials() {
    this.user = {};
    const userName = sessionStorage.getItem('name-user')
    if(userName){
        this.user['name'] = sessionStorage.getItem('name-user')
        this.user['role'] = sessionStorage.getItem('role-user')
    }
  }

  logout(){
    sessionStorage.clear();
    this.user = {};
    this.router.navigate(['login'])
  }
}
