import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Switch } from '../components/switch/switch';

@Component({
  selector: 'app-exemplo-switch-ngmodel',
  imports: [Switch, FormsModule],
  template: `<app-switch ariaLabel="Ativar notificações" [(ngModel)]="notificacoesAtivas"></app-switch>`,
})
export class SwitchNgModel {
  notificacoesAtivas = false;
}
