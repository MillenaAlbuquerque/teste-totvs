# Select e Switch — Teste TOTVS

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![PO UI](https://img.shields.io/badge/PO_UI-21.33-535398)
![SCSS](https://img.shields.io/badge/Estilos-SCSS-CC6699?logo=sass&logoColor=white)

Contém dois componentes Angular reutilizáveis, **Select** e **Switch** e uma página para testar suas propriedades.

## Ferramentas utilizadas

| Ferramenta              | Utilização                                                            |
| ----------------------- | --------------------------------------------------------------------- |
| Angular 21 e TypeScript | Componentes standalone, inputs com signals e lógica da aplicação.     |
| Angular Forms           | Integração com `ngModel` e Reactive Forms por `ControlValueAccessor`. |
| HTML e SCSS             | Estrutura, estados visuais, responsividade e variáveis CSS.           |
| PO UI 21.33             | Abas, inputs e checkboxes da página de demonstração.                  |

O Select e o Switch são implementações próprias. O PO UI é utilizado nos controles da demonstração.

## Executar o projeto

Utilize Node.js **22.12 ou superior da linha 22**, ou **24 ou superior**, e npm. As versões exatas das dependências estão no `package-lock.json`.

```bash
npm ci
npm start
```

Acesse [localhost:4200](http://localhost:4200).

Na página, selecione um componente pelo menu lateral. A aba **Documentação** apresenta a API e os exemplos; a aba **Exemplo** permite testar os estados e alterar a lista de opções. O botão de tema alterna entre claro e escuro.

## Select

**Seletor:** `app-select`

Permite escolher uma única opção. Use para categorias, áreas ou outros valores predefinidos.

| Propriedade   | Tipo                                                     | Padrão                | Descrição                                        |
| ------------- | -------------------------------------------------------- | --------------------- | ------------------------------------------------ |
| `options`     | `{ value: string; label: string; disabled?: boolean }[]` | `[]`                  | Opções disponíveis.                              |
| `placeholder` | `string`                                                 | `Escolha uma opção`   | Instrução exibida quando o valor está vazio.     |
| `ariaLabel`   | `string`                                                 | `Selecione uma opção` | Nome acessível do campo.                         |
| `disabled`    | `boolean`                                                | `false`               | Desabilita o campo.                              |
| `error`       | `boolean`                                                | `false`               | Aplica o estado visual de erro e `aria-invalid`. |
| `required`    | `boolean`                                                | `false`               | Torna o select nativo obrigatório.               |

Todas as propriedades são opcionais. O evento **`valorAlterado`** retorna uma `string` quando o usuário seleciona uma opção.

### Opções e seleção

```typescript
categorias = [
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'compras', label: 'Compras' },
  { value: 'vendas', label: 'Vendas', disabled: true },
];

categoriaSelecionada = '';
```

`value` é o identificador retornado ao modelo; `label` é o texto exibido. Use identificadores únicos e não vazios. Uma opção com `disabled: true` permanece visível, mas não pode ser selecionada.

O placeholder não é selecionável. Para limpar a seleção, atribua `''` ao modelo. `required` não ativa `error` automaticamente: em Reactive Forms, configure `Validators.required`; com `ngModel` e `[required]`, a validação é fornecida pelo Angular Forms.

## Switch

**Seletor:** `app-switch`

Alterna uma configuração entre ligado (`true`) e desligado (`false`). Use para preferências como notificações.

| Propriedade | Tipo      | Padrão         | Descrição                          |
| ----------- | --------- | -------------- | ---------------------------------- |
| `disabled`  | `boolean` | `false`        | Impede a alternância pelo usuário. |
| `ariaLabel` | `string`  | `Ativar opção` | Nome acessível do botão.           |

As propriedades são opcionais. O estado inicial é `false`, e o evento **`valorAlterado`** retorna um `boolean` a cada alternância pelo usuário.

O Switch possui transição de posição e cores. A animação é desativada quando o sistema solicita movimento reduzido.

## Usar com Angular Forms

Importe os componentes e o módulo de formulário em `imports` do componente consumidor. Os caminhos abaixo consideram um arquivo em `src/app`; ajuste-os conforme a localização do seu arquivo.

### ngModel

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from './components/select/select';
import { Switch } from './components/switch/switch';

@Component({
  selector: 'app-exemplo',
  imports: [FormsModule, Select, Switch],
  template: `
    <app-select
      [options]="categorias"
      ariaLabel="Categoria"
      [(ngModel)]="categoriaSelecionada"
    ></app-select>

    <app-switch ariaLabel="Ativar notificações" [(ngModel)]="notificacoesAtivas"></app-switch>
  `,
})
export class Exemplo {
  categorias = [{ value: 'financeiro', label: 'Financeiro' }];
  categoriaSelecionada = '';
  notificacoesAtivas = false;
}
```

Dentro de um `<form>`, informe também um `name` único em cada controle com `ngModel`.

### Reactive Forms

Importe `ReactiveFormsModule` no lugar de `FormsModule`, mantenha os componentes em `imports` e declare os controles na classe:

```typescript
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// Campos da classe do componente:
categoria = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required],
});
notificacoes = new FormControl(false, { nonNullable: true });
```

No template, mantendo a lista `categorias` do exemplo anterior:

```html
<app-select
  [options]="categorias"
  ariaLabel="Categoria"
  [formControl]="categoria"
  [required]="true"
  [error]="categoria.invalid && categoria.touched"
></app-select>

<app-switch ariaLabel="Ativar notificações" [formControl]="notificacoes"></app-switch>
```

Use `disable()` e `enable()` do controle para alterar sua disponibilidade. Atualizações pelo formulário não emitem `valorAlterado`.

Os exemplos completos de [Select](src/app/documentation/select-reactive.example.ts) e [Switch](src/app/documentation/switch-reactive.example.ts) também estão disponíveis na documentação da página.

## Acessibilidade e estados

Os componentes possuem nomes acessíveis e indicação de foco. O Select usa um elemento nativo, com navegação pelas setas; o Switch usa `button`, `role="switch"` e `aria-checked`, podendo ser acionado com Espaço ou Enter. Ambos registram o estado `touched` ao perder o foco.

Os estilos incluem hover, foco e estado desabilitado. As cores são configuradas por variáveis CSS; o tema da demonstração aplica essas variáveis aos componentes.

## Estrutura do projeto

```text
src/app/
├── components/       # Select e Switch reutilizáveis
├── demo/             # Header, menu e demonstrações
├── documentation/    # Documentação e exemplos testados
└── app.*             # Layout e navegação da página
```

## Testes e build

```bash
npm test -- --watch=false
npm run build
```

