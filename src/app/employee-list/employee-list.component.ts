import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {




  employees: any[] = [];
  searchKeyword: string = '';
  originalEmployees: any[] = [];
  p: number = 1;
  itemsPerPage: number = 3 ;
  totalProduct: any;



  constructor(private employeeService: EmployeeService,private router: Router, public dialog: MatDialog) {}

    ngOnInit(): void {
      this.getEmployees();

  }

    getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
      this.originalEmployees = data;
      this.totalProduct =data.length;


    })
   }




   updateEmployee(id:number){
      this.router.navigate(['update-employee',id]);
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

          // Cập nhật danh sách nhân viên sau khi xóa
          this.employeeService.getEmployeeList().subscribe((employees) => {
            this.employees = employees; // Cập nhật lại danh sách nhân viên
          });
        });
      }
    });
  }

  onSearchInputChange() {
    if (this.searchKeyword === '') {
      this.employees = this.originalEmployees; // Thay originalListOfEmployees bằng biến chứa danh sách nhân viên ban đầu
      return;
    }

    const filteredEmployees = this.employees.filter(employee => {
      return (
        employee.fullName.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        employee.address.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        employee.phone.toLowerCase().includes(this.searchKeyword.toLowerCase())

      );
    });

    this.employees = filteredEmployees;
  }









}
