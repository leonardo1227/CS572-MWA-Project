import { Directive, HostListener, ElementRef, OnDestroy, OnInit, Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable()
@Directive({
  selector: '[trackChanges]'
})
export class TrackChangesDirective implements OnDestroy, OnInit {

  private checkSubscription: Subscription;
  public snapshots: Array<object>

  constructor(private el: ElementRef, public http: HttpClient) {
    this.snapshots = new Array();
  }

  testM() {
    console.log("retetinsss")
  }

  onChanges(value) {
    console.log(value);
    const currentTime = Date.now();
    const obj = { snap: value, time: currentTime, duration: 0 };
    this.snapshots.push(obj);
  }

  autoSave() {
    console.log('Firing subscriber ');
    console.log(this.snapshots);
    console.log(this.snapshots.length);
    if (this.snapshots.length > 0) {
      this.http.post('http://localhost:1001/exams/progress/1/1/1', this.snapshots).subscribe(
        result => {
          console.log('end...');
          //this.snapshots.length = 0;
          this.snapshots.splice(0, this.snapshots.length)
        },
        error => {
          console.error(error);
        });
    }
  }

  ngOnInit(): void {
    this.checkSubscription = fromEvent(this.el.nativeElement, 'input').pipe(debounceTime(2000)).subscribe(e => this.autoSave())
  }

  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
  }

}
