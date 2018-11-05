import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';
import {Post} from './post'


@Injectable()
export class FeatureServiceComponent {

 
 constructor(public http:Http){


 }
//    featureServiceDetails(){

//   let urlSearchParams = new URLSearchParams();
// urlSearchParams.append('featureName', featureName);



//  	//alert(urlSearchParams+"yy")
//  	//console.log(urlSearchParams)
//     return this.http.post('/postFeatureName', urlSearchParams)
//       .subscribe(data => {
//       console.log(data);
//     });
 

//   }
 getMId(selectedValue):Observable<Post[]>{
 	//alert("ll00")
   return this.http.get("/mId"+selectedValue)
  .map((response:Response)=><Post[]>response.json());

  }
   idFDetails():Observable<Post[]>{
 	//alert("ll00")
   return this.http.get("/idFeature")
  .map((response:Response)=><Post[]>response.json());

  }

  



}