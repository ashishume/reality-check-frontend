import { TeacherService } from 'src/app/teacher/teacher-service/teacher.service';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { NavbarService } from './../../shared/services/navbar-service/navbar.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  categories;
  category;
  documentsData;
  filterCategory;
  tags = new FormControl();
  tagsData = [];
  constructor(
    private apiService: ApiService,
    private teacher: TeacherService
  ) {
    this.categories = this.teacher.category;
    this.tagsData = this.teacher.tags;
  }

  ngOnInit() {

  }

  fetchDocumentsData(category) {
    const query = {
      category: category
    }
    this.filterCategory = category

    this.apiService.fetchDocumentsDetails(query).subscribe(result => {
      if (result.status == 200)
        this.documentsData = result.body;
      else if (result.status == 204)
        this.documentsData = [];

    })
  }

  ApplyFilter(tag) {
    const query = {
      tags: tag,
      category: this.filterCategory
    }
    this.apiService.fetchDocumentsDetails(query).subscribe(result => {
      if (result.status == 200) {
        this.documentsData = result.body;
      }
      else if (result.status == 204) {
        this.documentsData = [];
      }
    })


  }
}
