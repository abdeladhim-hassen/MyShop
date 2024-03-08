import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../DTOs/UserLogin';
import { ServiceResponse } from '../../DTOs/ServiceResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: UserLogin  = {
    email: '',
    password: ''
  };

  showAlert = false
  alertMsg = 'Veuillez patienter pendant que nous vous connectons.'
  alertColor = 'blue'
  inSubmission = false

  constructor(private auth: AuthService) { }

  login() {
    this.showAlert = true;
    this.alertMsg = 'Veuillez patienter pendant que nous vous connectons.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    this.auth.login(this.user).subscribe({
      next: (response: ServiceResponse<string>) => {
        this.handleLoginResponse(response);
      },
      error: (error) => {
        console.error(error);
        this.handleLoginError(error);
      },
      complete: () => {
        // Facultatif : Gérez la logique de complétion si nécessaire
      }
    });
  }

  private handleLoginResponse(response: ServiceResponse<string>): void {
    this.alertMsg = response.message;
    this.alertColor = response.success ? 'green' : 'red';
    this.inSubmission = false;
  }

  private handleLoginError(error: any): void {
    this.alertMsg = error.error.message || 'Quelque chose s\'est mal passé.';
    this.alertColor = 'red';
    this.inSubmission = false;
  }
}
