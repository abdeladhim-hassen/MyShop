import { Component } from '@angular/core';
import { ModalService } from '../../shared/modal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    public Model: ModalService,
    public auth: AuthService,
   ) {}
  OppenModel($event: Event){
  $event.preventDefault()
  this.Model.ToggleModal("auth")
  }
}
