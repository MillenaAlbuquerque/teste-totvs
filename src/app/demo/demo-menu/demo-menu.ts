import { Component, input, output, VERSION } from '@angular/core';

@Component({
  selector: 'app-demo-menu',
  imports: [],
  templateUrl: './demo-menu.html',
  styleUrl: './demo-menu.scss',
})
export class DemoMenu {
  readonly angularVersion = VERSION.full;
  componenteSelecionado = input<'select' | 'switch'>('select');
  componenteAlterado = output<'select' | 'switch'>();
}
