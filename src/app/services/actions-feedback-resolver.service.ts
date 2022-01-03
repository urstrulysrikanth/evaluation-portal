import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsFeedbackResolverService implements Resolve<any>  {

  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    return forkJoin([
      this.apiService.getEngagements(),
      this.apiService.getTrAndMrUsers(),
      this.apiService.getNonRejectedCandidates()
    ]).pipe(catchError(error => {
      return of('No data');
    })
    );
  }
}