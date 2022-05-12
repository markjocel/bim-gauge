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
  loading: boolean = false

  constructor() { 
    this.getAllData().then(x => {

      this.dataCollection.forEach(data => {
        data.results = JSON.parse(data.results)
        data.companyProfile = JSON.parse(data.companyProfile)
        // console.warn(JSON.parse(data.results))
      })
      
      console.warn(this.dataCollection)

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

}
