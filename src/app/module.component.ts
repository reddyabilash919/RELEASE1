import { Component,OnInit} from '@angular/core';
import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';

import{ModuleServiceComponent} from './modulePage.service';
import{ProjectDetailServiceComponent} from './pDetail.service';
import {Post} from './post'
@Component({
    selector: 'app-module',
 
  templateUrl:'./html/modulePage.component.html',


   //styleUrls: ['./pDetail.component.css'],

       

})//componrnt  closing

export class ModuleComponent implements OnInit   {
 
    moduleName:string;
  moduleIdincrement:number=0;
  incModuleId:string; 
showInc:Post[];
nterval: any;
    constructor(public http:Http,private sendModuleName:ModuleServiceComponent,private inc:ProjectDetailServiceComponent) {
  
  
 
    }
      ngOnInit(){
        

this.sendModuleName.idDetails()
.subscribe(moduleData =>{this.showInc=moduleData;this.idInc(this.showInc) });




      }
 
 idInc(incId){
  // console.log(hh[0].moduleId)
  // console.log(hh.length)
if(incId.length==0){

alert("make responce o")
}
else{
  var collMId=parseInt(incId[0].moduleId)
  //alert(collMId)
   var iCollMId=collMId+1;
   this.incModuleId=iCollMId.toString();
  //alert( this.incModuleId+"string")
}


}

   saveModuleName(){
   this.nterval=setInterval(() => {
      this.ngOnInit();
 
 }, 1000);
//alert(this.moduleName)
//alert(this.moduleIdincrement++)
if(this.moduleName==undefined){
alert("please Fill ModuleName")
}
else{
//this.sendModuleName.moduleServiceDetails(this.moduleName)
//alert("kk")
console.log(this.moduleName+"mm")
console.log(this.incModuleId+"mm")
  let urlSearchParams = new URLSearchParams();
urlSearchParams.append('moduleName', this.moduleName);
urlSearchParams.append('moduleId', this.incModuleId);

// <<<<<<< HEAD
//     return this.http.post('/postModuleName'+ urlSearchParams,{})
// =======
    return this.http.post('http://localhost:2111/postModuleName'+ urlSearchParams,{})
//>>>>>>> f40691273c2e1609e48105331b3acaacee43b64b
      .subscribe(data => {
      console.log(data);
    });

}



   }
ngOnDestroy(){
 console.log("destroy")
  clearInterval(this.nterval);


}


}
