import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form.actions';

export interface FormState {
  forms: any[];
}

export const initialState: FormState = {
  forms: []
};

export const formReducer = createReducer(
  initialState,
  on(FormActions.loadFormsSuccess, (state, { forms }) => ({ ...state, forms })),
  on(FormActions.addForm, (state, { name, fields }) => ({
    ...state,
    forms: [...state.forms, { id: Math.random().toString(36).substring(2, 10), name, fields }]
  })),
  on(FormActions.updateForm, (state, { id, name, fields }) => ({
    ...state,
    forms: state.forms.map(f => f.id === id ? { id, name, fields } : f)
  })),
  on(FormActions.deleteForm, (state, { id }) => ({
    ...state,
    forms: state.forms.filter(f => f.id !== id)
  }))
);
