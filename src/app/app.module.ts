import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiCaller } from '../services/ApiCaller';
import { CookieManager } from '../services/CookieManager';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { DataHolder } from '../services/DataHolder';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    AccountCreateComponent,
    PostsComponent,
    PostComponent
  ],
  providers: [
    ApiCaller,
    CookieManager,
    DataHolder,
    {
      provide: APP_BASE_HREF,
      useValue: ''
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
