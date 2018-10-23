import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrackChangesDirective } from './directives/track-changes.directive';
import { ProgressVisorComponent } from './progress-visor/progress-visor.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { AceEditorComponent } from './components/exam-editor/exam-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackChangesDirective,
    ProgressVisorComponent,
    AceEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AceEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
