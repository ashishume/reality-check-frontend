import { ProgressComponent } from './progress/progress.component';
import { MarksSheetComponent } from './marks-sheet/marks-sheet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileSharingComponent } from './file-sharing/file-sharing.component';
import { ResultsComponent } from './results/results.component';
const route: Routes = [
  { path: 'marks-sheet', component: MarksSheetComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'file-sharing', component: FileSharingComponent },
  { path: 'results', component: ResultsComponent },
  {
    path: '',
    redirectTo: 'marks-sheet',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
