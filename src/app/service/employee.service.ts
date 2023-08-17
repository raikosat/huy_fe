import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private baseURL ="http://localhost:8080/employee"
  private apiUrl ="http://localhost:8080/project"



  constructor( private httpClient: HttpClient) { }

  getEmployeeList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}/list`);
  }

  addEmployee(employee :Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}/add`, employee);
  }

  getEmployeeById(id:number): Observable<Employee> {
    console.log(id);
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);

  }

  updateEmployeeData(employee: Employee, id:number): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseURL}/update/${id}`,employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  getEmployeesInProject(projectId: number): Observable<Employee[]> {
    const url = `${this.apiUrl}/${projectId}/employees`;
    return this.httpClient.get<Employee[]>(url);
  }

}
