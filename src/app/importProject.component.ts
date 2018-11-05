import { Component,OnInit,OnChanges,SimpleChanges,Input} from '@angular/core';
import { Router } from '@angular/router';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Observable } from 'rxjs';

import { URLSearchParams } from '@angular/http';
import {ProjectSelectionServiceComponent} from './projectSelection.service';
//import {ProjectDetailComponent} from './pDetail.component';
import {Post} from './post';
@Component({
  selector: 'app-createproject',
  templateUrl:'./html/importProject.html' ,

   //providers: [ProjectSelectionServiceComponent],

   


 })//componrnt  closing

export class ImportProjectComponent implements OnInit {
    theFiles:any;
   relativePath :any;
   datas:Post[]; 
   selectedDropdown:string; 
   child:string
   projectSelectionData=[];
    public files: UploadFile[] = [];
   currentFile:any;
 projectName:string;
 Folder:any;
 sucess:any;
 message:any;
 pomFile:any;
 testFile:any;
 dataFromFrameworkDropdown:string;
    frameworkSelected:string;
   constructor(private router: Router,private http:Http){
 this.theFiles= [];
  

   }


      ngOnInit(){
     // this.dataFromFrameworkDropdown=sessionStorage.getItem('framework')
//alert(dataFromFrameworkDropdown)

      }

framework(fw){
  this.dataFromFrameworkDropdown=fw;
 //sessionStorage.setItem('framework',fw);
  //alert(fw)
//   let urlSearchParams = new URLSearchParams();
// urlSearchParams.append('framework',fw);
//   return this.http.post('http://localhost:3666/testNg', urlSearchParams)
//       .subscribe(data => {
//       console.log(data);
//     });
}


  // public fileOver(event){
  //   console.log("event");
  // }
 
  // public fileLeave(event){
  //   console.log("ddevent");
  // }








      goBackPage(){

        this.router.navigate(['/projectSelection']);
      }








filesPicked(e) {
  this.message="Please Wait"
     let totalLength =  e.target.files.length;
 var files = e.target.files;
     var path = files[0].webkitRelativePath;
    var Folder = path.split("/");
    console
    this.projectName=Folder[0]
  
    for (var i = 0; i <totalLength ; i++) {
    
     this.theFiles =<Array<File>>e.target.files;


    this.relativePath = this.theFiles[i].webkitRelativePath;
    this.currentFile = this.theFiles[i];
   console.log(this.relativePath)

    var checkPom=this.relativePath.split("/").pop();

  if (checkPom=="pom.xml" ){
   this.pomFile="present"
    }
    if (checkPom=="TestRunnerNew.java" ){
   this.testFile="present"
    }
 
      var a =   this.relativePath.replace(/[/]/gi, '-');
    
  this.makeFileRequest("/projectSelection/"+a, [],this.theFiles,i,totalLength ).then((result) => {

console.log(typeof(result)+result)
this.message=result;

        }, 
        (error) => {
            console.error("error");
        });
    
   
}

  
// if( this.pomFile!="present" ){
//   alert("pom.xml is not present")
// }
// if( this.testFile!="TestRunnerNew.java"){
//   alert("TestRunnerNew.java is not present")
// }

   
}

 makeFileRequest(url: string, params: Array<string>, files: Array<File>,i:number,totalLength :number) {
         //alert("pppp")
         this.message="Please Wait"

        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
      
                formData.append(this.relativePath , files[i]);
      
        
           formData.append("totalLength",totalLength );
           formData.append("currentLength",i );
           formData.append("dataFromFrameworkDropdown",  this.dataFromFrameworkDropdown)
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                      //console.log(JSON.parse(xhr.response))
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
            //console.log("formData      "+formData)
        });
    }




}