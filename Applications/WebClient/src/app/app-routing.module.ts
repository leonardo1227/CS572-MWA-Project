import { AnswerInvitationComponent } from "./components/answer-invitation/answer-invitation.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffComponent } from "./components/staff/staff.component";
import { CreateStaffComponent } from "./components/create-staff/create-staff.component";
import { ExamComponent } from "./components/exam/exam.component";
import { QuestionComponent } from "./components/question/question.component";

const routes: Routes = [
  { path: "staff", component: StaffComponent },
  { path: "createStaff", component: CreateStaffComponent },
  { path: "exam", component: ExamComponent },
  { path: "createQuestion", component: QuestionComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: AppComponent },
  { path: "answerInvitation", component: AnswerInvitationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
