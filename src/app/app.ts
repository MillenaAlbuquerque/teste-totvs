import { Component } from '@angular/core';
import { PoTabsModule } from '@po-ui/ng-components';
import { ComponentDocumentation } from './documentation/documentation';
import { DemoHeader } from './demo/demo-header/demo-header';
import { DemoMenu } from './demo/demo-menu/demo-menu';
import { SelectDemo } from './demo/select-demo/select-demo';
import { SwitchDemo } from './demo/switch-demo/switch-demo';

@Component({
  selector: 'app-root',
  imports: [ComponentDocumentation, PoTabsModule, DemoHeader, DemoMenu, SelectDemo, SwitchDemo],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  temaEscuro = false;
  componenteSelecionado: 'select' | 'switch' = 'select';
  readonly exemploSelectHtml = `<app-select
  [options]="categorias"
  placeholder="Escolha uma categoria"
  ariaLabel="Categoria"
  [disabled]="false"
  [error]="false"
  [required]="true"
  [(ngModel)]="categoriaSelecionada"
></app-select>`;

  readonly exemploSelectTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from './components/select/select';

@Component({
  selector: 'app-exemplo',
  imports: [FormsModule, Select],
  templateUrl: './exemplo.html',
})
export class Exemplo {
  categoriaSelecionada = '';
  categorias = [
    { value: '1', label: 'Financeiro' },
    { value: '2', label: 'Compras' },
    { value: '3', label: 'Vendas', disabled: true },
  ];
}`;

  readonly exemploSwitchHtml = `<app-switch
  ariaLabel="Ativar notificações"
  [disabled]="false"
  [(ngModel)]="notificacoesAtivas"
></app-switch>`;

  readonly exemploSwitchTs = `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Switch } from './components/switch/switch';

@Component({
  selector: 'app-exemplo',
  imports: [FormsModule, Switch],
  templateUrl: './exemplo.html',
})
export class Exemplo {
  notificacoesAtivas = false;
}`;
}
