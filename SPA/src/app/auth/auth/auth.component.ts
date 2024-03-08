import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../shared/modal.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
constructor(public Modal: ModalService) {}
ngOnInit(): void {
  this.Modal.Register("auth")
}
ngOnDestroy(): void {
  this.Modal.UnRegister("auth")
}
}
