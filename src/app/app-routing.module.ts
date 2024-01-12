import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { DocumentsComponent } from './documents/documents.component';
import { AboutComponent } from './core/about/about.component';
import { DocumentDetailsComponent } from './documents/document-details/document-details.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'documents',component:DocumentsComponent},
  {path:'documents/:id',component:DocumentDetailsComponent},
  {path:'about',component:AboutComponent},
  {path:'',redirectTo:'/home',pathMatch:"prefix"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
