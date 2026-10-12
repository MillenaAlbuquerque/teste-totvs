import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-demo-header',
  imports: [],
  templateUrl: './demo-header.html',
  styleUrl: './demo-header.scss',
})
export class DemoHeader {
  temaEscuro = input(false);
  temaAlterado = output<void>();
  irParaGitHub() {
    window.open('https://github.com/MillenaAlbuquerque/teste-totvs', '_blank');
  }

  irParaLinkedin() {
    window.open('https://www.linkedin.com/in/millena-albuquerque/', '_blank');
  }
}
