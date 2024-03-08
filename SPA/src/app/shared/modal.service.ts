import { Injectable } from '@angular/core';
interface IModal {
  Id: string
  Visibility:boolean
}
@Injectable({
  providedIn: 'root'
})

export class ModalService {
private modals: IModal[] = []
  constructor() { }
Register(Id:string)
{
  this.modals.push({
    Id,
    Visibility: false
  })
}
UnRegister(Id: string)
{
  this.modals = this.modals.filter(x => x.Id !== Id)
}
IsModalOpen(id: string): boolean{
  return Boolean(this.modals.find(x => x.Id == id)?.Visibility)
}
ToggleModal(id: string){
 const element = this.modals.find(x => x.Id == id)
 if(element)
 {
  element.Visibility = ! element.Visibility
 }
}
}
