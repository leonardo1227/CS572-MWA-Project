import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './components/staff/staff.component';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import { ExamComponent } from './components/exam/exam.component';

const routes: Routes = [
  { path: 'staff', component: StaffComponent},
  { path: 'createStaff', component: CreateStaffComponent},
  { path: 'exam', component: ExamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
