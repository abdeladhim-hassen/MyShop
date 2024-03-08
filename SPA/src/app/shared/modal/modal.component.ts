import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() ModalID: string = ""
constructor(public Modal: ModalService, public El: ElementRef) {

}
ngOnInit(): void {
  document.body.appendChild(this.El.nativeElement)
}
closeModal(){
  this.Modal.ToggleModal(this.ModalID)
}
ngOnDestroy(): void {
  document.body.removeChild(this.El.nativeElement)
}

}
