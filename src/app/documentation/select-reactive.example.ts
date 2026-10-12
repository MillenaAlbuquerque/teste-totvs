import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Select } from '../components/select/select';

@Component({
  selector: 'app-exemplo-select-reactive',
  imports: [Select, ReactiveFormsModule],
  template: `<app-select [options]="categorias" placeholder="Escolha uma categoria" ariaLabel="Categoria" [formControl]="categoria" [required]="true" [error]="categoria.invalid && categoria.touched"></app-select>`,
})
export class SelectReactive {
  categorias = [
    { value: '1', label: 'Financeiro' },
    { value: '2', label: 'Compras' },
    { value: '3', label: 'Vendas', disabled: true },
  ];
  categoria = new FormControl('', { nonNullable: true, validators: [Validators.required] });
}
