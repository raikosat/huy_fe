import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit{

  id!: number;
  project: Project = new Project();
  projectForm!: FormGroup;

  constructor(
    private activeRouter: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      nameProject: ['', [Validators.required] ],
      dateStart: ['', [Validators.required] ],
      dateEnd: ['', [Validators.required] ],

    });

    this.id = this.activeRouter.snapshot.params['id'];
    this.projectService.getProjectById(this.id).subscribe((data) => {
      this.project = data;

      const dateStart = new Date (this.project.dateStart);
      const dateEnd  = new Date (this.project.dateEnd);

      this.projectForm.patchValue({
        nameProject: this.project.nameProject,
        dateStart: this.datepipe.transform(dateStart, 'yyyy-MM-dd'),
        dateEnd: this.datepipe.transform(dateEnd, 'yyyy-MM-dd')
      });
      console.log(this.projectForm);

    });
}

updateProject() {
  if (this.projectForm) {

    this.project.nameProject = this.projectForm.controls['nameProject'].value;
    this.project.dateStart = this.projectForm.controls['dateStart'].value;
    this.project.dateEnd = this.projectForm.controls['dateEnd'].value || null;

    this.projectService.updateProjectData(this.project, this.id).subscribe((data) => {
      alert('Update Successfully !');
      this.router.navigate(['/list-project']);
    });
  }
}



}
