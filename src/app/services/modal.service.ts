import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import Email from '../models/email.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public bsModalService: BsModalService, private _http: HttpClient) {

  }

   //Email
   sendEmail(email: Email): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Email/notify", email);
  }

}
