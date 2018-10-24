import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { TrackChangesDirective } from "./directives/track-changes.directive";
import { ProgressVisorComponent } from "./components/progress-visor/progress-visor.component";
import { AceEditorModule } from "ng2-ace-editor";
import { AceEditorComponent } from "./components/exam-editor/exam-editor.component";
import { StaffComponent } from "./components/staff/staff.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainMaterialModule } from "./modules/material.module";
import { ExamComponent } from "./components/exam/exam.component";
import { QuestionComponent } from "./components/question/question.component";
import { LoginComponent } from "./components/login/login.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { UsersComponent } from "./components/users/users.component";

@NgModule({
  declarations: [
    AppComponent,
    TrackChangesDirective,
    ProgressVisorComponent,
    AceEditorComponent,
    StaffComponent,
    CreateUserComponent,
    ExamComponent,
    UsersComponent,
    QuestionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MainMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
