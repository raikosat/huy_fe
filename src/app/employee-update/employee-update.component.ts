import { EmployeeService } from './../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as Diacritics from 'diacritics';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit {
  id!: number;
  employee: Employee = new Employee();
  employeeForm!: FormGroup;

  constructor(
    private activeRouter: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      fullName: ['', [Validators.required] ],
      address: ['', [Validators.required] ],
      phone: ['', [Validators.required] ],
      yearsOfExperience: ['', [Validators.required] ],
      birthday: ['', [Validators.required] ],
      gender: ['', [Validators.required] ],
      office: ['', [Validators.required] ],
      dateStartWork: ['', [Validators.required] ],
      dateOffWork: ['', [Validators.required] ],
    });

    this.id = this.activeRouter.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      this.employee = data;
      const birthday =  new Date (this.employee.birthday);
      const dateStartWork = new Date (this.employee.dateStartWork);
      const dateOffWork  = new Date (this.employee.dateOffWork);


      this.employeeForm.patchValue({
        fullName: this.employee.fullName,
        address: this.employee.address,
        phone: this.employee.phone,
        yearsOfExperience: this.employee.yearsOfExperience,
        birthday: this.datepipe.transform(birthday, 'yyyy-MM-dd'),
        gender: this.employee.gender,
        office: this.employee.office,
        dateStartWork: this.datepipe.transform(dateStartWork, 'yyyy-MM-dd'),
        dateOffWork: this.datepipe.transform(dateOffWork, 'yyyy-MM-dd')
      });
      console.log(this.employeeForm);

    });
  }

  updateEmployee() {
    if (this.employeeForm) {
      const fullNameValue = this.employeeForm.controls['fullName'].value;
      const addressValue = this.employeeForm.controls['address'].value;

      const fullNameWithoutDiacritics = Diacritics.remove(fullNameValue);
      const addressWithoutDiacritics = Diacritics.remove(addressValue);

      if (fullNameValue !== fullNameWithoutDiacritics || addressValue !== addressWithoutDiacritics) {
        alert("Full name and address cannot contain accents.");
        return; // Ngăn cập nhật nếu có dấu
      }

      this.employee.fullName = fullNameValue;
      this.employee.address = addressValue;
      this.employee.phone = this.employeeForm.controls['phone'].value;
      this.employee.yearsOfExperience = this.employeeForm.controls['yearsOfExperience'].value;
      this.employee.birthday = this.employeeForm.controls['birthday'].value;
      this.employee.gender = this.employeeForm.controls['gender'].value;
      this.employee.office = this.employeeForm.controls['office'].value;
      this.employee.dateStartWork = this.employeeForm.controls['dateStartWork'].value;
      this.employee.dateOffWork = this.employeeForm.controls['dateOffWork'].value || null;

      this.employeeService.updateEmployeeData(this.employee, this.id).subscribe((data) => {
        alert('Update Successfully !');
        this.router.navigate(['/list-employee']);
      });
    }
  }

  hasError(key: string, errorKey: string) {
    // if (this.employeeForm.controls[key]) {
    //   return this.employeeForm.controls[key].hasError(errorKey)
    // } else {
    //   return false;
    // }
    return this.employeeForm.controls[key] ? this.employeeForm.controls[key].hasError(errorKey) : false;
  }
}
