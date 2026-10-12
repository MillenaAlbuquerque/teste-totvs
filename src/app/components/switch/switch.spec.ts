import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Switch } from './switch';

describe('Switch', () => {
  let component: Switch;
  let fixture: ComponentFixture<Switch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Switch],
    }).compileComponents();

    fixture = TestBed.createComponent(Switch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies disabled and ariaLabel without allowing a toggle', async () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('ariaLabel', 'Notificações');
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-label')).toBe('Notificações');
    component.alternar();
    expect(component.valor()).toBe(false);
  });
});
