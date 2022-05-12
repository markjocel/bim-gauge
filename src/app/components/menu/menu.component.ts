import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(path:string, options?: string){
    this.router.navigate(['/'+path]).then(x => {
      options?.localeCompare("how") == 0 ? window.scroll({behavior: 'smooth', top: 500}) : window.scroll({top: 0, behavior: 'smooth'})
    })
  }

}
