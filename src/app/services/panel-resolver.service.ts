import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})


export class PanelResolverService implements Resolve<any> {
  constructor(private apiService: ApiService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.apiService.getTrAndMrUsers().pipe(
      catchError(error => {
        return of('No data');
      })
    );
  }
}