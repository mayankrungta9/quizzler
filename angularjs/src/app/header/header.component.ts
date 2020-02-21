import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../service/httpclient.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  userName:string;
  coins:number;
  
  constructor(
    public  router: Router ,
    public  activatedrouter: ActivatedRoute ,
    private httpClientService:HttpClientService,
  ) { }
  ngOnInit() {
   
    this.userName=localStorage.getItem("name");
    this.httpClientService.getUserCoins(this.userName).subscribe(response=>this.coins=response.coins);
   
  }

  logout(){
 
    localStorage.removeItem("name");
    this.router.navigate(['']);
  }
}
