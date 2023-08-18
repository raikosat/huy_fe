import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];


  constructor(private projectService: ProjectService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProjects();
  }


  getProjects(){
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data;
    })
   }

   updateProject(id:number){
    this.router.navigate(['update-project',id]);
 }


 openConfirmationDialog(id: number) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this project?',
    },
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.projectService.deleteProject(id).subscribe(() => {
        alert('Project deleted successfully!');

        // Cập nhật danh sách nhân viên sau khi xóa
        this.projectService.getProjectList().subscribe((projects) => {
          this.projects = projects; // Cập nhật lại danh sách nhân viên
        });
      });
    }
  });
}

employeeInProject(id:number){
  this.router.navigate(['employee-project',id]);
}

}
