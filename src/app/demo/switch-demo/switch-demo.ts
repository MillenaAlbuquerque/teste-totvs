import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoCheckboxModule } from '@po-ui/ng-components';
import { Switch } from '../../components/switch/switch';
@Component({
  selector: 'app-switch-demo',
  imports: [FormsModule, PoCheckboxModule, Switch],
  templateUrl: './switch-demo.html',
  styleUrl: './switch-demo.scss',
})
export class SwitchDemo {
  temaEscuro = input(false);
  switchAtivo = false;
  switchDesabilitado = false;
  switchAriaLabel = 'Ativar notificações';
  switchCorLigado = '#4444a0';
  switchCorTrilha = '#9797cd';
}
