import { Directive, HostListener, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Directive({
  selector: '[trackChanges]'
})
export class TrackChangesDirective implements OnDestroy, OnInit {

  private checkSubscription: Subscription;

  public snapshots: Array<string>


  constructor(private el: ElementRef) {
    this.snapshots = new Array();
  }

  @HostListener('input') ngOnChanges() {
    console.log(this.el.nativeElement.value);
    this.snapshots.push(this.el.nativeElement.value);
  }

  autoSave(event) {
    console.log('Firing subscriber ');
    console.log(this.snapshots);
    if (this.snapshots.length > 0) {
      //TODO: send to DB
      this.snapshots.length = 0;
    }
  }

  ngOnInit(): void {
    this.checkSubscription = fromEvent(this.el.nativeElement, 'input').pipe(debounceTime(2000)).subscribe(e => this.autoSave(e))
  }

  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
  }

}
