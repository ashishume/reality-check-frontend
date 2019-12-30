import { TeacherService } from 'src/app/teacher/teacher-service/teacher.service';
import { ApiService } from './../shared/services/api-service/api.service';
import { NavbarService } from 'src/app/shared/services/navbar-service/navbar.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  categories = [];
  constructor(
    private titleService: Title,
    private nav: NavbarService,
    private apiService: ApiService,
    private teacher: TeacherService
  ) {
    this.nav.visible = true;
    this.titleService.setTitle('Teacher Panel')
    this.categories = this.teacher.category;
    // const query = {
    //   category=
    // }
    // this.apiService.fetchDocumentsDetails(query).


  }

  ngOnInit() { }
}

