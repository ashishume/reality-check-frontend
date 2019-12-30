import { TeacherService } from 'src/app/teacher/teacher-service/teacher.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { NavbarService } from './../../shared/services/navbar-service/navbar.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  categories;
  documentsData;
  constructor(
    private apiService: ApiService,
    private teacher: TeacherService
  ) {
    this.categories = this.teacher.category;
  }
  ngOnInit() {

  }

  fetchDocumentsData(category) {
    const query = {
      category: category
    }
    this.apiService.fetchDocumentsDetails(query).subscribe(result => {
      if (result.status == 200)
        this.documentsData = result.body;
    })
  }
}
