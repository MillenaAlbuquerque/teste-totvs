import { Component, signal, input, output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor {
  valor = signal('');

  options = input<SelectOption[]>([]);

  placeholder = input('Escolha uma opção');

  ariaLabel = input('Selecione uma opção');

  disabled = input(false);

  desabilitadoPeloFormulario = signal(false);

  error = input(false);

  required = input(false);

  valorAlterado = output<string>();

  aoTocar: () => void = () => {};
  aoAlterar: (valor: string) => void = () => {};

  selecionar(novoValor: string) {
    this.valor.set(novoValor);
    this.aoAlterar(novoValor);
    this.valorAlterado.emit(novoValor);
  }

  writeValue(novoValor: string | null) {
    this.valor.set(novoValor ?? '');
  }

  registerOnChange(fn: (valor: string) => void) {
    this.aoAlterar = fn;
  }

  registerOnTouched(fn: () => void) {
    this.aoTocar = fn;
  }

  setDisabledState(disabled: boolean) {
    this.desabilitadoPeloFormulario.set(disabled);
  }
}
