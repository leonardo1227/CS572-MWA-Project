import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-visor',
  templateUrl: './progress-visor.component.html',
  styleUrls: ['./progress-visor.component.css']
})
export class ProgressVisorComponent implements OnInit {

  @Input() snapshots: Array<object>
  private counterFrame: number = -1
  private data: string;
  private currentTimer: any;

  constructor() { }

  ngOnInit() {
  }

  play() {
    if (this.snapshots.length == 0)
      return
    
      this.counterFrame = 0;

    this.startSequence();
  }

  startSequence() {
    const element = this.snapshots[++this.counterFrame]
    this.data = element['snap'];

    this.currentTimer = setTimeout(() => {      
      if (element['duration'] > 0) {
        this.startSequence();
      } else {
        console.log('stopped')
      }
    }, element['duration'])
  }


  stop() {
    clearTimeout(this.currentTimer);
    this.counterFrame = 0;
    this.updateScreen()
  }

  forward() {
    if (this.counterFrame + 1 > this.snapshots.length - 1) return;
    this.counterFrame++;
    this.updateScreen()
  }

  backward() {
    if (this.counterFrame - 1 < 0) return;
    this.counterFrame--;
    this.updateScreen()
  }

  updateScreen() {
    this.data = this.snapshots[this.counterFrame]['snap'];
  }

}
