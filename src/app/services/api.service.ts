import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engagement, Panel } from '../models/portal.model';

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

    return this._http.get<Engagement[]>("https://localhost:44368/api/Engagement");
  }

  addEngagement(engagement: Engagement): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Engagement", engagement);

  }

  updateEngagement(engagement: Engagement): Observable<any> {

    return this._http.post<any>("https://localhost:44368/api/Engagement", engagement);

  }

  updateEngagements(engagement: Engagement[]): Observable<any> {

    return this._http.post<any>("https://localhost:44368/api/Engagement", engagement);

  }

  //Panel

  getPanels(): Observable<Panel[]> {

    return this._http.get<Panel[]>("https://localhost:44368/api/Panel");
  }

  addPanel(panel: Panel): Observable<any> {
    debugger;
    return this._http.post<any>("https://localhost:44368/api/Panel", panel);

  }

  updatePanel(panel: Panel): Observable<any> {

    return this._http.post<any>("https://localhost:44368/api/Panel", panel);

  }

  updatePanels(panel: Panel[]): Observable<any> {
    debugger;
    return this._http.post<any>("https://localhost:44368/api/Panel", panel);

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

  getPanelsTestData(): any[] {

    let timeZones = ["IST", "ADT"];

    const tmpArray: any[] = [];
    for (let i = 0; i < 250; i++) {
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
        candidateName: 'Candidate' + i,
        panelDate: new Date(randomYear, randomMonth, randomDay, randomDay, randomTime, randomTime, randomTime),
        panelTimeZone: timeZones[Math.floor(Math.random() * timeZones.length)],
        timeAndDate: new Date(randomYear, randomMonth, randomDay, randomDay, randomTime, randomTime, randomTime),
        trEmailId: 'tr' + i + '@tr.com',
        trEmployeeId: Math.floor(Math.random()) * (i + 1) * 1111,
        trMobile: Math.floor(Math.random()) * (i + 1) * 1111,
        mrEmailId: 'mr' + i + '@mr.com',
        mrEmployeeId: Math.floor(Math.random()) * (i + 1) * 1111,
        mrMobile: Math.floor(Math.random()) * (i + 1) * 1111,
      };
    }
    return tmpArray;
  }


}
