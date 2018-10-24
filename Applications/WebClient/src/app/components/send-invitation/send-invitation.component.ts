import { HttpRequestService } from "./../../services/http-request.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-send-invitation",
  templateUrl: "./send-invitation.component.html",
  styleUrls: ["./send-invitation.component.css"]
})
export class SendInvitationComponent implements OnInit {
  msg;
  displayedColumns: string[] = ["Id", "Email", "Action"];
  private dataSource;
  constructor(private httpRequest: HttpRequestService) {}

  ngOnInit() {
    this.httpRequest.getRequest(
      "http://localhost:1001/applicationprocesses",
      result => {
        this.dataSource = result;
      }
    );
  }

  sendInvitation(element) {
    this.httpRequest.postRequest(
      "http://localhost:1001/invitations/send",
      { applicationProcessId: element._id },
      result => {
        this.msg = `It was sent an invitation to ${
          element.prospectiveStudent.email
        }`;
        // console.log("invitation sent");
        // console.log(element);
      }
    );
  }
}
