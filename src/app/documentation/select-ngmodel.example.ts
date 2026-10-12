import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from '../components/select/select';

@Component({
  selector: 'app-exemplo-select-ngmodel',
  imports: [Select, FormsModule],
  template: `<app-select [options]="categorias" placeholder="Escolha uma categoria" ariaLabel="Categoria" [(ngModel)]="categoriaSelecionada"></app-select>`,
})
export class SelectNgModel {
  categorias = [
    { value: '1', label: 'Financeiro' },
    { value: '2', label: 'Compras' },
    { value: '3', label: 'Vendas', disabled: true },
  ];
  categoriaSelecionada = '';
}
