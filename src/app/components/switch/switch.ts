import { Component, signal, input, output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  imports: [],
  templateUrl: './switch.html',
  styleUrl: './switch.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
})
export class Switch implements ControlValueAccessor {
  valor = signal(false);

  disabled = input(false);
  ariaLabel = input('Ativar opção');
  desabilitadoPeloFormulario = signal(false);

  valorAlterado = output<boolean>();

  onChange: (valor: boolean) => void = () => {};
  onTouched: () => void = () => {};

  estaDesabilitado() {
    return this.disabled() || this.desabilitadoPeloFormulario();
  }

  alternar() {
    if (this.estaDesabilitado()) {
      return;
    }

    this.valor.set(!this.valor());

    this.onChange(this.valor());
    this.valorAlterado.emit(this.valor());
  }

  writeValue(valor: boolean | null) {
    this.valor.set(valor === true);
  }

  registerOnChange(fn: (valor: boolean) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.desabilitadoPeloFormulario.set(disabled);
  }
}
