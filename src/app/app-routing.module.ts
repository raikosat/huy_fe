import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EmployeeProjectComponent } from './employee-project/employee-project.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';

const routes: Routes = [

  { path: 'list-employee', component: EmployeeListComponent },
  { path: 'add-employee', component: EmployeeAddComponent },
  { path: 'update-employee/:id', component: EmployeeUpdateComponent },
  { path: 'list-project', component: ProjectListComponent },
  { path: 'add-project', component: ProjectAddComponent },
  { path: 'update-project/:id', component: ProjectUpdateComponent },
  { path: 'employee-project/:id', component: EmployeeProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
