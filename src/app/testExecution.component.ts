import { Component, OnInit} from '@angular/core';
import { Http,Response } from '@angular/http';
//import {ProjectSeServiceComponent} from './projectSelection.service';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';

import { TestExecutionServiceComponent } from './testExecution.service';
import {ProjectDetailServiceComponent } from './pDetail.service';
import {Post} from './post';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

@Component({
selector: 'app-test',

templateUrl: './html/testExecution.html',
styleUrls: ['./css/testExecution.css'],
providers : [ TestExecutionServiceComponent ]


}) // componrnt closing
export class TestExecutionComponent implements OnInit {

	showloader: boolean;
	timeRemaining: any;
	obj2: any;
runn = [];

moduleNames = [] ;
featureNames:Post[];
typeArray = [];
datas = [] ;
// shivu= [];
priorityArray = [];
testScriptsData:Post[];
projectIds:Post[]
// testScript = [];
demoArrayaData: String = "";
moduleId:string;
moduleName: string;
featureId:string;
featureName:string;
lineNum:string;
scriptName:string;
projectId:string;
srch:boolean;
test:any;
var2_featureName:any;
projectName:string;
vjData:any=[];
mData:any=[];

check:any;
a:any; 
$http: any;
c:Object={};

projectSelection: any;
index2: any;
mName: any;
fName: any;
sName: any;
lNum: any;
pSelection: any;
mod=[];
feat=[];
lin=[];
scri=[];
pro=[];
moduleDetails=[];
featureDetails=[];
featureDetails1=[];
featureDetails2=[];
featureDetails3=[];
featureData: any[];
fea:any[];
mo:any[];
lineNumDetails=[];
lineData: any[];
scripttData: any[];
scriptDetails=[];
aMN:string;
aFN:string;
aSN:string;
ind:number;
indU:number;
indUU:number;
allData:any;
displayStatus:any;
private subscription: Subscription;
constructor( private data: TestExecutionServiceComponent,public type: ProjectDetailServiceComponent , private http:Http) {
this.srch=false; 
}

ngOnInit() {

let dataFromProjectSelectionDropdown=sessionStorage.getItem('key');
this.projectName=dataFromProjectSelectionDropdown;
this.data.projectDetai(dataFromProjectSelectionDropdown).subscribe(Data => this.moduleNames = Data) ;

 this.type.typeDetails().subscribe(Data =>{this.typeArray = Data;console.log(this.typeArray)}) ;
this.type.priorityDetails().subscribe(Data => this.priorityArray = Data) ;
// this.data.testScriptDetails().subscribe(result => this.testScriptsData=result);
// this.data.showDetails().subscribe(Data => this.testScript = Data)
this.data.getProjectSelectionDetails().subscribe(Data =>this.datas=Data);



this.demoArrayaData = this.moduleNames[1];
// alert(dataFromProjectSelectionDropdown);
//this.data.projectIDS(dataFromProjectSelectionDropdown).subscribe(Data => this.projectIds = Data) ;

}



selectedPriority(sP){
//alert(sP)
}





moduleIndex(moduleId){
	//alert(dd)
	var getmodule=this.projectName+","+moduleId
	return this.http.get('http://localhost:2111/searchModule'+getmodule)
	.map((response: Response) => <Post[]>response.json())
	.subscribe(Data => {this.featureNames=Data; console.log(this.featureNames)});
	
	
	
	}

manualtoggle(clickModule,index){
this.aMN=clickModule;
this.ind=index;
// alert(typeof(index)+index) 
// alert(typeof( this.ind)+ this.ind) 
// console.log(this.mData) 
}

manualtoggle2(clickFeature,index){
this.aFN=clickFeature;
this.indU=index;
// alert(index+typeof(index)) 
// alert(this.indU+typeof(this.indU)) 
}

manualtoggle3(clickScript,index){
this.aSN=clickScript;
this.indUU=index;
// alert(index+typeof(index)) 
// alert(this.indU+typeof(this.indU)) 
}



lineNu:any

index1:any;
vj=[];
scriptData=[];
lineNumb:any;
finalFeature=[];
finalScript=[];
incNum:number;
modInc:number;


row(index,test) 
{
	console.log(test)
	//console.log(this.featureDetails3)
this.index1=index
//alert(this.index1);
this.moduleName=test.moduleName;
this.featureName=test.featureName;
this.lineNum=test.lineNum;
this.scriptName=test.scriptName;
this.projectSelection=test.projectSelection; 

var mobj:Object={}; 

var n=0;

if(this.featureDetails3.some(e=>e.moduleName===this.moduleName)===false ) {
	console.log(this.featureDetails3.length+"lllll")
mobj={}
	//if(this.featureDetails3.length==0){
mobj["moduleName"]=this.moduleName;
mobj["projectSelection"]=this.projectSelection;
mobj["featureName"] =[
// {"featureName":this.featureName,scriptName:[{"scriptName":this.scriptName}],lineNum:[{"lineNum":this.lineNum}]}
{"featureName":this.featureName,scriptName:[{"scriptName":this.scriptName,"lineNum":this.lineNum,"time":test.time}]}
];

console.log(mobj)
this.featureDetails3.push(mobj);

// this.df= this.featureDetails3[0].featureName[0].featureName
console.log("manish")
console.log(this.featureDetails3);
// }
// else{

// mobj={}
// mobj["moduleName"]=this.moduleName
// //mobj["projectSelection"]=this.projectSelection;
// mobj["featureName"] =[
// // {"featureName":this.featureName,scriptName:[{"scriptName":this.scriptName}],lineNum:[{"lineNum":this.lineNum}]}
// {"featureName":this.featureName,scriptName:[{"scriptName":this.scriptName,"lineNum":this.lineNum}]}
// ]
// ;
// console.log(mobj)
// this.featureDetails3.push(mobj);
// // this.df= this.featureDetails3[0].featureName[0].featureName
// console.log("ddddddish")
// console.log(this.featureDetails3);

// //this.modInc++

// }
// console.log(this.featureDetails3[0].featureName)
// console.log(this.featureDetails3[0].featureName[0].featureName);
// mobj={}
n=0;
this.modInc++;
this.incNum=0;
}
else if(this.featureDetails3.some(e=>e.featureName[this.incNum].featureName===this.featureName)===false){
console.log(this.incNum+"ttttttttttttt"+this.featureDetails3.length)
mobj={}
// mobj["featureName"] =[
// mobj={"featureName":this.featureName,scriptName:[{"scriptName":this.scriptName}],lineNum:[{"lineNum":this.lineNum}]}
var rr={"featureName":this.featureName,scriptName:[{"scriptName":this.scriptName,"lineNum":this.lineNum,"time":test.time}]}
// ];
// console.log(mobj)
// console.log(mobj[0])


this.featureDetails3[this.featureDetails3.length-1].featureName.push(rr);
this.incNum++
console.log("moduudle"+this.modInc)
console.log("vicky"+this.incNum)

console.log(this.featureDetails3);
n=0;
// console.log(this.featureDetails3[0].featureName);
//console.log(this.featureDetails3[0].featureName[0]);
// console.log(this.featureDetails3[0].featureName[0].scriptName[0]);
// console.log(this.featureDetails3[0].featureName[0].scriptName[0].scriptName);
}
else if(this.featureDetails3.some(e=>e.featureName[this.incNum].scriptName[n].scriptName===this.scriptName)===false){

console.log(n+"ssssssssssssssssssssssss"+this.featureDetails3.length)
n++
console.log("script")
mobj={}
console.log(mobj)
// mobj["featureName"] =[
// mobj={"scriptName":this.scriptName,lineNum:[{"lineNum":this.lineNum}]}
var dd={"scriptName":this.scriptName,"lineNum":this.lineNum,"time":test.time} 
// ];
console.log(dd)


this.featureDetails3[this.featureDetails3.length-1].featureName[this.incNum].scriptName.push(dd);
console.log(this.featureDetails3)

// console.log(this.featureDetails3[0]);
// console.log(this.featureDetails3[0].featureName);
// console.log(this.featureDetails3[0].featureName[0]);
}

var featu:Object={};
featu["moduleName"]=this.moduleName;
featu["featureName"]=this.featureName;
featu["scriptName"]=this.scriptName;
this.featureDetails2.push(featu);
// console.log("this.featureDetails2")
// console.log(this.featureDetails2)

var featu1:Object={};
featu1["moduleName"]=this.moduleName;
featu1["featureName"]=this.featureName;
featu1["scriptName"]=this.scriptName;
this.featureDetails1.push(featu1);
// console.log("this.featureDetails1")
// console.log(this.featureDetails1)
//this.mData=this.moduleDetails;
for ( var i=0, len=this.moduleDetails.length; i < len; i++ )
mobj[this.moduleDetails[i]['featureName']] = this.moduleDetails[i];
//alert("MMMMMMMMMMMOOOOOOOOOOO")
this.moduleDetails = new Array();
this.moduleDetails.push(mobj);
//console.log(this.moduleDetails);
this.mo=this.moduleDetails;
//console.log(this.mo);


var featu:Object={};
featu["moduleName"]=this.moduleName;
featu["featureName"]=this.featureName;
featu["scriptName"]=this.scriptName;
//var cc=[]

//console.log(this.featureDetails.some(e=>e.featureName===this.featureName))
if(this.featureDetails.some(e=>e.featureName===this.featureName)===false && this.featureDetails.some(e=>e.scriptName===this.scriptName)===false || this.featureDetails.some(e=>e.featureName===this.featureName)===false && this.featureDetails.some(e=>e.scriptName===this.scriptName)===false) {
//console.log(cc)
this.featureDetails.push(featu);
// console.log("this.featureDetails")
// console.log(this.featureDetails)
// for ( var i=0; i<=this.featureDetails.length-1; i++ ) {
this.finalFeature=this.featureDetails
// console.log("hhhhhhh")
//console.log(this.finalFeature)
this.finalScript=this.featureDetails
// console.log(this.finalScript)
//console.log(typeof(this.featureDetails[i].featureName)+this.featureDetails[i].featureName)
// if(){
// alert("equal")
// }
//}

}
}

vj2=[];
ro(index,dd){
this.index2=index;
this.mName=dd.moduleName;
this.fName=dd.featureName;
this.sName=dd.scriptName;
this.lNum=dd.lineNum;
this.pSelection=dd.projectSelection;

var obj:Object={};


obj["moduleName"]=this.mName;
obj["featureName"]=this.fName;
obj["scriptName"]=this.sName;
obj["lineNum"]=this.lNum;
obj["projectSelection"]=this.pSelection;
// console.log(obj);
this.vj2.push(obj);
//console.log(this.vj2)
this.testScriptsData=this.vj2;
this.vjData.splice(this.index2,1);
}
search(moduleId,featureId,type,priority) 
{

this.allData=""	
if( moduleId==undefined && featureId==undefined && this.projectName==undefined && type==undefined && priority==undefined) 
{
alert("Please Fill Madatory Fields")

}


	this.srch=true;


this.lineNu =moduleId+','+featureId+','+this.projectName+','+type+','+priority
console.log(this.lineNu);
this.data.testScriptDetails(this.lineNu)
//.map(response => response.json())
.subscribe(result =>{this.testScriptsData=result;console.log(this.testScriptsData);
this.displayAllData(this.testScriptsData)
});

}

displayAllData(display){
console.log("enetrtttttt"+display.length)
if(display.length==0){
	console.log("jjjkkkkk")
this.allData="No Data Available";
}
}

run() { 
//alert("Run");


		this.displayStatus="Setting environment";
			return this.http.post('http://localhost:2111/testScript',this.featureDetails3) 
 				.map(res=> res.json())
				.subscribe(result1 =>{
				this.displayStatus=result1.status
				console.log(result1)
				//alert(result1.status+"  1")
				this.showloader = true; 
					return this.http.post('http://localhost:2111/testRunDirectory', result1) 
						.map(res=> res.json())
						.subscribe(result2 =>{this.displayStatus=result2.status;console.log(result2)
						 //	this.timeRemaining = result2.timeRequired;

									var sec = Math.round( Number(result2.timeRequired)/1000 )+45;
									let timer = TimerObservable.create(1000, 1000);
									this.subscription = timer.subscribe(t =>{

											if( --sec == 0){

												this.subscription.unsubscribe();
												this.displayStatus='';
												this.timeRemaining = "It takes more than average time please wait ..."
											}else if(this.showloader == false){ 
												this.subscription.unsubscribe(); 
												this.timeRemaining = '';
											}else{
												this.timeRemaining = sec;
											}

									});


								return this.http.post('http://localhost:2111/testRunFinalExecution', result2) 
										.map(res=> res.json())
										.subscribe(result3 =>{this.displayStatus=result3.status;console.log(result3)
								
											var refreshData  = false; 
											var checkVar = 0;
											var refreshId = setInterval(()=> {
												var data = checkCall();
												console.log("  refreshData "+refreshData+"   data "+data) 
											
														if ( refreshData  === true) {
															
															console.log("properID true   "+ data)
														clearInterval(refreshId);
														
														}
											}, 20000);
 

											const checkCall = () => {    
													if(refreshData  === false){

															this.http.post('http://localhost:2111/testRunReportDataChecking', result3) 
																	.map(res=> res.json())
																	.subscribe(result4 =>{this.displayStatus=result4.status;console.log(result4)
																			console.log(result4.status+" 456 ")
																			refreshData = result4.finished;

																			if(result4.finished  === true && checkVar === 0){
																					checkVar++;
																					this.showloader = false; 
																					this.timeRemaining = "";
																					//alert(" report")
																					this.http.post('http://localhost:2111/testRunReportDataGeneration', result4) 
																						.map(res=> res.json())
																						.subscribe(result4 =>{this.displayStatus=result4.status;console.log(result4)
																								console.log(result4.status+" 456 ")
																								return result4.finished;
																						})
																			//Path,jsonFile,folder
																			}else{    

																					return result4.finished;
																				}
																	})      

															//Path,jsonFile,folder
															}	


											 }//checkcall
										
										})
			            })

				  })
}				  

DocRun()
{
//alert("clicked on docker")
this.http.post('http://localhost:2111/Dockerrun',this.featureDetails3) 
.map(res=> res.json())
.subscribe(result1 =>{
alert("Docker execution completed");


});

}

}





//docker
//docker run function

