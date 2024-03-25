import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseErrorHandlerInterceptor } from './interceptors/response-error-handler.interceptor';
import { SharedModule } from './shared/shared.module';


export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.apiUrl],
        },
      }
   )
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseErrorHandlerInterceptor,
        multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
