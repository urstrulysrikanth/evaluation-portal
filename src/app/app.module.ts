import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EngagementComponent } from './engagement/engagement.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridModule } from './modules/angular-slickgrid';
import { ReportsComponent } from './reports/reports.component';
import { PanelComponent } from './panel/panel.component';
import { ActionsFeedbackComponent } from './actions-feedback/actions-feedback.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ModalComponent } from './modal/modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuillModule } from 'ngx-quill';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { ReportDetailViewComponent } from './report/reportdetail-view/reportdetail-view.component';
import { ReportDetailPreloadComponent } from './report/reportdetail-preload/reportdetail-preload.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EngagementComponent,
    ReportsComponent,
    PanelComponent,
    ActionsFeedbackComponent,
    UserManagementComponent,
    ModalComponent,
    ReportDetailComponent,
    ReportDetailViewComponent,
    ReportDetailPreloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: '#grid-container',
        rightPadding: 10
      }
    })
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
