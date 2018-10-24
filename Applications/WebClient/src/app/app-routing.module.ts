import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffComponent } from "./components/staff/staff.component";
import { ExamComponent } from "./components/exam/exam.component";
import { QuestionComponent } from "./components/question/question.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
  { path: "staff", component: StaffComponent },
  { path: 'createUser', component: CreateUserComponent},
  { path: 'users', component: UsersComponent},
  { path: "exam", component: ExamComponent },
  { path: "createQuestion", component: QuestionComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
