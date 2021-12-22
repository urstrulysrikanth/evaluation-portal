import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engagement } from '../models/portal.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: any;
  httpHeaders: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.token = localStorage.getItem("token");
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${this.token}`
    });
  }

  //Todo API calls

  //Engagement
  getEngagements(): Observable<Engagement[]> {

    return this._http.get<Engagement[]>("http://localhost:8080/api/v1/login");
  }

  addEngagement(engagement: Engagement): Observable<any> {
    return this._http.post<any>("http://localhost:8080/api/v1/login", engagement, { headers: this.httpHeaders });

  }

  updateEngagement(engagement: Engagement): Observable<any> {

    return this._http.post<any>("http://localhost:8080/api/v1/login", engagement, { headers: this.httpHeaders });

  }

  updateEngagements(engagement: Engagement[]): Observable<any> {

    return this._http.post<any>("http://localhost:8080/api/v1/login", engagement, { headers: this.httpHeaders });

  }



  // Test data dummy
  getEngagementsTestData(): any[] { 
    let skills = ["Dot Net", "JAVA",
      "Mainframes", "BigData", "Angular", "React", "Dot Net Core",];

    let engagements = ["Engagement 1", "Engagement 2",
      "Engagement 3", "Engagement 4", "Engagement 5", "Engagement 6", "Engagement 7"];
    let locations = ["OnShore", "OffShore"];

    const tmpArray: any[] = [];
    for (let i = 0; i < 200; i++) {
      const randomYear = 2021 + Math.floor(Math.random() * 2);
      const randomFinishYear = (new Date().getFullYear()) + Math.floor(Math.random() * 10); // use only years not lower than 3 years ago
      const randomMonth = Math.floor(Math.random() * 11);
      const randomDay = Math.floor((Math.random() * 29));
      const randomTime = Math.floor((Math.random() * 59));
      const randomFinish = new Date(randomFinishYear, (randomMonth + 1), randomDay, randomTime, randomTime, randomTime);
      const randomPercentComplete = Math.floor(Math.random() * 100) + 15; // make it over 15 for E2E testing purposes
      const percentCompletion = randomPercentComplete > 100 ? (i > 5 ? 100 : 88) : randomPercentComplete; // don't use 100 unless it's over index 5, for E2E testing purposes
      const isCompleted = percentCompletion === 100;

      tmpArray[i] = {
        id: i,
        name: engagements[Math.floor(Math.random() * engagements.length)],
        skillSet: skills[Math.floor(Math.random() * skills.length)],
        experience: Math.floor(Math.random() * 10) + 2,
        numberOfPositions: Math.floor(Math.random() * 10) + 2,
        closeBy: new Date(randomYear, randomMonth, randomDay, randomDay, randomTime, randomTime, randomTime),
        location: locations[Math.floor(Math.random() * locations.length)]
      };
    }
    return tmpArray;
  }
}
