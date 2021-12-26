import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  to!: string;
  subject!: string;
  body!: string;

  modalRef!: BsModalRef;

  email !: any;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {

    this.email = {
      to: this.to,
      subject: this.subject,
      body: this.body
    }
    $(".modal-content").css({ "width": "1000px", "right": "25%" });
  }

  onSend() {
    debugger;
    let emailObject = this.email;
    emailObject.to = this.email.to;
    emailObject.name = "Srikanth";
    this.modalService.sendEmail(emailObject).subscribe(
      data => {
        let res: any = data;
        $("#mailsent").text('Mail has been sent successfully to ' + this.email.to);
        this.modalRef.hide();
        $("#mailsent").show();
        $("#mailsent").fadeOut(6000);

      },
      err => {
        console.log(err);
      }, () => {
      }
    );
  }

}
