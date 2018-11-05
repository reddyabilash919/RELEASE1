import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import {Post} from './post'
import 'rxjs/add/operator/map';
@Injectable()
export class ProjectSelectionServiceComponent {

 
 constructor(private http:Http){

 }
   getProjectSelectionDetails():Observable<Post[]>{
   //alert("ll00")
   return this.http.get("http://localhost:2111/selectionProject")
  .map((response:Response)=><Post[]>response.json());

  }
//      folderNameDetails(folder):Observable<Post[]>{
//        //alert(typeof(folder)+folder)
//    //alert("ll00")
//      let urlSearchParams = new URLSearchParams();
// urlSearchParams.append('folderName', "folder");
// console.log(urlSearchParams)
//    return this.http.post("/selectedFolderName",urlSearchParams)
//   .map((response:Response)=><Post[]>response.json());

//   }
  
}