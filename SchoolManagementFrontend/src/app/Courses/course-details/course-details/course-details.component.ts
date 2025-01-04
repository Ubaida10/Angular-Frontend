import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Courses from '../../../Courses';
import Course from '../../../CourseInterface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  standalone: true,
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courses = Courses;
  course!: Course | undefined;

  constructor(private route: ActivatedRoute) { } // Inject ActivatedRoute

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const courseId = +params.get('id')!;
      this.course = this.findCourseById(courseId);
    });
  }

  findCourseById(courseId: number): Course | undefined {
    return this.courses.find(course => course.id === courseId);
  }
}
