import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public bsModalService: BsModalService, private _http: HttpClient) {

  }


  openModal(emailTo: any, emailCc: any, body: string) {
    // let bodyText = " <h1><u>Heading Of Message</u></h1> <h4>Subheading</h4> <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain                        was born and I will give you a complete account of the system, and expound the actual teachings                        of the great explorer of the truth, the master-builder of human happiness. No one rejects,                        dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know                        how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again                        is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,                        but because occasionally circumstances occur in which toil and pain can procure him some great                        pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise,                        except to obtain some advantage from it? But who has any right to find fault with a man who                        chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that                        produces no resultant pleasure? On the other hand, we denounce with righteous indignation and                        dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so                        blinded by desire, that they cannot foresee</p>                      <ul>                        <li>List item one</li>                        <li>List item two</li>                        <li>List item three</li>                        <li>List item four</li>                      </ul>                      <p>Thank you,</p>                      <p>John Doe</p> ";
    let bodyText = "<p>Hi,</p><p>Manoj Nandan has assigned the below profiles for evaluation.</p><ol>" + body + "</ol><p>Kindly login and proceed with the evaluation.</p><p>Thanks</p>"
    const initialState = { subject: "Evaluation - Pending", to: emailTo, body: bodyText };
    let modalRef = this.bsModalService.show(ModalComponent, { initialState: initialState });
    if (modalRef && modalRef.content) {
      modalRef.content.modalRef = modalRef;
    }
  }

  sendEmail(emailObject: any) {
    // Todo API call
    return this._http.post<any>("https://localhost:44368/api/Panel", emailObject);
  }

}
