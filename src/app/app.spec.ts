import { TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { SelectDemo } from './demo/select-demo/select-demo';
import { SwitchDemo } from './demo/switch-demo/switch-demo';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('toggles the theme and component colors without changing their values', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    await fixture.whenStable();
    const selectDemo = fixture.debugElement.query(By.directive(SelectDemo))
      .componentInstance as SelectDemo;
    const switchDemo = fixture.debugElement.query(By.directive(SwitchDemo))
      .componentInstance as SwitchDemo;
    selectDemo.categoriaSelecionada = '1';
    switchDemo.switchAtivo = true;
    const root = fixture.nativeElement as HTMLElement;
    const button = root.querySelector<HTMLButtonElement>('.botao-tema')!;
    const switchElement = root.querySelector<HTMLElement>('app-switch')!;
    button.click();
    await fixture.whenStable();
    expect(root.querySelector('.demo')!.classList.contains('tema-escuro')).toBe(true);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(switchElement.style.getPropertyValue('--color-checked')).toBe('#b4b4ff');
    expect(selectDemo.categoriaSelecionada).toBe('1');
    expect(switchDemo.switchAtivo).toBe(true);
    button.click();
    await fixture.whenStable();
    expect(root.querySelector('.demo')!.classList.contains('tema-escuro')).toBe(false);
    expect(switchElement.style.getPropertyValue('--color-checked')).toBe(
      switchDemo.switchCorLigado,
    );
  });

  it('switches the visible component through the menu and preserves the selection', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const buttons = root.querySelectorAll<HTMLButtonElement>('.menu-componentes button');
    const views = root.querySelector('.demo-exemplos')!.children;
    const selectDemo = fixture.debugElement.query(By.directive(SelectDemo))
      .componentInstance as SelectDemo;
    selectDemo.categoriaSelecionada = '1';
    buttons[1].click();
    await fixture.whenStable();
    expect((views[0] as HTMLElement).hidden).toBe(true);
    expect((views[1] as HTMLElement).hidden).toBe(false);
    expect(buttons[1].getAttribute('aria-current')).toBe('page');
    buttons[0].click();
    await fixture.whenStable();
    expect((views[0] as HTMLElement).hidden).toBe(false);
    expect(selectDemo.categoriaSelecionada).toBe('1');
  });

  it('updates the Select when an option is added and renamed', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const app = fixture.debugElement.query(By.directive(SelectDemo))
      .componentInstance as SelectDemo;
    app.novaOpcao = 'Financeiro';
    app.novoValorOpcao = 'financeiro';
    app.adicionarOpcao();
    const value = app.opcoesExemplo.at(-1)!.value;
    expect(value).toBe('financeiro');
    app.editarOpcao(value, 'Compras');
    fixture.debugElement.query(By.directive(SelectDemo)).injector.get(ChangeDetectorRef).detectChanges();
    await fixture.whenStable();
    const options = fixture.nativeElement.querySelectorAll(`app-select option[value="${value}"]`);
    expect(options.length).toBe(1);
    expect([...options].every((option: any) => option.textContent.trim() === 'Compras')).toBe(true);
  });

  it('clears the selection when its option is disabled or removed', () => {
    const app = TestBed.createComponent(SelectDemo).componentInstance;
    app.categoriaSelecionada = '2';
    app.desabilitarOpcao('2', true);
    expect(app.categoriaSelecionada).toBe('');
    app.categoriaSelecionada = '1';
    app.removerOpcao('1');
    expect(app.categoriaSelecionada).toBe('');
    expect(app.opcaoDisponivel('1')).toBe(false);
  });
});
