import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

@Injectable()


export class LoginServiceComponent {

 
 constructor(private _http:Http){


 }
  getLoginDetails(){
 	
   return this._http.get("http://localhost:2111/loginDetails")
   .map((response:Response)=>response.json());
 
  }
}
