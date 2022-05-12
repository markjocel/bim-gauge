import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  BODY: any[] = [
    "Public",
    "Private"
  ]

   ACTIVITY_FIELDS: any[] = [
    "Architectural Services",
    "Building Operations / Facility management",
    "Construction Management",
    "Cost Planning (QS)",
    "General Contracting",
    "MEP Engineering",
    "Other engineering or consultancy services",
    "Others",
    "Owner / Developer",
    "Project Management",
    "Structural Engineering",
    "Subcontracting",
  ]

  EMPLOYEE_NUMBER: any[] = [
   "1-10",
   "10-50",
   "50-100",
   "100-1000",
   "1000+",
 ]

 YEARS_EXPERIENCE: any[] = [
  "0",
  "1-2",
  "3-5",
  "5-10",
  "10+",
 ]

 companyForm!: FormGroup;
 error: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    window.scroll({top: 0, behavior: 'smooth'})
    
    this.companyForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      body: ['', Validators.required],
      activity_field: ['', Validators.required],
      project_name: ['', Validators.required],
      street: ['', Validators.required],
      zip_code: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      country: ['', Validators.required],
      employee_number: ['', Validators.required],
      years_experience: ['', Validators.required],
    })
  }

  submitForm(){
    if(this.companyForm.valid){
      this.error = false
      this.router.navigate(['/questions'])
    } else {
      this.error = true
    }
    localStorage.setItem('companyForm',JSON.stringify(this.companyForm.value))
    // console.log(this.companyForm.value)
  }

}
