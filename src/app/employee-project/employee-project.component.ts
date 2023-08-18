import { ProjectService } from './../service/project.service';
import { EmployeeService } from './../service/employee.service';
import { Employee } from '../model/employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-employee-project',
  templateUrl: './employee-project.component.html',
  styleUrls: ['./employee-project.component.css']
})
export class EmployeeProjectComponent implements OnInit {

  employees: Employee[] = [];
  projectId!: number;
  dialog: any;




  constructor(private employeeService: EmployeeService,private activeRouter: ActivatedRoute,private http: HttpClient,public projectService: ProjectService,private router: Router){}


  ngOnInit(): void {
    this.projectId = this.activeRouter.snapshot.params['id'];
    this.getEmployeesInProject(this.projectId);
  }


  getEmployeesInProject(projectId : number) {
     // Gọi service để lấy danh sách nhân viên trong một dự án
     console.log('get-employee')
     this.employeeService.getEmployeesInProject(projectId).subscribe(data => {
        this.employees = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteEmployeeFromProject(projectId: number, employeeId: number) {
    console.log('delete')
    this.projectService.deleteEmployeeInProject(projectId,employeeId).subscribe({
      next: (data)=>{

      },
      error:(e)=>{


        console.log(e)
        this.getEmployeesInProject(projectId)
      }

    });

  }
  GoToEmployeeProject() {
    this.router.navigate(['/employee-project/']);
  }

}






