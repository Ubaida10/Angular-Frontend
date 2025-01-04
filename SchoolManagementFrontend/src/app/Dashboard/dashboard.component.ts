import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';
import Courses from '../Courses';


@Component({
  selector: 'app-Dashboard',
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}
  courses = Courses;
  viewCourse(courseId: number) {
    this.router.navigate(['course-details', courseId]).then(r => console.log(r))
  }

  enrollInNewCourse(){
    this.router.navigate([])
  }
}
