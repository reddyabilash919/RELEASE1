import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';


import{ImportServiceComponent} from './importPage.service';
import {ProjectDetailServiceComponent} from './pDetail.service';

import {Post} from './post';
import 'rxjs/add/operator/map';
@Component({
   selector: 'app-import',
 
  templateUrl:'./html/importPage.component.html',

providers: [ProjectDetailServiceComponent]
   //styleUrls: ['./pDetail.component.css'],

       

})//componrnt  closing

export class ImportComponent implements OnInit   {
 
 
 
   // typeDataCollection:Post[];
   // priorityDataCollection:Post[]; 
   // typeDropdown:string; 
   // priorities=[];
   types:Post[];
   priorities:Post[];
  features:Post[];
  modules=[];
  allData:any;
  moduleSelected:string;
featureSelected:string;
typeSelected:string;
prioritySelected:string;
timeGiven:string;
gitMessage:any;
npmMessage:any;
   constructor(private importService:ImportServiceComponent,private router: Router,
     private data:ProjectDetailServiceComponent,private http:Http){
  //alert("jjjjjjjjjjjj")

   }


      ngOnInit(){
    
this.data.projectDetails()
          .subscribe(Data => this.modules=Data, error => console.log(error));
          this.importService.getTypeDetails()
          .subscribe(data => this.types=data);
           this.importService.featureDetails()
          .subscribe(llData => this.features=llData);

         // console.log(this.typeDataCollection)

         //   this.types=this.typeDataCollection;

console.log(this.types)

       this.importService.getPriorityDetails()
          .subscribe(llData => this.priorities=llData);

       //   // console.log(this.projectSelectionData)

       //     this.priorities=this.priorityDataCollection;




      }

//normalMessage:any
gitClone(gitUrl){
 
//   alert(gitUrl)
this.gitMessage="Please Wait Git Is Cloning"
   let urlSearchParams = new URLSearchParams();
urlSearchParams.append('gitClone',gitUrl);
// alert(gitClone)
  return this.http.post('http://localhost:2111/gitClone',urlSearchParams)
       .map(response => response.json())
       .subscribe(data => {this.gitMessage=data;
     console.log(this.gitMessage)
    });
}

npmInstall(npmPath){
  this.npmMessage="Please Wait NPM Is Installing"
    let urlSearchParams = new URLSearchParams();
 urlSearchParams.append('npmPath',npmPath);
 // alert(gitClone)
   return this.http.post('http://localhost:2111/npmInstall',urlSearchParams)
        .map(response => response.json())
        .subscribe(data => {this.npmMessage=data;
       console.log(this.npmMessage);this.landProjectSelection(this.npmMessage)
     }); 
 
 
 }
 landProjectSelection(message){
  // alert("succes Land")
 // if(message=="NPM Install Is Succesffully Completed"){
 this.router.navigate(['/projectSelection']);
 
 //}
 
 
 }

      
      getfolder(e) {
   console.log(typeof(e))
}

saveImportData(){
  
  this.allData=this.moduleSelected+","+this.featureSelected+","+this.typeSelected+","
  +this.prioritySelected+","+this.timeGiven;
   //console.log( this.allData)
   //this.importService.importSaveDetails(this.allData)

let urlSearchParams = new URLSearchParams();
urlSearchParams.append('moduleName',this.moduleSelected);
urlSearchParams.append('featureName',this.featureSelected);
urlSearchParams.append('typeName',this.typeSelected);
urlSearchParams.append('priority',this.prioritySelected);
urlSearchParams.append('time',this.timeGiven);

    return this.http.post('http://localhost:2111/savingImportData', urlSearchParams)
      .subscribe(data => {
      console.log(data);
    });

}
      
 

  


}
