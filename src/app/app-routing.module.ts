import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsFeedbackComponent } from './actions-feedback/actions-feedback.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { EngagementComponent } from './engagement/engagement.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { ChartComponent } from './report/chart/chart.component';

const routes: Routes = [
  {
    path: 'ep', component: HomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: 'engagement', component: EngagementComponent },
      { path: 'report-view', component: ChartComponent },
      { path: 'reports', component: ReportDetailComponent },
      { path: 'panel', component: PanelComponent },
      { path: 'actions-feedback', component: ActionsFeedbackComponent },
      { path: 'user-management', component: UserManagementComponent }
    ]
  },
  {
    path: '**', component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
