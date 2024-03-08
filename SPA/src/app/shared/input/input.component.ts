import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: any = {};
  @Input() Control: FormControl = new FormControl();
  @Input() inputType: string = 'text';
  @Input() options: any[] = [];
  @Input() format = ''
  keys(): string[] 
    {
      return Object.keys(this.errorMessage)
    }
}
