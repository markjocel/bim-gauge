import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  dataCollection: any[] = []
  selectedResult:any = []
  loading: boolean = false

  constructor() { 
    this.getAllData().then(x => {

      this.dataCollection.forEach(data => {
        data.results = JSON.parse(data.results)
        data.companyProfile = JSON.parse(data.companyProfile)
        // console.warn(JSON.parse(data.results))
      })
      
      // console.warn(this.dataCollection)
      // console.warn(JSON.stringify(this.dataCollection))

    })
  }

  ngOnInit(): void {
  }

  

  async getAllData(){
    
    const app = initializeApp(environment.firebaseConfig)
    const db = getFirestore(app)
    this.loading = true
    const querySnapshot = await getDocs(collection(db, "resultInfo"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      // console.log(doc.data())
      this.dataCollection.push(doc.data())
    });
    this.loading = false
  }

  seeResults(data:any[]){
    let modal = document.getElementsByClassName('modal')[0]
    modal.classList.contains('d-none') ? modal.classList.remove('d-none') : modal.classList.add('d-none')
    document.getElementsByTagName('body')[0].classList.add('modal-open')

    this.selectedResult = data
    console.log(this.selectedResult)
  }

  closeModal(){
    let modal = document.getElementsByClassName('modal')[0]
    modal.classList.contains('d-none') ? modal.classList.remove('d-none') : modal.classList.add('d-none')
    document.getElementsByTagName('body')[0].classList.remove('modal-open')
  }
  
}
