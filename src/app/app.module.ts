import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ResultComponent } from './pages/result/result.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AdminComponent } from './admin/admin.component';
// import { AngularFireModule } from  '@angular/fire';
// import { AngularFirestoreModule } from  '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompanyProfileComponent,
    QuestionsComponent,
    ResultComponent,
    MenuComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    // AngularFireModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
