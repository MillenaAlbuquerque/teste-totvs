const property = (name: string, type: string, defaultValue: string, description: string) =>
  ({ name, type, defaultValue, required: 'Não', description });

export const componentDocumentation = {
  select: {
    name: 'Select', selector: 'app-select',
    description: 'Seleciona uma única opção em uma lista.',
    when: 'Use para escolher categorias, áreas ou outros valores predefinidos.',
    properties: [
      property('options', 'SelectOption[]', '[]', 'Lista de opções.'),
      property('placeholder', 'string', 'Escolha uma opção', 'Texto exibido quando o valor está vazio.'),
      property('ariaLabel', 'string', 'Selecione uma opção', 'Nome acessível do campo.'),
      property('disabled', 'boolean', 'false', 'Desabilita o campo.'),
      property('error', 'boolean', 'false', 'Exibe erro visual e aplica aria-invalid. Não valida o valor.'),
      property('required', 'boolean', 'false', 'Torna o select nativo obrigatório. Não ativa error automaticamente.'),
    ],
    model: 'interface SelectOption {\n  value: string;\n  label: string;\n  disabled?: boolean;\n}',
    modelDescription: 'value é o identificador retornado; label é o texto exibido. Use values únicos e não vazios. disabled: true desabilita uma opção. A interface é interna: crie objetos com essa estrutura.',
    eventType: 'string',
    states: [
      'Vazio: exibe o placeholder, que não pode ser selecionado. Para limpar, atribua uma string vazia ao modelo.',
      'Normal, hover, foco, desabilitado e erro têm estilos próprios. O estado desabilitado prevalece sobre o erro.',
      'Em Reactive Forms, use Validators.required. Com ngModel e [required], o FormsModule fornece a validação.',
      'Use disable() e enable() do FormControl para desabilitar e habilitar. Alterações por código continuam permitidas.',
    ],
    accessibility: [
      'Usa select nativo com aria-label e aria-invalid. Tab move o foco; as setas navegam nas opções. A abertura da lista depende do navegador e do sistema.',
      'Atualiza o modelo ao selecionar e registra touched ao perder o foco.',
    ],
    limitations: [
      'Não oferece busca, seleção múltipla ou mensagem de erro interna.',
      'Não limpa automaticamente valores removidos, desabilitados ou inexistentes na lista.',
      'Controle o valor por ngModel ou formControl; não há input value. null é tratado como string vazia.',
      'A aparência da lista aberta depende do navegador. As cores usam variáveis CSS.',
    ],
  },
  switch: {
    name: 'Switch', selector: 'app-switch',
    description: 'Alterna entre ligado e desligado.',
    when: 'Use para ativar ou desativar preferências, como notificações.',
    properties: [
      property('disabled', 'boolean', 'false', 'Impede a alternância pelo usuário.'),
      property('ariaLabel', 'string', 'Ativar opção', 'Nome acessível do botão.'),
    ],
    model: 'notificacoesAtivas = false;\n// true: ligado; false: desligado',
    modelDescription: 'O modelo é booleano e começa em false. Somente true representa o estado ligado; null é tratado como false.',
    eventType: 'boolean',
    states: [
      'Clique alterna o estado. Ligado, a chave fica à direita e exibe um ícone de confirmação.',
      'Possui estilos de hover, foco e desabilitado. Respeita a preferência por movimento reduzido.',
      'disabled ou disable() do FormControl bloqueiam a interação. O modelo ainda pode ser alterado por código.',
    ],
    accessibility: [
      'Usa botão nativo com role="switch", aria-checked e aria-label.',
      'Tab move o foco; Espaço e Enter alternam o estado. Desabilitado, o botão sai da navegação por Tab.',
      'Registra touched ao perder o foco.',
    ],
    limitations: [
      'Não possui estado indeterminado, required, error ou texto visível de ligado e desligado.',
      'Para exigir o estado ligado, use Validators.requiredTrue no FormControl.',
      'Controle o valor por ngModel ou formControl; não há input value. As cores usam variáveis CSS.',
    ],
  },
};

export const documentationExamples = [
  {
    "component": "select",
    "title": "Exemplo básico",
    "source": "import { Component } from '@angular/core';\nimport { Select } from '../components/select/select';\n\n@Component({\n  selector: 'app-exemplo-select-basico',\n  imports: [Select],\n  template: `<app-select [options]=\"categorias\" placeholder=\"Escolha uma categoria\" ariaLabel=\"Categoria\" (valorAlterado)=\"categoriaSelecionada = $event\"></app-select>`,\n})\nexport class SelectBasico {\n  categorias = [\n    { value: '1', label: 'Financeiro' },\n    { value: '2', label: 'Compras' },\n    { value: '3', label: 'Vendas', disabled: true },\n  ];\n  categoriaSelecionada = '';\n}\n"
  },
  {
    "component": "select",
    "title": "Exemplo com ngModel",
    "source": "import { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\nimport { Select } from '../components/select/select';\n\n@Component({\n  selector: 'app-exemplo-select-ngmodel',\n  imports: [Select, FormsModule],\n  template: `<app-select [options]=\"categorias\" placeholder=\"Escolha uma categoria\" ariaLabel=\"Categoria\" [(ngModel)]=\"categoriaSelecionada\"></app-select>`,\n})\nexport class SelectNgModel {\n  categorias = [\n    { value: '1', label: 'Financeiro' },\n    { value: '2', label: 'Compras' },\n    { value: '3', label: 'Vendas', disabled: true },\n  ];\n  categoriaSelecionada = '';\n}\n"
  },
  {
    "component": "select",
    "title": "Exemplo com Reactive Forms",
    "source": "import { Component } from '@angular/core';\nimport { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';\nimport { Select } from '../components/select/select';\n\n@Component({\n  selector: 'app-exemplo-select-reactive',\n  imports: [Select, ReactiveFormsModule],\n  template: `<app-select [options]=\"categorias\" placeholder=\"Escolha uma categoria\" ariaLabel=\"Categoria\" [formControl]=\"categoria\" [required]=\"true\" [error]=\"categoria.invalid && categoria.touched\"></app-select>`,\n})\nexport class SelectReactive {\n  categorias = [\n    { value: '1', label: 'Financeiro' },\n    { value: '2', label: 'Compras' },\n    { value: '3', label: 'Vendas', disabled: true },\n  ];\n  categoria = new FormControl('', { nonNullable: true, validators: [Validators.required] });\n}\n"
  },
  {
    "component": "switch",
    "title": "Exemplo básico",
    "source": "import { Component } from '@angular/core';\nimport { Switch } from '../components/switch/switch';\n\n@Component({\n  selector: 'app-exemplo-switch-basico',\n  imports: [Switch],\n  template: `<app-switch ariaLabel=\"Ativar notificações\" (valorAlterado)=\"notificacoesAtivas = $event\"></app-switch>`,\n})\nexport class SwitchBasico {\n  notificacoesAtivas = false;\n}\n"
  },
  {
    "component": "switch",
    "title": "Exemplo com ngModel",
    "source": "import { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\nimport { Switch } from '../components/switch/switch';\n\n@Component({\n  selector: 'app-exemplo-switch-ngmodel',\n  imports: [Switch, FormsModule],\n  template: `<app-switch ariaLabel=\"Ativar notificações\" [(ngModel)]=\"notificacoesAtivas\"></app-switch>`,\n})\nexport class SwitchNgModel {\n  notificacoesAtivas = false;\n}\n"
  },
  {
    "component": "switch",
    "title": "Exemplo com Reactive Forms",
    "source": "import { Component } from '@angular/core';\nimport { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';\nimport { Switch } from '../components/switch/switch';\n\n@Component({\n  selector: 'app-exemplo-switch-reactive',\n  imports: [Switch, ReactiveFormsModule],\n  template: `<app-switch ariaLabel=\"Ativar notificações\" [formControl]=\"notificacoes\"></app-switch>`,\n})\nexport class SwitchReactive {\n  notificacoes = new FormControl(false, { nonNullable: true });\n}\n"
  }
];
