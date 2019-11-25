import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  username;
  name;
  ngOnInit() {
    this.username = localStorage.getItem('username')
    this.name = localStorage.getItem('name')
  }

}
