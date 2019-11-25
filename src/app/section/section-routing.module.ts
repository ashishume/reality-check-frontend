import { SectionComponent } from './section.component';
import { WritingComponent } from './writing/writing.component';
import { ListeningComponent } from './listening/listening.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingComponent } from './reading/reading.component';



const route: Routes = [
  {
    path: '',
    component: SectionComponent
  },
  {
    path: 'listening',
    component: ListeningComponent
  },
  {
    path: 'reading',
    component: ReadingComponent
  },
  {
    path: 'writing',
    component: WritingComponent
  },
  {
    path: '',
    redirectTo: 'section',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
