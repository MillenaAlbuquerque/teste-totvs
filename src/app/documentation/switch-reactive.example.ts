import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Switch } from '../components/switch/switch';

@Component({
  selector: 'app-exemplo-switch-reactive',
  imports: [Switch, ReactiveFormsModule],
  template: `<app-switch ariaLabel="Ativar notificações" [formControl]="notificacoes"></app-switch>`,
})
export class SwitchReactive {
  notificacoes = new FormControl(false, { nonNullable: true });
}
