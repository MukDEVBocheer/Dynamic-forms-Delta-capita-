
import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectForms } from './store/form.selectors';
import { FormFieldConfig } from './form-builder.component';
import { FormService } from './form.service';

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit {
  formConfig: FormFieldConfig[] = [];
  form: FormGroup = this.fb.group({});
  submittedData: any = null;
  error: string = '';
  formName: string = '';

  formId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.formId = id;
    if (id) {
      this.store.select(selectForms).subscribe(forms => {
        const form = forms.find(f => f.id === id);
        if (form) {
          this.formConfig = form.fields;
          this.formName = form.name;
          this.buildForm();
        }
      });
    }
  }

  buildForm() {
    for (const field of this.formConfig) {
      let validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.validation?.minLength) validators.push(Validators.minLength(field.validation.minLength));
      if (field.validation?.maxLength) validators.push(Validators.maxLength(field.validation.maxLength));
      if (field.validation?.pattern) validators.push(Validators.pattern(field.validation.pattern));
      if (field.type === 'checkbox') {
        this.form.addControl(field.label, this.fb.array(field.options?.map(() => false) || []));
      } else {
        this.form.addControl(field.label, this.fb.control('', validators));
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.error = 'Please fill all required fields correctly.';
      return;
    }
    // Save submission using FormService (mock API)
    if (this.formId) {
      this.formService.submitForm(this.formId, this.form.value);
    }
    setTimeout(() => {
      this.submittedData = this.form.value;
      this.error = '';
    }, 500);
  }

  getCheckboxOptions(field: FormFieldConfig) {
    return field.options || [];
  }

  getCheckboxArray(field: FormFieldConfig) {
    return this.form.get(field.label) as FormArray;
  }

  asFormControl(ctrl: any) {
    return ctrl as import('@angular/forms').FormControl;
  }
}
