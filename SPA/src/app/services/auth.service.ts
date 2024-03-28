import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { UserChangePassword } from '../DTOs/UserChangePassword';
import { ServiceResponse } from '../DTOs/ServiceResponse';
import { UserLogin } from '../DTOs/UserLogin';
import { UserRegister } from '../DTOs/UserRegister';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BaseUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {}

  changePassword(request: UserChangePassword): Observable<ServiceResponse<boolean>> {
    return this.http.post<ServiceResponse<boolean>>(`${this.BaseUrl}/change-password`, request.password);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.BaseUrl}/check-email-exists/${email}`);
  }

  isUserAuthenticated(): Observable<boolean>
  {
    const token = localStorage.getItem('token')
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return of(true);
    }
    else {
      return of(false)
    }
  }

  login(request: UserLogin): Observable<ServiceResponse<string>> {
    return this.http.post<ServiceResponse<string>>
      (`${this.BaseUrl}/login`, request).pipe(
      map((response: ServiceResponse<string>) => {
        if (!response.data) {
          throw new Error('Wrong credentials');
        }
        localStorage.setItem('token', response.data);
        return response;
      })
    );
  }

  register(request: UserRegister): Observable<ServiceResponse<number>> {
    return this.http.post<ServiceResponse<number>>(`${this.BaseUrl}/register`, request);
  }

  logout($event?: Event)
  {
    if ($event) {
      $event.preventDefault();
    }
    localStorage.removeItem("token");
  }


}
