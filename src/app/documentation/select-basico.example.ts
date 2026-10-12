import { Component } from '@angular/core';
import { Select } from '../components/select/select';

@Component({
  selector: 'app-exemplo-select-basico',
  imports: [Select],
  template: `<app-select [options]="categorias" placeholder="Escolha uma categoria" ariaLabel="Categoria" (valorAlterado)="categoriaSelecionada = $event"></app-select>`,
})
export class SelectBasico {
  categorias = [
    { value: '1', label: 'Financeiro' },
    { value: '2', label: 'Compras' },
    { value: '3', label: 'Vendas', disabled: true },
  ];
  categoriaSelecionada = '';
}
