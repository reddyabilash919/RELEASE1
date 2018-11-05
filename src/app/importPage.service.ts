import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import {Post} from './post'
@Injectable()
export class ImportServiceComponent {

 
 constructor(public http:Http){

 }
   getTypeDetails():Observable<Post[]>{
 	//alert("ll00")
// <<<<<<< HEAD
//    return this.http.get("/importType")
// =======
   return this.http.get("http://localhost:2111/importType")
//>>>>>>> f40691273c2e1609e48105331b3acaacee43b64b
  .map((response:Response)=><Post[]>response.json());

  }
     getPriorityDetails():Observable<Post[]>{
 	//alert("ll00")
// <<<<<<< HEAD
//    return this.http.get("/importPriority")
// =======
   return this.http.get("http://localhost:2111/importPriority")
//>>>>>>> f40691273c2e1609e48105331b3acaacee43b64b
  .map((response:Response)=><Post[]>response.json());

  }
     featureDetails():Observable<Post[]>{

  
// <<<<<<< HEAD
//     return this.http.get('/featureName')
// =======
    return this.http.get('http://localhost:2111/featureName')
//>>>>>>> f40691273c2e1609e48105331b3acaacee43b64b
    .map((response:Response)=><Post[]>response.json());
 

  }

}