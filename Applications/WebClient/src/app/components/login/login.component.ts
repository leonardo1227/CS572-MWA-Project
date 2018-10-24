import { AuthenticationService } from "./../../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MainComponentService } from "src/app/services/mainComponentCommunication";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMsg: String;
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthenticationService,
    private route: Router,
    private mainComponent: MainComponentService
  ) {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    this.service.login(
      this.form.value.email,
      this.form.value.password,
      result => {
        if (result.error) {
          this.errorMsg = result.error;
          this.form.reset();
        } else {
          sessionStorage.setItem("token", result.token);
          sessionStorage.setItem("name-user", result.user.name);
          sessionStorage.setItem("email-user", result.user.email);
          sessionStorage.setItem("role-user", result.user.role);

          this.mainComponent.emitValue();
          this.route.navigate([""]);
        }
      }
    );
  }
}
