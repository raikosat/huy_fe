import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit{

  projectForm !: FormGroup;
  projectObj : Project = new Project();


  constructor(private FormBuilder : FormBuilder, private projectService : ProjectService ,private router: Router){}

  ngOnInit(): void {
    this.projectForm = this.FormBuilder.group({
      nameProject: [''],
      dateStart : [''],
      dateEnd : [''],
    })

  }

  addProject(project: Project){
    this.projectObj.id = this.projectForm.value.id;
    this.projectObj.nameProject = this.projectForm.value.nameProject;
    this.projectObj.dateStart = this.projectForm.value.dateStart;
    this.projectObj.dateEnd = this.projectForm.value.dateEnd;

    this.projectService.addProject(this.projectObj).subscribe({
      next: (res: any) => {
      console.log(res);
      this.router.navigateByUrl('/list-project');
    },
    error: (err: any) => {
      console.log(err);
    }
    });
  }


}
