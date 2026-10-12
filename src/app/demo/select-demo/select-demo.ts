import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoCheckboxModule, PoFieldModule } from '@po-ui/ng-components';
import { Select } from '../../components/select/select';
@Component({
  selector: 'app-select-demo',
  imports: [FormsModule, PoCheckboxModule, PoFieldModule, Select],
  templateUrl: './select-demo.html',
  styleUrl: './select-demo.scss',
})
export class SelectDemo {
  opcoesExemplo = [
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
    { value: '3', label: 'Opção 3', disabled: true },
  ];

  categoriaSelecionada = '';

  get nomeCategoriaSelecionada() {
    return (
      this.opcoesExemplo.find((opcao) => opcao.value === this.categoriaSelecionada)?.label ?? ''
    );
  }
  selectDesabilitado = false;
  selectErro = false;
  selectObrigatorio = true;
  selectInstrucao = 'Escolha uma categoria';

  novaOpcao = '';
  novoValorOpcao = '';
  readonly limiteTextoOpcao = 60;
  mostrarNovaOpcao = false;
  get valorOpcaoRepetido() {
    return this.opcoesExemplo.some((opcao) => opcao.value === this.novoValorOpcao.trim());
  }

  get podeAdicionarOpcao() {
    return (
      !!this.novaOpcao.trim() &&
      this.novaOpcao.length <= this.limiteTextoOpcao &&
      !!this.novoValorOpcao.trim() &&
      !this.valorOpcaoRepetido
    );
  }

  adicionarOpcao() {
    const label = this.novaOpcao.trim();

    if (!this.podeAdicionarOpcao) {
      return;
    }

    this.opcoesExemplo = [...this.opcoesExemplo, { value: this.novoValorOpcao.trim(), label }];
    this.novaOpcao = '';
    this.novoValorOpcao = '';
    this.mostrarNovaOpcao = false;
  }

  editarOpcao(value: string, label: string | null) {
    this.opcoesExemplo = this.opcoesExemplo.map((opcao) =>
      opcao.value === value ? { ...opcao, label: label ?? '' } : opcao,
    );
  }

  desabilitarOpcao(value: string, disabled: boolean) {
    this.opcoesExemplo = this.opcoesExemplo.map((opcao) =>
      opcao.value === value ? { ...opcao, disabled } : opcao,
    );
    if (disabled) {
      this.limparSelecao(value);
    }
  }

  removerOpcao(value: string) {
    this.opcoesExemplo = this.opcoesExemplo.filter((opcao) => opcao.value !== value);
    this.limparSelecao(value);
  }

  opcaoDisponivel(value: string) {
    return this.opcoesExemplo.some((opcao) => opcao.value === value && !opcao.disabled);
  }

  private limparSelecao(value: string) {
    if (this.categoriaSelecionada === value) {
      this.categoriaSelecionada = '';
    }
  }
}
