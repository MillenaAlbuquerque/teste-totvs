import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Select } from './select';

describe('Select', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select],
    }).compileComponents();

    fixture = TestBed.createComponent(Select);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies the inputs in English to the native Select', async () => {
    fixture.componentRef.setInput('options', [{ value: '1', label: 'Financeiro', disabled: true }]);
    fixture.componentRef.setInput('placeholder', 'Escolha uma área');
    fixture.componentRef.setInput('ariaLabel', 'Área');
    fixture.componentRef.setInput('required', true);
    fixture.componentRef.setInput('error', true);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
    expect(select.disabled).toBe(true);
    expect(select.required).toBe(true);
    expect(select.getAttribute('aria-label')).toBe('Área');
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.options[0].textContent?.trim()).toBe('Escolha uma área');
    expect(select.options[1].disabled).toBe(true);
  });
});
