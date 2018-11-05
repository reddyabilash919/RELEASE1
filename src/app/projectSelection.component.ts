import { Component,OnInit,OnChanges,SimpleChanges,Input} from '@angular/core';
import { Router } from '@angular/router';
import { Http,Response,Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';
import {ProjectSelectionServiceComponent} from './projectSelection.service';
//import {ProjectDetailComponent} from './pDetail.component';
import {Post} from './post';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-selection',
  templateUrl:'./html/projectSelection.html' ,

   providers: [ProjectSelectionServiceComponent],

   


 })//componrnt  closing

export class SelectionComponent implements OnInit, OnChanges {
   // headers: Headers;
   //  options: RequestOptions;

   theFiles:any;
   relativePath :any;
   datas:Post[];

   selectedDropdown:string; 
   child:string
   projectSelectionData=[];
   currentFile:any;
 projectName:string;
 Folder:any;
 sucess:any;
 moduleSelected:any;
 //message:any;
 pomFile:any;
 testFile:any;
   constructor(private ata:ProjectSelectionServiceComponent,private router: Router,private http:Http){
  this.theFiles= [];

   }


      ngOnInit(){
    
//console.log("iiiiiiiiiiiiiiiii")
          this.ata.getProjectSelectionDetails()
          .subscribe(llData => {this.datas=llData, console.log(this.datas)});

         // console.log(this.datas)

          //this.datas=this.projectSelectionData;



      }




          dropdownData(dataSelected){
           //alert(this.moduleSelected)
//alert(dataSelected)
            sessionStorage.setItem('key',this.moduleSelected);
             this.router.navigate(['/projectDetail']);

          }
              createProject(){

           
             this.router.navigate(['/createProject']);

          }

             ngOnChanges(){


             }



// framework(fw){
//  sessionStorage.setItem('framework',fw);
//   //alert(fw)
//   let urlSearchParams = new URLSearchParams();
// urlSearchParams.append('framework',fw);
//   return this.http.post('http://localhost:3666/testNg', urlSearchParams)
//       .subscribe(data => {
//       console.log(data);
//     });
// }




}