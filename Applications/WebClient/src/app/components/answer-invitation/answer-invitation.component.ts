import { HttpRequestService } from "./../../services/http-request.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-answer-invitation",
  templateUrl: "./answer-invitation.component.html",
  styleUrls: ["./answer-invitation.component.css"]
})
export class AnswerInvitationComponent implements OnInit {
  private spinning: boolean;
  private msg: string;
  constructor(
    private route: ActivatedRoute,
    private requestService: HttpRequestService,
    private r: Router
  ) {
    this.spinning = true;
    route.queryParams
      .subscribe(param => {
        let url = `http://localhost:1001/invitations/answer?cod=${param.cod}`;
        requestService.getRequest(url, result => {
          if (result.token) {
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem(
              "applicationProcessId",
              result.applicationProcess.applicationProcessId
            );
            sessionStorage.setItem("examId", result.applicationProcess.examId);
            sessionStorage.setItem("email", result.applicationProcess.email);
            sessionStorage.setItem("role-user", "ProspectiveStudent");
            this.r.navigate(["exam"]);
          } else {
            this.spinning = false;
            this.msg = result.error;
          }
        });
      })
      .unsubscribe();
  }

  ngOnInit() {}
}
