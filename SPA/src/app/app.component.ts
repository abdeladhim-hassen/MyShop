import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public auth: AuthService){}
  ngOnInit(): void {
    initFlowbite();
  }
}
