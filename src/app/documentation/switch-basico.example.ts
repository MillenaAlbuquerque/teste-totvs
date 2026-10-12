import { Component } from '@angular/core';
import { Switch } from '../components/switch/switch';

@Component({
  selector: 'app-exemplo-switch-basico',
  imports: [Switch],
  template: `<app-switch ariaLabel="Ativar notificações" (valorAlterado)="notificacoesAtivas = $event"></app-switch>`,
})
export class SwitchBasico {
  notificacoesAtivas = false;
}
