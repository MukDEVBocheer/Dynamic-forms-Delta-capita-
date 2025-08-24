import { Component, OnInit } from '@angular/core';
import { DatePipe, JsonPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FormService } from './form.service';
import * as FormActions from './store/form.actions';
import { selectForms } from './store/form.selectors';

@Component({
  selector: 'app-form-management',
  templateUrl: './form-management.component.html',
  styleUrls: ['./form-management.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, JsonPipe]
})
export class FormManagementComponent implements OnInit {
  forms$: Observable<any[]>;
  selectedSubmissions: any[] | null = null;
  selectedFormName: string = '';
  constructor(
    private store: Store,
    private router: Router,
    public auth: AuthService,
    private formService: FormService
  ) {
    this.forms$ = this.store.select(selectForms);
  }

  ngOnInit() {
    // Optionally dispatch loadForms if you want to load from API in future
  }

  createNew() {
    this.router.navigate(['/builder']);
  }

  editForm(id: string) {
    this.router.navigate(['/builder', id]);
  }

  previewForm(id: string) {
    this.router.navigate(['/preview', id]);
  }

  deleteForm(id: string) {
    this.store.dispatch(FormActions.deleteForm({ id }));
  }
  isAdmin() {
    return this.auth.isAdmin();
  }

  viewSubmissions(form: any) {
    this.selectedFormName = form.name;
    this.selectedSubmissions = this.formService.getSubmissions(form.id);
  }

  closeSubmissions() {
    this.selectedSubmissions = null;
    this.selectedFormName = '';
  }
}
