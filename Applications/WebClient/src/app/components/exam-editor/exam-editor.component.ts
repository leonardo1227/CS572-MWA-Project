import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, ContentChild } from '@angular/core/';
import { TrackChangesDirective } from '../../directives/track-changes.directive';

@Component({
  selector: 'exam-editor',
  templateUrl: './exam-editor.component.html',
  styleUrls: ['./exam-editor.component.css']
})
export class AceEditorComponent implements AfterViewInit {
  @ContentChild(TrackChangesDirective) trackChanges: TrackChangesDirective;
  @ViewChild('editor') editor;
  text: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });
  }

  onChange(code) {
    this.trackChanges.onChanges(code);
  }

}
