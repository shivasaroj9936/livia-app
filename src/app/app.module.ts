import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AddressPopupComponent } from './components/address-popup/address-popup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupConfirmationComponent } from './components/signup-confirmation/signup-confirmation.component';
import { LogoutPopupComponent } from './components/logout-popup/logout-popup.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { EmptyFieldPipePipe } from './customPipe/emptyFieldPipe/empty-field-pipe.pipe';
import { AcceptTestComponent } from './components/accept-test/accept-test.component';
import { InsuranceDetailComponent } from './components/insurance-detail/insurance-detail.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    AddressPopupComponent,
    SignupConfirmationComponent,
    LogoutPopupComponent,
    ForgetPasswordComponent,
    EmptyFieldPipePipe,
    AcceptTestComponent,
    InsuranceDetailComponent,
    VerifyOtpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgOtpInputModule,
    SharedModuleModule
  ],
  providers:[{provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
