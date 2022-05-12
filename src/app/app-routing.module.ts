import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'company-profile',
    component: CompanyProfileComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
