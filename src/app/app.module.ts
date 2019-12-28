import { CalculateMarksService } from './shared/services/calculate-marks/calculate-marks.service';
import { LoaderService } from './shared/services/loader-service/loader.service';
import { HttpService } from './shared/services/http-service/http.service';
import { ApiService } from './shared/services/api-service/api.service';
import { AuthService } from './shared/services/auth-service/auth.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './shared/components/main-nav/main-nav.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { NavbarService } from './shared/services/navbar-service/navbar.service';
import { SharedModule } from './shared/services/shared.module';
import { ErrorServiceService } from './shared/services/error-service/error-service.service';
import { ResultsComponent } from './results/results.component';
import { MarksSheetComponent } from './marks-sheet/marks-sheet.component';
import { RaiseIssueFormComponent } from './raise-issue-form/raise-issue-form.component';
import { ProgressComponent } from './progress/progress.component';
import { SigninDialogComponent } from './shared/components/signin-dialog/signin-dialog.component';
import { httpInterceptorProviders } from './shared/services/interceptor-service';
import { AnswerHelperService } from './section/shared/answer-helper/answer-helper.service';
import { ProfileComponent } from './profile/profile.component';
import { FileSharingComponent } from './file-sharing/file-sharing.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    MainNavComponent,
    SignInComponent,
    ResultsComponent,
    MarksSheetComponent,
    RaiseIssueFormComponent,
    ProgressComponent,
    SigninDialogComponent,
    ProfileComponent,
    FileSharingComponent,


  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,

  ],
  entryComponents: [
    SnackBarComponent,
    SigninDialogComponent,
    RaiseIssueFormComponent],
  providers: [
    AuthService,
    ApiService,
    HttpService,
    NavbarService,
    Title,
    LoaderService,
    ErrorServiceService,
    CalculateMarksService,
    httpInterceptorProviders,
    AnswerHelperService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
