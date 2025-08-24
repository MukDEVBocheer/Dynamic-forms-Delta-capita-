
import { Routes } from '@angular/router';
import { FormManagementComponent } from './form-management.component';
import { FormBuilderComponent } from './form-builder.component';
import { FormPreviewComponent } from './form-preview.component';
import { LoginComponent } from './login.component';
import { AuthGuard, AdminGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', component: FormManagementComponent, canActivate: [AuthGuard] },
	{ path: 'builder', component: FormBuilderComponent, canActivate: [AdminGuard] },
	{ path: 'builder/:id', component: FormBuilderComponent, canActivate: [AdminGuard] },
	{ path: 'preview/:id', component: FormPreviewComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
];
