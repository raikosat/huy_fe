import { EmployeeService } from './../service/employee.service';
import { Employee } from '../model/employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-employee-project',
  templateUrl: './employee-project.component.html',
  styleUrls: ['./employee-project.component.css']
})
export class EmployeeProjectComponent implements OnInit {

  employees: Employee[] = [];
  projectId!: number;
  dialog: any;




  constructor(private employeeService: EmployeeService,private activeRouter: ActivatedRoute){}


  ngOnInit(): void {
    this.projectId = this.activeRouter.snapshot.params['id'];
    this.getEmployeesInProject(this.projectId);
  }


  getEmployeesInProject(projectId : number) {
     // Gọi service để lấy danh sách nhân viên trong một dự án
     this.employeeService.getEmployeesInProject(projectId).subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  openConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this employee?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.employeeService.deleteEmployee(id).subscribe(() => {
          alert('Employee deleted successfully!');
        });
      }
    });
  }



  }






