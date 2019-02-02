import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountCreateComponent } from './account-create/account-create.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    AccountCreateComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ''
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
