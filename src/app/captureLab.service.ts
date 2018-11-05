import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';


import { URLSearchParams } from '@angular/http';

import {Post} from './post';

@Injectable()
export class CaptureLabServiceComponent {


 constructor(private http: Http) {

 }

 mobileAppDetails(): Observable<Post[]>{
  return this.http.get("http://localhost:2111/mobileAppsDetails")
 .map((response: Response) => <Post[]>response.json());

 }
 captureLabServiceDetails() {
  let urlSearchParams = new URLSearchParams();
  urlSearchParams.append('devicesName',"Manish" );
  urlSearchParams.append('devicesId',"7345y713833434");
   
       this.http.post('http://localhost:2111/postDevicesName',urlSearchParams)
      .subscribe(data => {console.log(data);
    });
  }



  }