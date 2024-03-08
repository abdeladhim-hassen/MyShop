import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter, // Implement your token retrieval logic
          allowedDomains: [environment.apiUrl], // Add your domain(s) here
        },
      }
   )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
