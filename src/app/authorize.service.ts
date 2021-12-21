import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http: HttpClient) {

  }

  getAuthToken(name: string, password: string) {

    if (name == "admin" && password == "poc5238")
      return of({ valid: true, token: "zaybdwqssffgjgngnnsns" });
    else
      return of({ valid: false, token: "" });
    // return this.http.post("http://localhost:8080/api/v1/login", { name: name, password: password });
  }

}
