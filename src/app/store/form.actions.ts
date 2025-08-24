import { createAction, props } from '@ngrx/store';
import { FormFieldConfig } from '../form-builder.component';

export const loadForms = createAction('[Form] Load Forms');
export const loadFormsSuccess = createAction('[Form] Load Forms Success', props<{ forms: any[] }>());
export const addForm = createAction('[Form] Add Form', props<{ name: string; fields: FormFieldConfig[] }>());
export const updateForm = createAction('[Form] Update Form', props<{ id: string; name: string; fields: FormFieldConfig[] }>());
export const deleteForm = createAction('[Form] Delete Form', props<{ id: string }>());
