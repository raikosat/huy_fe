import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  

  private baseURL ="http://localhost:8080/project"

  constructor(private httpClient: HttpClient) { }

  getProjectList(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(`${this.baseURL}/list`);
  }

  addProject(project :Project): Observable<Project>{
    return this.httpClient.post<Project>(`${this.baseURL}/add`, project);
  }

  getProjectById(id:number): Observable<Project> {
    console.log(id);
    return this.httpClient.get<Project>(`${this.baseURL}/${id}`);
  }

  updateProjectData(project: Project, id:number): Observable<Project>{
    return this.httpClient.post<Project>(`${this.baseURL}/update/${id}`,project);
  }

  deleteProject(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

}
