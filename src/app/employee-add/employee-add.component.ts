import { Employee } from './../model/employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as Diacritics from 'diacritics';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit{

  employeeForm !: FormGroup;
  employeeObj : Employee = new Employee();

  constructor(private FormBuilder : FormBuilder, private employeeService : EmployeeService,private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.FormBuilder.group({
      fullName : [''],
      address : [''],
      phone : [''],
      yearsOfExperience : [''],
      birthday : [''],
      gender : [''],
      office : [''],
      dateStartWork : [''],
      dateOffWork : [''],
      status : [''],
    })
  }

  addEmployee(employee:Employee) {
    const fullNameValue = this.employeeForm.value.fullName;
  const addressValue = this.employeeForm.value.address;

  const fullNameWithoutDiacritics = Diacritics.remove(fullNameValue);
  const addressWithoutDiacritics = Diacritics.remove(addressValue);

  if (fullNameValue !== fullNameWithoutDiacritics || addressValue !== addressWithoutDiacritics) {
    alert("Full name and address cannot contain accents.");
    return;
  }

  // Tiến hành thêm mới nhân viên
  this.employeeObj.id = this.employeeForm.value.id;
  this.employeeObj.fullName = fullNameValue;
  this.employeeObj.address = addressValue;
  this.employeeObj.phone = this.employeeForm.value.phone;
  this.employeeObj.yearsOfExperience = this.employeeForm.value.yearsOfExperience;
  this.employeeObj.birthday = this.employeeForm.value.birthday;
  this.employeeObj.gender = this.employeeForm.value.gender;
  this.employeeObj.office = this.employeeForm.value.office;
  this.employeeObj.dateStartWork = this.employeeForm.value.dateStartWork;
  this.employeeObj.dateOffWork = this.employeeForm.value.dateOffWork;
  this.employeeObj.status = this.employeeForm.value.status;

  this.employeeService.addEmployee(this.employeeObj).subscribe({
    next: res => {
      console.log(res);
      this.router.navigateByUrl('/list-employee');
    },
    error: err => {
      console.log(err);
    }
  });


  }



}
