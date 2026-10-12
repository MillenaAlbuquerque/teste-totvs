import { Component, input } from '@angular/core';
import { componentDocumentation, documentationExamples } from './documentation-data';

@Component({
  selector: 'app-component-documentation',
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
})
export class ComponentDocumentation {
  component = input.required<'select' | 'switch'>();
  ngModelHtml = input.required<string>();
  ngModelTs = input.required<string>();
  get documentation() { return componentDocumentation[this.component()]; }
  get examples() { return documentationExamples.filter(example => example.component === this.component()); }
}
