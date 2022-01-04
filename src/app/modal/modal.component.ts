import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Email from '../models/email.model';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  toEmail!: string;
  subject!: string;
  body!: string;

  modalRef!: BsModalRef;

  email !: any;

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {

    this.email = {
      toEmail: this.toEmail,
      subject: this.subject,
      body: this.body
    }
    $(".modal-content").css({ "width": "1000px", "right": "25%" });
  }

  onSend() {
    let email: Email = new Email();
    email.ToEmail =this.email.toEmail;
    email.Subject =this.email.subject;
    email.Body =this.email.body;

    this.modalService.sendEmail(email)
    .subscribe(data=> {
      $("#mailsent").text('Mail has been sent successfully to ' +  email.ToEmail);
        this.modalRef.hide();
        $("#mailsent").show();
        $("#mailsent").fadeOut(6000);
    }, error =>{
      console.log(error);
    });
 
  }

}
