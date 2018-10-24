import { StaffGuard } from "./guards/staff.guard";
import { SendInvitationComponent } from "./components/send-invitation/send-invitation.component";
import { AnswerInvitationComponent } from "./components/answer-invitation/answer-invitation.component";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffComponent } from "./components/staff/staff.component";
import { ExamComponent } from "./components/exam/exam.component";
import { QuestionComponent } from "./components/question/question.component";
import { QuestionEditorComponent } from "./components/question-editor/question-editor.component";
import { LoginComponent } from "./components/login/login.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { UsersComponent } from "./components/users/users.component";
import { ErrorComponent } from "./components/error/error.component";
import { AdminGuard } from "./guards/admin.guard";
import { ExamGuard } from "./guards/exam.guard";

const routes: Routes = [
  { path: "staff", component: StaffComponent, canActivate: [AdminGuard] },
  {
    path: "createUser",
    component: CreateUserComponent,
    canActivate: [AdminGuard]
  },
  { path: "users", component: UsersComponent, canActivate: [AdminGuard] },
  { path: "exam", component: ExamComponent, canActivate: [ExamGuard] },
  {
    path: "createQuestion",
    component: QuestionComponent,
    canActivate: [AdminGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "editQuestion", component: QuestionEditorComponent },
  { path: "answerInvitation", component: AnswerInvitationComponent },
  {
    path: "sendInvitation",
    component: SendInvitationComponent,
    canActivate: [StaffGuard]
  },
  { path: "", component: AppComponent, canActivate: [AdminGuard] },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "error" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
