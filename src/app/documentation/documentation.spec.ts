import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { NgControl } from '@angular/forms';
import { App } from '../app';
import { SelectBasico } from './select-basico.example';
import { SelectNgModel } from './select-ngmodel.example';
import { SelectReactive } from './select-reactive.example';
import { SwitchBasico } from './switch-basico.example';
import { SwitchNgModel } from './switch-ngmodel.example';
import { SwitchReactive } from './switch-reactive.example';
import { Select } from '../components/select/select';
import { Switch } from '../components/switch/switch';
import { By } from '@angular/platform-browser';
import { documentationExamples } from './documentation-data';

const examples: Type<unknown>[] = [SelectBasico, SelectNgModel, SelectReactive, SwitchBasico, SwitchNgModel, SwitchReactive];
describe('Exemplos da documentação', () => {
  for (const [index, example] of examples.entries()) {
    it('compila e renderiza ' + example.name, async () => {
      // Valida também que o template publicado é o mesmo do exemplo executável.
      const source = documentationExamples[index].source;
      const template = source.match(/template: `([\s\S]*?)`/)![1];
      TestBed.configureTestingModule({ imports: [example] });
      TestBed.overrideComponent(example, { set: { template } });
      const fixture = TestBed.createComponent(example);
      await fixture.whenStable();
      expect(fixture.nativeElement.querySelector('select, button')).toBeTruthy();
    });
  }

  it('valida os templates ngModel j? existentes na demo', async () => {
    const app = TestBed.createComponent(App).componentInstance;
    const selectTemplate = app.exemploSelectHtml;
    const switchTemplate = app.exemploSwitchHtml;
    TestBed.resetTestingModule();
    TestBed.overrideComponent(SelectNgModel, { set: { template: selectTemplate } });
    TestBed.overrideComponent(SwitchNgModel, { set: { template: switchTemplate } });
    const selectFixture = TestBed.createComponent(SelectNgModel);
    const switchFixture = TestBed.createComponent(SwitchNgModel);
    await selectFixture.whenStable();
    await switchFixture.whenStable();
    const select = selectFixture.nativeElement.querySelector('select') as HTMLSelectElement;
    const model = selectFixture.debugElement.query(By.directive(Select)).injector.get(NgControl);
    expect(model.control?.hasError('required')).toBe(true);
    select.value = '2';
    select.dispatchEvent(new Event('change'));
    select.dispatchEvent(new Event('blur'));
    switchFixture.nativeElement.querySelector('button').click();
    await selectFixture.whenStable();
    await switchFixture.whenStable();
    expect(selectFixture.componentInstance.categoriaSelecionada).toBe('2');
    expect(model.control?.valid).toBe(true);
    expect(switchFixture.componentInstance.notificacoesAtivas).toBe(true);
  });

  it('integra required, touched, error e disabled no Select Reactive', async () => {
    const fixture = TestBed.createComponent(SelectReactive);
    await fixture.whenStable();
    const control = fixture.componentInstance.categoria;
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(control.hasError('required')).toBe(true);
    expect(select.validity.valueMissing).toBe(true);
    expect(select.options[3].disabled).toBe(true);
    select.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(control.touched).toBe(true);
    expect(select.getAttribute('aria-invalid')).toBe('true');
    select.value = '1';
    select.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(control.value).toBe('1');
    expect(control.valid).toBe(true);
    control.disable();
    await fixture.whenStable();
    expect(select.disabled).toBe(true);
    control.enable();
    control.reset();
    await fixture.whenStable();
    expect(select.disabled).toBe(false);
    expect(control.value).toBe('');
  });

  it('integra alternância, touched, disabled e reset no Switch Reactive', async () => {
    const fixture = TestBed.createComponent(SwitchReactive);
    await fixture.whenStable();
    const control = fixture.componentInstance.notificacoes;
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    button.dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(control.value).toBe(true);
    expect(control.touched).toBe(true);
    expect(button.getAttribute('aria-checked')).toBe('true');
    control.disable();
    await fixture.whenStable();
    expect(button.disabled).toBe(true);
    button.click();
    expect(control.value).toBe(true);
    control.enable();
    control.reset();
    await fixture.whenStable();
    expect(control.value).toBe(false);
    expect(button.getAttribute('aria-checked')).toBe('false');
  });

  it('emite valorAlterado na interação, mas não ao escrever pelo formulário', async () => {
    const selectFixture = TestBed.createComponent(SelectBasico);
    const switchFixture = TestBed.createComponent(SwitchBasico);
    await selectFixture.whenStable();
    await switchFixture.whenStable();
    const select = selectFixture.debugElement.query(By.directive(Select)).componentInstance as Select;
    const toggle = switchFixture.debugElement.query(By.directive(Switch)).componentInstance as Switch;
    const events: boolean[] = [];
    toggle.valorAlterado.subscribe(value => events.push(value));
    select.writeValue('2');
    toggle.writeValue(true);
    expect(selectFixture.componentInstance.categoriaSelecionada).toBe('');
    expect(switchFixture.componentInstance.notificacoesAtivas).toBe(false);
    expect(events).toEqual([]);
    select.selecionar('1');
    toggle.alternar();
    expect(selectFixture.componentInstance.categoriaSelecionada).toBe('1');
    expect(switchFixture.componentInstance.notificacoesAtivas).toBe(false);
    expect(events).toEqual([false]);
  });
});
