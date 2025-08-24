import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.reducer';

export const selectFormState = createFeatureSelector<FormState>('form');
export const selectForms = createSelector(selectFormState, state => state.forms);
