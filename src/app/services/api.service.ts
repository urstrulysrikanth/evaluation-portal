import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {

  }


  getEngagements(): any[] {

    // return this._http.get("http://localhost:8080/api/v1/login", { name: name, password: password });

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
        engagementname: engagements[Math.floor(Math.random() * engagements.length)],
        skill: skills[Math.floor(Math.random() * skills.length)],
        experience: Math.floor(Math.random() * 10) + 2,
        noOfPositions: Math.floor(Math.random() * 10) + 2,
        tobeclosedby: new Date(randomYear, randomMonth, randomDay, randomDay, randomTime, randomTime, randomTime),
        location: locations[Math.floor(Math.random() * locations.length)]
      };
    }
    return tmpArray;
  }
}
