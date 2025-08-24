
# Dynamic Form Builder Application

## Overview
This Angular application allows Admins to build, manage, and preview dynamic forms with drag-and-drop, field configuration, and permission controls. Users can fill out forms, and Admins can view all submissions.

## Features
- **Form Builder**: Drag-and-drop interface for creating forms with:
	- Text input (single-line, multi-line)
	- Dropdown select (configurable options)
	- Checkbox groups
	- Date picker
	- Radio button groups
	- Configurable label, required/optional, help text, validation (min/max length, pattern)
- **Form Management**: List, edit, preview, and delete form templates
- **Form Preview & Submission**: End-users can fill forms, with validation and mock API submission
- **Authorization**: Login with role selection (Admin/User)
	- Admin: Can create, edit, delete forms, and view submissions
	- User: Can only view and fill forms
- **Submissions View**: Admins can view all submitted data for each form
- **Persistence**: Forms and submissions are stored in browser localStorage (mock API)

## Usage
1. Run `ng serve` and open [http://localhost:4200/](http://localhost:4200/)
2. Login as Admin or User
3. Admins can create/edit/delete forms, and view submissions
4. Users can fill out forms and submit

## Design Notes
- **Persistence**: No real backend; all data is stored in localStorage for demo purposes
- **Validation**: All configured rules are enforced on the form preview and submission
- **Authorization**: Route guards and UI checks enforce permissions
- **Limitations**:
	- No real authentication (role is selected at login)
	- No server API; all data is local
	- No advanced field types (file upload, nested groups, etc.)

## Approach
If any requirement was not fully implemented due to time, the approach and reasoning are documented here. The code is modular and can be extended for real backend/API integration.
