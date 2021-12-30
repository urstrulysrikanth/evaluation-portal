import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Engagement from '../models/engagement.model';
import Panel from '../models/panel.model';
import Report from '../models/report.model';
import { ReportDetail } from '../models/report.model';
import Candidate from '../models/candidate.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: any;
  httpHeaders: HttpHeaders;
  candidateData!: any[];

  constructor(private _http: HttpClient) {
    this.token = localStorage.getItem("token");
    // this.httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Cache-Control': 'no-cache',
    //   'Authorization': `Bearer ${this.token}`
    // });

    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
  }

  //Todo API calls

  //Engagement
  getEngagements(): Observable<Engagement[]> {
    return this._http.get<Engagement[]>("https://localhost:44368/api/Engagement");
  }

  addEngagement(engagement: Engagement): Observable<any> {
    //return this._http.post<any>("https://localhost:44368/api/Engagement", JSON.stringify(engagement), { headers: this.httpHeaders});
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
    return this._http.post<any>("https://localhost:44368/api/Panel", panel);
  }

  updatePanel(panel: Panel): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Panel", panel);
  }

  updatePanels(panel: Panel[]): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Panel", panel);
  }

  //Reports

  getReports(): Observable<Report[]> {
    return this._http.get<Report[]>("https://localhost:44368/api/Report");
  }

  getReportDetails(reportDetail: ReportDetail): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Report", reportDetail);
  }

  //Candidate

  addCandidates(candidate: Candidate[]): Observable<any> {
    return this._http.post<Candidate[]>("https://localhost:44368/api/Candidate", candidate);
  }

  getCandidates(): Observable<Candidate[]> {
    return this._http.get<Candidate[]>("https://localhost:44368/api/Candidate");
  }


  //Users

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>("https://localhost:44368/api/User");
  }

  addUser(user: User): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Engagement", user);
  }

  updateUser(user: User): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Engagement", user);
  }

  updateUsers(user: User[]): Observable<any> {
    return this._http.post<any>("https://localhost:44368/api/Engagement", user);
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

  getReportsTestData(): any[] {

    let dataset = [];
    dataset.push({ id: 1, reportName: "Profiles received", description: "Profiles received - can add more about report here" });
    dataset.push({ id: 2, reportName: "Profiles confirmed", description: "Profiles confirmed - can add more about report here" });
    dataset.push({ id: 3, reportName: "Profiles evaluated by week", description: "Profiles evaluated by week - can add more about report here" });
    dataset.push({ id: 4, reportName: "Profiles evaluated by month", description: "Profiles evaluated by month - can add more about report here" });
    return dataset;
  }

  getCandidatesTestData(): any[] {
    return this.candidateData;
  }

  getUsersTestData(): any[] {

    let users = ["Srikanth", "Prashant", "Saraswathi", "Syed", "Manoj", "Priya", "Nidhi"];
    let tcsEmailId = ["test1@tcs.com", "test2@tcs.com", "test3@tcs.com", "test4@tcs.com", "test5@tcs.com"];

    let clientEmailId = ["test1@client.com", "test2@client.com", "test3@client.com", "test4@client.com", "test5@client.com"];

    let role = ["Admin", "Evaluator"];
    let type = ["Admin", "TR", "MR", "TR or MR"];
    let mobile = ["9848022338", "6198741323", "97311102233", "90001234567"];

    const tmpArray: any[] = [];
    for (let i = 0; i < 200; i++) {
      tmpArray[i] = {
        id: i,
        name: users[Math.floor(Math.random() * users.length)],
        tcsEmailId: tcsEmailId[Math.floor(Math.random() * tcsEmailId.length)],
        clientEmailId: clientEmailId[Math.floor(Math.random() * clientEmailId.length)],
        role: role[Math.floor(Math.random() * role.length)],
        type: type[Math.floor(Math.random() * type.length)],
        mobile: mobile[Math.floor(Math.random() * mobile.length)]
      };
    }
    return tmpArray;
  }

  getCandidatesTestData1(): any[] {

    let dataset = [];
    dataset.push({ id: 1, candidateName: "Srikanth", epNumber: "EP2021CN123456" });
    dataset.push({ id: 2, candidateName: "Saraswathi", epNumber: "EP2021CN354879" });
    dataset.push({ id: 3, candidateName: "Prashant", epNumber: "EP2021CN6874123" });
    return dataset;
  }

}
