import { Injectable } from '@angular/core';
import { FormFieldConfig } from './form-builder.component';

@Injectable({ providedIn: 'root' })
export class FormService {
  private formsKey = 'dynamicForms';
  private submissionsKey = 'formSubmissions';

  private get forms(): { id: string; name: string; fields: FormFieldConfig[] }[] {
    return JSON.parse(localStorage.getItem(this.formsKey) || '[]');
  }
  private set forms(val: { id: string; name: string; fields: FormFieldConfig[] }[]) {
    localStorage.setItem(this.formsKey, JSON.stringify(val));
  }

  private get submissions(): { [formId: string]: any[] } {
    return JSON.parse(localStorage.getItem(this.submissionsKey) || '{}');
  }
  private set submissions(val: { [formId: string]: any[] }) {
    localStorage.setItem(this.submissionsKey, JSON.stringify(val));
  }

  getForms() {
    return this.forms;
  }

  getForm(id: string) {
    return this.forms.find(f => f.id === id);
  }

  addForm(name: string, fields: FormFieldConfig[]) {
    const id = Math.random().toString(36).substring(2, 10);
    const forms = this.forms;
    forms.push({ id, name, fields });
    this.forms = forms;
    return id;
  }

  updateForm(id: string, name: string, fields: FormFieldConfig[]) {
    const forms = this.forms;
    const idx = forms.findIndex(f => f.id === id);
    if (idx > -1) {
      forms[idx] = { id, name, fields };
      this.forms = forms;
    }
  }

  deleteForm(id: string) {
    let forms = this.forms;
    forms = forms.filter(f => f.id !== id);
    this.forms = forms;
    // Also remove submissions for this form
    const submissions = this.submissions;
    delete submissions[id];
    this.submissions = submissions;
  }

  submitForm(formId: string, data: any) {
    const submissions = this.submissions;
    if (!submissions[formId]) submissions[formId] = [];
    submissions[formId].push({ data, date: new Date().toISOString() });
    this.submissions = submissions;
  }

  getSubmissions(formId: string): any[] {
    return this.submissions[formId] || [];
  }
}
