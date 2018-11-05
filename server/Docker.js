module.exports=function(app){

const exec = require('child_process');
const Filehound=require('filehound');
var fs = require('fs');
var promise = require('bluebird');

//docker code vinayak
app.post('/Dockerrun',function(req,res){
console.log("turning on Dockervvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv444444444444444444444444444444444444444444444vv");
const Filehound = require('filehound');
Filehound.create()
.ext('bat')
.match('vin.bat')
.path('./batchFiles')
.find((err,htmlFiles)=>{
console.log(htmlFiles);
// var dockerpath = "D:/octcode15/batchFiles/vin.bat";
var dockerpath=".\\"+htmlFiles;
var stream = fs.createWriteStream(dockerpath);
stream.write("@echo on\n")
stream.write("C: "+"cd "+"/Users/Opal_User1/Desktop/Final_demo && "+"docker --version && "+" docker run --name opal002 -t opalmag1");
console.log(dockerpath)
require('child_process').exec(dockerpath,(err,stdout,stderr)=>
{
console.log("in child process");
// if(err){throw err}
//console.log("docker run falied");
if(stdout){
console.log("execution completed");
res.json(stdout);
}
else(stderr)
// res.json("docker execution completed")
console.log("completed")
});

})
});
//docker end

app.post('/DockerCopy',function(req,res){
console.log("coping form Docker444444444444444444444444444444444444444444444vv");
const Filehound = require('filehound');
Filehound.create()
.ext('bat')
.match('vincopy.bat')
.path('./batchFiles')
.find((err,htmlFiles)=>{
console.log(htmlFiles);
// var dockerpath = "D:/octcode15/batchFiles/vin.bat";
var dockerpath=".\\"+htmlFiles;
var stream = fs.createWriteStream(dockerpath);
stream.write("@echo off\n")
stream.write("D: &&"+"cd /Final_Demo &&"+" docker cp -a opal013:/home/node/app/cypress/videos D:/Final_Demo/videos ");
// +
// " doccker cp -a opal013:/home/node/app/cypress/videos D:/Final_Demo/videos &&"+" docker cp -a opal013:/home/node/app/reports D:/Final_Demo/reports1");
console.log(dockerpath)
require('child_process').exec(dockerpath,(err,stdout,stderr)=>
{
console.log("in child process");
// if(err){throw err}
//console.log("docker run falied");
if(stdout){
console.log("execution completed");
res.json(stdout);
}
else(stderr)
// res.json("docker execution completed")
console.log("completed")
});

})
});




}