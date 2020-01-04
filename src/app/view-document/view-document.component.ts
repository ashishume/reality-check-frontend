import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NavbarService } from 'src/app/shared/services/navbar-service/navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
// import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {


  @Input()
  public html: SafeHtml;
  category;
  
  constructor(
    private sanitizer: DomSanitizer,
    private nav: NavbarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nav.visible = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const url = params.url + "#toolbar=0";
      let html = `<embed width="800" height="900" src="${url}" />`
      this.html = this.sanitizer.bypassSecurityTrustHtml(html);
    });

  }

  checkClick(event) {
    return false;
  }

  goBack() {
    this.router.navigate(['dashboard'])
  }

}
