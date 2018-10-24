import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffComponent } from "./components/staff/staff.component";
import { CreateStaffComponent } from "./components/create-staff/create-staff.component";

const routes: Routes = [
  { path: "staff", component: StaffComponent },
  { path: "createStaff", component: CreateStaffComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
