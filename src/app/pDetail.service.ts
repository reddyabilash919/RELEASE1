import { Injectable } from '@angular/core';

import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


import { URLSearchParams } from '@angular/http';

import {Post} from './post';
@Injectable()
export class ProjectDetailServiceComponent {



  projectDetails: any;
constructor(private http: Http) {

}
// response:any
projectDetailss(a): Observable<Post[]>{
//alert(a)
return this.http.get("http://localhost:2111/getDataModule"+a)
.map((response: Response) => <Post[]>response.json());

}


moId(clickModule):Observable<Post[]>{
//alert("ll00")
return this.http.get("http://localhost:2111/getMoId"+clickModule)
.map((response:Response)=><Post[]>response.json());

}
getProjectDir(searchDir):Observable<Post[]>{
//alert(searchDir)
return this.http.get("http://localhost:2111/searchDir"+searchDir)
.map((response:Response)=><Post[]>response.json());

}

childModuleDetails(index): Observable<Post[]> {

// alert(typeof(index)+index)
// let params = new URLSearchParams();
// params.set('selectedModule', 'selectedModule');

return this.http.get('http://localhost:2111/getFeatureName' + index)
.map((response: Response) => <Post[]>response.json());
//console.log(response.json())

}


createFolder(folderName): Observable<Post[]>{
//alert(folderName)
return this.http.get("http://localhost:2111/createFolder"+folderName)
.map((response: Response) => <Post[]>response.json());

}




childModuleDetails1(): Observable<Post[]> {

//alert("aaaaa")
// let params = new URLSearchParams();
// params.set('selectedModule', 'selectedModule');

return this.http.get('http://localhost:2111/featureName')
.map((response: Response) => <Post[]>response.json());

}


// response:any
typeDetails(): Observable<Post[]> {
// alert("ll00")
return this.http.get("http://localhost:2111/importType")
.map((response: Response) => <Post[]>response.json());

}

priorityDetails(): Observable<Post[]> {
// alert("ll00")
return this.http.get("http://localhost:2111/importPriority")
.map((response: Response) => <Post[]>response.json());

}




moduuu(): Observable<Post[]> {

// alert("6666666666666666666666666666666")


return this.http.get('http://localhost:2111/postmodule')
.map((response: Response) => <Post[]>response.json());

}

idDetails(ss):Observable<Post[]>{
//alert("ll00")
return this.http.get('http://localhost:2111/getIds'+ss)

.map((response:Response)=><Post[]>response.json());


} 

reportDetails(run): Observable<Post[]>{
    return this.http.get("http://localhost:2111/getreportDetail"+run)
    .map((response: Response) => <Post[]>response.json());
    }





}

