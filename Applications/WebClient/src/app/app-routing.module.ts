import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ExamComponent } from './components/exam/exam.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'staff', component: StaffComponent},
  { path: 'createUser', component: CreateUserComponent},
  { path: 'users', component: UsersComponent},
  { path: 'exam', component: ExamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
