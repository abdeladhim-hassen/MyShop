import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../DTOs/UserRegister';
import { ServiceResponse } from '../../DTOs/ServiceResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService,
              private EmailTaken: EmailTaken) {}

  ngOnInit(): void {

  }
  email = new FormControl('', [ Validators.required,Validators.email], [this.EmailTaken.validate]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPassword = new FormControl('', [Validators.required]);


  RegisterForm = new FormGroup({
    Email: this.email,
    Password: this.password,
    ConfirmPassword: this.confirmPassword,

  },[RegisterValidators.match('Password','ConfirmPassword')]);

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'
  insubmition = false

  register() {
    this.showAlert = true;
    this.alertMsg = 'Veuillez patienter pendant que nous vous connectons.';
    this.alertColor = 'blue';


    this.auth.register(this.RegisterForm.value as UserRegister).subscribe({
      next: (response: ServiceResponse<number>) => {
        this.handleRegisterResponse(response);
      },
      error: (error) => {
        console.error(error);
        this.handleRegisterError(error);
      },
      complete: () => {
        // Facultatif : Gérez la logique de complétion si nécessaire
      }
    });
  }

  private handleRegisterResponse(response: ServiceResponse<number>): void {
    this.alertMsg = response.message;
    this.alertColor = response.success ? 'green' : 'red';
  }

  private handleRegisterError(error: any): void {
    this.alertMsg = error.error.message || 'Quelque chose s\'est mal passé.';
    this.alertColor = 'red';
  }

}
