import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as FormActions from './store/form.actions';
import { selectForms } from './store/form.selectors';

export type FieldType = 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'date' | 'radio';

export interface FormFieldConfig {
  type: FieldType;
  label: string;
  required: boolean;
  helpText?: string;
  options?: string[]; // For dropdown, checkbox, radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  availableFields: { type: FieldType; label: string }[] = [
    { type: 'text', label: 'Text Input' },
    { type: 'textarea', label: 'Multi-line Text' },
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'checkbox', label: 'Checkbox Group' },
    { type: 'date', label: 'Date Picker' },
    { type: 'radio', label: 'Radio Group' }
  ];

  formFields: FormFieldConfig[] = [];
  selectedFieldIndex: number | null = null;
  formId: string | null = null;
  formName: string = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    public auth: AuthService
  ) {}

  isAdmin() {
    return this.auth.isAdmin();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.formId = id;
        this.store.select(selectForms).subscribe(forms => {
          const form = forms.find(f => f.id === id);
          if (form) {
            this.formFields = JSON.parse(JSON.stringify(form.fields));
            this.formName = form.name;
          }
        });
      } else {
        this.formFields = [];
        this.formName = '';
        this.formId = null;
      }
    });
  }

  drop(event: CdkDragDrop<FormFieldConfig[] | any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    } else {
      // Drag from sidebar: use event.item.data
      const draggedField = event.item.data as { type: FieldType; label: string };
      const newField: FormFieldConfig = {
        type: draggedField.type,
        label: draggedField.label,
        required: false,
        options: ['Option 1', 'Option 2'],
        validation: {}
      };
      this.formFields.splice(event.currentIndex, 0, newField);
    }
  }

  selectField(index: number) {
    this.selectedFieldIndex = index;
  }

  saveForm() {
    if (this.formId) {
      this.store.dispatch(FormActions.updateForm({ id: this.formId, name: this.formName, fields: this.formFields }));
    } else {
      this.store.dispatch(FormActions.addForm({ name: this.formName, fields: this.formFields }));
    }
    this.router.navigate(['/']);
  }

  updateField(prop: keyof FormFieldConfig, value: any) {
    if (this.selectedFieldIndex !== null) {
      (this.formFields[this.selectedFieldIndex] as any)[prop] = value;
    }
  }

  updateValidation(prop: keyof NonNullable<FormFieldConfig['validation']>, value: any) {
    if (this.selectedFieldIndex !== null) {
      if (!this.formFields[this.selectedFieldIndex].validation) {
        this.formFields[this.selectedFieldIndex].validation = {};
      }
      (this.formFields[this.selectedFieldIndex].validation as any)[prop] = value;
    }
  }

  get optionsString(): string {
    if (this.selectedFieldIndex !== null) {
      return this.formFields[this.selectedFieldIndex].options?.join(', ') || '';
    }
    return '';
  }
  set optionsString(val: string) {
    if (this.selectedFieldIndex !== null) {
      this.formFields[this.selectedFieldIndex].options = val.split(',').map(o => o.trim());
    }
  }
}
