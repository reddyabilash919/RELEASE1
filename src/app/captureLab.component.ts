import { Component,OnInit} from '@angular/core';
import { Http,Response } from '@angular/http';
// import { ActivatedRoute, Router } from '@angular/router';
import { CaptureLabServiceComponent} from './captureLab.service';
import { Post } from './post';
@Component({
  selector: 'app-cap',
 
  templateUrl:'./html/captureLab.html',

     providers: [CaptureLabServiceComponent]
            
     })

export class CaptureLabComponent implements OnInit  {
 
   devicesName:String;
   devicesId:String;
   dvc:boolean;
   result:Post[];
   deviceslength:string;
   DeviceId:String;
   fulldeviceslist:String[];
   detailObj=[]; 
   rowSelected:boolean;
   checkBox=[];
   selectedrow:string;
   idSelectedVote:string;
   indexx:number;
   yashwanth:string;
   deviceDetails:Object={};
   devicesFun:Function;
   apkPath:Object={};
   filesToUpload: Array<File>;
   devicesDetails:any;
   completepath: any;
   todaydate: string;
   currentTime: string;
   toTime: string;
   gotBlockedDevice:any;
   blockToTime:boolean;
   blockTdData:boolean;
  

  constructor(private mobileApps:CaptureLabServiceComponent,  private http:Http) {
    this.dvc=false; 
    this.filesToUpload = []; 
      }

      ngOnInit() {
        this.todaydate=new Date().toISOString().substr(0, 10);
        var HH = new Date().getHours();
        var MM = new Date().getMinutes();    
        this.currentTime = HH+":"+MM;
        this.toTime = HH+":"+MM;
        this.blockToTime=false;
        this.blockTdData=false;        
       }

       ////////////////////////////////////////////

       upload() {
        this.makeFileRequest("http://localhost:2111/shivaa", [], this.filesToUpload).then((result) => {
            console.log(result);
            if(result!=0)
            {
            console.log(result[0].path);
            this.completepath = result[0].path;
            console.log(this.completepath+"this.completepath");
            console.log(result[0].filename)
            alert(result[0].filename + " Installed in" + this.completepath);

            }
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
          console.log(files[i].name)
            formData.append("uploads[]", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}



       ////////////////////////////////////////////

       connect(){
        this.dvc=true;
        this.mobileApps.captureLabServiceDetails(); 
        this.getMobileDevice(); 
        }

        getMobileDevice(){
          alert("Wait for a Second")
          this.mobileApps.mobileAppDetails().subscribe(mobileData => this.result = mobileData);
        }
        setClickedRow = function(i)
        {  
          this.selectedRownew = i;
        }
        

        // checkFunValue(index){
        //   alert(index)
        //   this.indexx = index;
        //   console.log(this.indexx)
        // }

      //   checkSelected(label: string) {
      //     this.checkBox.forEach(x => {
      //         if(x.label !== label) {
      //             x.checked = !x.checked
      //         }
      //     })
      //  }
      blockDevices(currentTime,toTime,DevicesId,DevicesName){
        var obj79={};
        obj79["DevicesId"]=DevicesId;
        obj79["FromTime"]=currentTime;
        obj79["ToTime"]=toTime;
        this.http.post('http://localhost:2111/blockDevice',obj79,{})
          .subscribe(result =>{ this.gotBlockedDevice = result
            console.log("yashwanth");
            alert("Devices is Blocked")   
          });


      }
      somethingChanged(currentTime,toTime,DevicesId){
        if( toTime >= currentTime )
        {
          this.blockToTime=false;  
          var blockeDtails = DevicesId+","+currentTime+","+toTime;
          this.http.get('http://localhost:2111/checkBlockedDevice'+blockeDtails,{})
         .map((response: Response) => <Post[]>response.json())
         .subscribe(result => {
          console.log(result[0].ToTime)
          if(result[0].ToTime == toTime){
            this.blockTdData=true;
            this.blockToTime=true;
            alert("Devices is Blocked For This Time")
            }
          else
          {
          this.blockTdData=false;
          this.blockToTime=false;
          }
          
        })
        }
        else{
          this.blockToTime=true;
        }
      }
    
    checkFun(devicesId,value)
    {
      alert(value)
      this.rowSelected=true;
      var numbers = {};
      numbers["devicesid"]=devicesId;
      this.detailObj.push(numbers);
      this.fulldeviceslist=this.detailObj;     
    }
    
    installApk()
    {
      console.log(this.fulldeviceslist)
      
      var deviceslength=this.fulldeviceslist.length;
        this.devicesFun = function(y)
        {
          if(y  < deviceslength)
        {
          var obj77={};
          obj77["deviceId"]=this.fulldeviceslist[y].devicesid;
          obj77["apkPath"]=this.completepath;
          this.http.post('http://localhost:2111/installapk',obj77,{})
          .subscribe(result =>{
          console.log(result)
          });	
          this.devicesFun(y+1)
          }//ifclosingsfun
        }//closingsfun
        this.devicesFun(0);       

    }
      

   }
