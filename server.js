
 const express=require('express');
 const app=express();
 const path=require('path');
 var mongo = require('mongodb');
 const bodyParser=require('body-parser');
 var rimraf = require('rimraf');
 //const crypto=require('crypto')//give file name
 const multer=require('multer')
 const GridFsStorage=require('multer-gridfs-storage')
 const gridfs=require('gridfs-stream')
 var mongojs=require('mongojs');
 var mongoose  = require('mongoose');
 var fs = require('fs');
 const exec = require('child_process')
 const JSON = require('circular-json');
 const Filehound=require('filehound');
 
 //////////////////tetslink/////////////////
 var TestlinkConnect = require("testlink-connect");
 var key = "af493b7a61a1394bdaa8ad7bfe153892";
 var url = "http://localhost/testlink/lib/api/xmlrpc/v1/xmlrpc.php";
 //var tc = new TestlinkConnect(key,url);
// tc.getTestLinkVersion(function(callback){ 
 //console.log(callback); 
 //});
 ///////////////////////////////////////////
 // var hostedGitInfo = require("hosted-git-info")
 // var info = hostedGitInfo.fromUrl("https://github.com/TeamPlatform/finalCode0310.git","./uploads")
 //console.log(info)
 //var mongoStore = require('connect-mongo')(session);
 
 var methodOverride = require('method-override');
 var bson = require('bson');
 var Promise = require('es6-promise').Promise;
 //var Decimal128 = require('mongodb').Decimal128;
 app.use(bodyParser.json({limit: '50mb'})); // parse application/json
 app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
 app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));// parse application/x-www-form-urlencoded
 
 app.use(bodyParser.json());
 //const api=require('./server/routes/api')
 
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });
 
 
 
 app.use(express.static(path.join(__dirname,'dist')));
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));
 
 
 var db=mongojs('collections',['asd'])
 console.log(db)
 
 //for folders
 mongoose.connect('mongodb://localhost:27017/collections')
 mongoose.Promise = global.Promise;
 
 gridfs.mongo = mongoose.mongo;
 /*
   Check MongoDB connection
 */
 var connection = mongoose.connection;
 // const upload = multer({
 //   dest: './uploads/' // this saves your file into a directory called "uploads"
 // }); 
   //var gfs = gridfs(connection.db);
 var shell = require("shelljs");
 
 
 
 // Mongo URI
 const mongoURI = 'mongodb://localhost:27017/collections';
 
 // Create mongo connection
 const conn = mongoose.createConnection(mongoURI);
 
 // Init gfs
 var gfs;
 
 
 
 
 
 
 conn.once('open', () => {
   // Init stream
   gfs = gridfs(conn.db, mongoose.mongo);
  
    gfs.collection('folder');
 //   gfs.files.find().toArray(function (err, files) {
  
 //     console.log(files.length)
 //     console.log(files)
 // })  
 
 });
 
 
 app.get('/searchDir:sD',function(req,res){
 //console.log("sdddddddDir")
 // var sDir=req.params.sD;
 // //console.log(sDir)
 // var searchPath=__dirname+"/uploads/"+sDir
 // if(!fs.existsSync(searchPath)){
 // res.json("Please Wait Files Are Synchronizing")
 
 // }
 
 
 })
 app.get('/createFolder:data',function(req,res){
 //console.log("uiiiiiiiiiiiiiii"+req.params.data)
 // var projectName=req.params.data;
 // var projectPath=__dirname+"/uploads/"+projectName
 // var onlyOnce=1
 // if( onlyOnce===1 && !fs.existsSync(projectPath) ){
 // onlyOnce++
 // var trialCall = function() {
 // //console.log("aaaaaaaaaaaaaaauiiiiiiiiiiiiiii")
 // // var lengthCount =2910;
 // gfs.files.find({contentType:projectName}).toArray(function (err, files) {
 
 
 // let lengthCheck = files.length -1 ; 
 // var totalfiles=files.length
 
 // let i = 0;
 
 // let m =0;
 // var trialcall1 = function(m){
 // if(m=== lengthCheck){
 
 // }else{
 
 
 // //console.log("juuuuuuuuueee")
 // shell.mkdir('-p',"./"+files[m].metadata)
 
 
 // const stream = gfs.createReadStream(files[m].filename);
 
 // var seam = fs.createWriteStream(__dirname+"/"+files[m].metadata+"/"+files[m].filename);
 
 
 // stream.pipe(seam);
 // m++;
 // if(m==lengthCheck){
 // seam.on('finish', function(){
 // //console.log("ffffffffffffffff")
 // res.json("Synchronized Done");
 // });
 // }
 
 // console.log(m+" no loop "+" "+totalfiles) 
 
 // //console.log(m+" exectutr loop "+" "+files[m].filename) 
 // trialcall1(m)
 
 // }
 // } 
 // trialcall1(0)
 
 
 
 // })
 
 // // resolve(fileInfo);
 
 // // });
 // // }//)
 // // })//gfs
 // // }) 
 
 // }
 // // console.log("iam project"+ projectName[0]);
 // trialCall();
 
 // } 
 // else{
 
 // res.json("Already Folder Exits");
 // }
 //res.json("Please Wait File Is Synchronizing");
 
 })
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 // gfs = gridfs(conn.db, mongoose.mongo);
 // gfs.collection('folder');
  
 //Create storage engine
 const storage = new GridFsStorage({
   url: mongoURI,
   file: (req, file) => {
     return new Promise((resolve, reject) => {
       //crypto.randomBytes(16, (err, buf) => {
  
         var path = req.params.a;
         var latestPath =   path.replace(/[-]/gi, '/');
        
         let data_Array = latestPath.split("/");
      
         var latestPath123 = data_Array.splice(data_Array.length-1);
  var myJSON = JSON.stringify(latestPath123);
            
              latestPath = latestPath.substring(0, latestPath.length - myJSON.length+3); // "12345.0"
      
       
        // var newDestination = 'uploads/' + latestPath;
 
 
 
 
         // if (err) {
         //   return reject(err);
         // }
         
         const filename = file.originalname;
        
 
         const fileInfo = {
             metadata:'uploads/'+latestPath,
           filename:filename,
           contentType :data_Array[0],
           bucketName: 'folder'
         };
         resolve(fileInfo);
     //  });
     });
   }
 });
 const upload = multer({ storage });
 
 
 
 app.get('/selectionProject',function(req,res){
   //console.log("ppppppppppppppppppppp")
   db.projectSelection.find({},function(err,doc){
   res.json(doc);
   //console.log(doc) ;
   })
   })
   
   // app.post('/postDevicesName',function(req,res)
   // {
   // db.mobileApps.insert(req.body,function(err,doc)
   // {
   // res.json(doc);
   // console.log(doc)
   // });
   
   
   // })
   
   app.get('/getDataModule:p',function(req,res){ 
   console.log("moduleeeeeeerrrrrrrrrrrrrtttttttttttttttttttttttttttt")
   var data = req.params.p;
   console.log(data)
   db.projectSelection.find({"projectSelection":data},function(err,doc){ 
     db.moduleName.find({"projectId":doc[0].projectId},function(err,doc){
   res.json(doc);
   console.log(doc)
   })
 })
   
 })
   
   
   app.get('/getModuleData:pp',function(req,res){
   console.log("getttttttttttttttttt");
 
 
   var data = req.params.pp;
  //var data="Agility-Cypress-Tests-master\\endToEndTests"
   console.log(data);
   
   db.projectSelection.find({"projectSelection":data},function(err,doc){
   console.log(doc)
   //console.log(doc[0].projectId)
   db.moduleName.find({"projectId":doc[0].projectId},function(err,doc){ 
   res.json(doc);
   // console.log(doc)
   })
   
   //res.json(doc);
   
   })
   
   })
   
 
  
   
    app.get('/gs:dd',function(req,res){
   console.log("ttooooooooooo");
  
   var ee=req.params.dd
 console.log(ee)
   db.featureName.find({"moduleId":ee},function(err,doc){
   console.log(doc)
   res.json(doc)
   })
 })
   
 app.get('/searchModule:moduleData',function(req,res){
   console.log("ttooooooooooo");
  
   var moduleData=req.params.moduleData
 
  console.log(moduleData)
   var data_Array = moduleData.split(",");
   
   var projectFolder = data_Array[0];
  var moduleId = data_Array[1];
 
  db.projectSelection.find({"projectSelection":projectFolder},function(err,doc){
   if (moduleId=="All"){
   db.featureName.find({"projectId":doc[0].projectId},function(err,doc){
   console.log(doc)
   res.json(doc)
   })
 
 }
 else{
   //console.log("kkkkkkkkkkkkkkkkkkklooooooooooo"+doc[0].projectId)
   db.featureName.find({"moduleId":moduleId,"projectId":doc[0].projectId},function(err,doc){
   console.log(doc)
   res.json(doc)
   })
 
 }
 })
 })
 
 /////////////////////////////////
 
 
 ////////////////////////////////
 
 
 //============================================================================================================================
   // dbsNames (moduleName,featureName,lineNum,projectSelection)
   //})
 //=======
 
 //  var featureDuplicate=[]
 
 
 
   app.post('/testScriptChange',function(req,res)
   {
   var required=[]
   console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
   console.log(req.body[0].featureName[0].scriptName[0].scriptName)
 cypressBatFile(req.body)
 //req.body[0].featureName[0].scriptName[0].scriptName
 required.push(req.body[0].featureName[0].scriptName[0].scriptName)
 console.log(required)
  //var fs = require('fs');
   
   
   var file = "./"+"uploads/"+req.body[0].projectSelection+"/endToEndTests/node_modules/.bin/cypress/integration/"+req.body[0].moduleName+"/"+req.body[0].featureName[0].featureName+".js"; 
   console.log(file+"testpathhhhhh");
   
 //   var data = fs.readFileSync(testPath).toString().split("\n");
 //   //console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
 //   console.log(data)
 //   // console.log(htmlFiles)
  
 
  //var required = ['Demo on Paytm site','Demo on flipkart site1','Demo on flipkart site2','Demo on flipkart site3','Demo on flipkart site4']
 //var file = req.body[0].featureName[0].featureName;
 var requiredLength = required.length -1;
 
 
 
 var LineByLineReader = require('line-by-line');
 // lr = new LineByLineReader("./uploads/projectjavatriall756/Sample1/Features/abc.feature")
 // lr = new LineByLineReader("uploads/projectjavatriall7564/Sample1/Features/abc.feature")
 lr = new LineByLineReader(file)
 //console.log(lr)
 var newCss = '';
 lr.on('error', function (err) {
 // 'err' contains error object
 //console.log(" error rr rr rr ")
 });
 
 lr.on('line', function (line) {
 var conditionChek = false;
 required.forEach((element,index) =>{
 
 if(line.includes(element) == true ){
 conditionChek = true;
 newCss += line.toString().replace("it.skip", "it")+"\n";
 
 console.log(" required ");
 }
 if( conditionChek == false && line.includes(element) == false && requiredLength == index){
 // it skip
 if(line.includes("cy.") == false && line.includes("it") == true && line.includes(",") == true && line.includes("it.skip") == false ){
 // console.log(line)
 newCss += line.toString().replace("it", "it.skip")+"\n";
 }else{
 newCss += line+"\n"; 
 }
 
 }
 })
 
 
 });
 
 lr.on('end', function () {
 console.log(" end end Scenario true ")
 fs.writeFile(file, newCss, function(err) {
 if (err) {
 return console.log(err);
 } else {
 console.log('Updated!');
 }
 });
 // All lines are read, file is closed now.
 });
 //   for(i=0;i<data.length;i++){
 //     console.log("ttttttt")
 //    if( data[i].includes(" it('"=== true)) {
 
 // console.log(data[i])
 
 //    data[i] = "it.skip";
  
 //  }
 //   // console.log(true);
 //   }
   
 
 
  //  data = data.join("\n");
   
  //  fs.writeFile(testPath,data,function(err)
  //  {
  //  if (err) return console.log(err);
  //  // console.log(text);
  //  console.log("Replaced");
   
  // //execTestRunner( path,pomFilePath)
  //  }) 
   
 
 
 
 
 
 
 
 
 
   //checkxml(req.body)
   
   // dbsNames (moduleName,featureName,lineNum,projectSelection)
   })
 //>>>>>>> f40691273c2e1609e48105331b3acaacee43b64b
   
   
   
  // var checkxml = function(projectFolder,featureName,lineNum,moduleName){
   var checkxml = function(data){ 
   console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
   console.log(data);
   console.log(data[0].projectSelection)
   const Filehound = require('filehound');
   Filehound.create()
   .ext('xml')
   //.match(b)
   .paths( "./uploads/"+data[0].projectSelection)
   .find((err, htmlFiles) => {
   
   htmlFiles.forEach(function(file) {
   
   var LineByLineReader = require('line-by-line');
   lr = new LineByLineReader(file)
   //console.log(lr)
   lr.on('error', function (err) 
   {
   // 'err' contains error object
   //console.log(" error rr rr rr ")
   });
   
   lr.on('line', function (line) 
   {
   //console.log(line)
   
   
   if((line.includes("<exclude>") === true) && (line.includes("</exclude>") === true) && (line.includes(".java") === true))
   { 
   var res = (line.replace("<exclude>",'').replace("</exclude>",'')); 
   
   let pomFilePath = ( file.split("").reverse().join("")).substring(file.indexOf("\\")+1).split("").reverse().join("");
   
   Filehound.create()
   .ext('java')
   .match(res)
   .paths( "./uploads/"+data[0].projectSelection)
   .find((err, htmlFiles1) =>
   {
   // testRunnerCall(htmlFiles1[0].split("\\").pop() ,projectFolder,pomFilePath,featureName,lineNum,moduleName)
   
   console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
   testRunnerCall(htmlFiles1[0].split("\\").pop() ,data[0].projectSelection,pomFilePath,data)
    //console.log(htmlFiles1[0]);
   // console.log(data)
   
   }) 
   }
   });
   
   lr.on('end', function () {
   // console.log(" end end Scenario true ")
   // All lines are read, file is closed now.
   });
   
   })
   })
  // } // checkxml
   }
   
  // var testRunnerCall = function(runnerName,path,pomFilePath,featureName,lineNum,moduleName){
   
   //var testRunnerCall = function(runnerName,ps,pomFilePath,mn,fn,ln){ 
     var final = [];
     var arr = [];
     var testRunnerCall = function(runnerName,ps,pomFilePath,data){ 
   console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
   console.log(data)
   var lineString = ''; 
   for(var i=0;i<data.length;i++){
     for(var j=0;j<data[i].featureName.length;j++){
       for(var k=0;k<data[i].featureName[j].scriptName.length;k++){
     //    console.log(data[i].featureName[j].scriptName[k].lineNum)
         var ln = data[i].featureName[j].scriptName[k].lineNum;
       console.log(k+"pppppppppppppppppppppppppppppppppp")
       if(k===0){
         var lineString1 = "\""+data[i].moduleName+"/"+data[i].featureName[j].featureName+".feature:"+data[i].featureName[j].scriptName[k].lineNum;
         lineString = lineString.concat(lineString1)
         var addString = lineString;
       }
       else{
         var qq="ww"
         var lineString2 = ":"+data[i].featureName[j].scriptName[1].lineNum;
       //  console.log(lineString2)
       lineString = lineString.concat(lineString2)
       var addString = lineString;
       }
 
 
       }
     }
   }
  
 
   console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    console.log(addString);
   // var abc=data.lineNum;
   // console.log(abc)
   //}
   const Filehound = require('filehound');
   Filehound.create()
   .ext('java')
   .match(runnerName) // .match('*TestRunnerNew.java*')
   .paths("./uploads/"+ps)
   
   .find((err, htmlFiles) => {
   
   if (err) return console.error("handle err", err);
   console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
   
   var fs = require('fs');
   
   
   var testPath = "./"+htmlFiles; 
   //console.log(testPath+"testpathhhhhh");
   
   var data = fs.readFileSync(testPath).toString().split("\n");
   //console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
  // console.log(data)
   // console.log(htmlFiles)
  
   for(i=0;i<data.length;i++){
   if( data[i].includes("@CucumberOptions")=== true) {
   // for(l = 0 ;l<=data.length;l++){
   // var lineString = "\""+moduleName+"/"+featureName[l]+".feature:4"+"\"";
   // }
 console.log(addString)
   // var lineString = "\""+sampleData[0].moduleName+"/"+sampleData[0].featureName+".feature:"+sampleData[0].lineNum+"\"";
    if(qq==undefined){
    data[i] = "@CucumberOptions(features="+"{"+addString+"\""+"},";
   }
  else{
   console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
   data[i] = "@CucumberOptions(features="+"{"+addString+"\"" +","+"},";
   }
   // console.log(true);
   }
   }
 
 
   data = data.join("\n");
   
   fs.writeFile(testPath,data,function(err)
   {
   if (err) return console.log(err);
   // console.log(text);
   console.log("Replaced");
   
  execTestRunner( path,pomFilePath)
   }) 
   
   })
  // }//
   }
   var execTestRunner = function( projectName,pomFilePath){
     console.log("oooooooooooooooooooooooooooooooooooooo")
     console.log(pomFilePath)
   // var pomFilePath = "uploads\\projectjava12\\Sample1";
   const Filehound = require('filehound');
   console.log(" i am ready for executoooooo projectName "+projectName)
   console.log(__dirname)
   
   var fs = require('fs'); 
   var requiredPath = __dirname+"\\trial.bat"; 
   console.log(requiredPath)
   
   // var requiredPath = "/"+projectName;
   // var requiredPath = _dirname+"\\uploads"+"\\"+projectName+"\\trial.bat"; 
   
   var stream = fs.createWriteStream(requiredPath);
   
   stream.write("@echo off\n");
   stream.write("cd .\\"+pomFilePath+" && mvn clean install");  
   console.log(pomFilePath + " fini pomFilePath ")
   
  // finalExecution( requiredPath) 
   
   } 
   
 
 app.get('/idModule',function(req,res){
 
 
 
 
 db.moduleName.find({}).sort({_id:-1}).limit(1,function(err,doc)
 {
 res.json(doc);
 //console.log(doc);
 })
 })
 app.get('/idFeature',function(req,res){
 
 
 
 
 db.featureName.find({}).sort({_id:-1}).limit(1,function(err,doc)
 {
 res.json(doc);
 //console.log(doc);
 })
 })
 app.get('/featureName',function(req,res){
 
 
 
 
 db.featureName.find({},function(err,doc){ 
 res.json(doc);
 
 })
 })
 
 app.get('/getMoId:mI',function(req,res){
 console.log("mmmmmmmmmmmmmmmmmm")
 var moduleName=req.params.mI
 db.moduleName.aggregate([
 {$match:{"moduleName":moduleName}},
 
 
 
 {"$lookup":
 {"from":"featureName",
 "localField":"moduleId",
 "foreignField":"moduleId",
 "as":"unitedFM"
 }
 }
 ],function(err,doc){
 res.json(doc);
 //console.log(doc)
 })
 
 })
 app.get('/mId:mN',function(req,res){
 console.log("llllllllllllllllll")
 var moduleName=req.params.mN
 //moduleName1 = parseInt(moduleName1);
 console.log(moduleName+"llllllllllllllllll")
 db.moduleName.find({"moduleName":moduleName},function(err,doc){ 
 res.json(doc);
 // console.log(doc)
 })
 })
 app.post('/postModuleName',function(req,res)
 {
 //var moduleName=req.params.moduleName;
 
 //var moduleName = str_array[1];
 console.log(req.body.moduleName)
 
 
 db.moduleName.insert(req.body ,function(err,doc)
 {
 res.json(doc);
 
 
 });
 
 
 })
 app.post('/postFeatureName',function(req,res)
 {
 
 //var moduleName=req.params.moduleName;
 
 //var moduleName = str_array[1];
 //console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
 
 db.featureName.insert(req.body ,function(err,doc)
 {
 res.json(doc);
 //console.log(doc)
 });
 
 
 })
 app.post('/savingImportData',function(req,res) {
 console.log("data data data data data data data data");
 // var datastr=req.params.datareceipt;
 
 // var datastr_array=datastr.split(",");
 // var pname=datastr_array[0];
 // // var tran=datastr_array[1];
 // // var vNo=datastr_array[2];
 // console.log(pname)
 //console.log("oooooooooooooooooo")
 //console.log(req.body)
 db.importScript.insert(req.body,function(err,doc){
 //console.log("5gggggggggggggggggggggggg")
 res.json(doc);
 //console.log(doc);
 })
 
 })
 
 
 app.post('/postmodule',function(req,res){
   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
   console.log(req.body)
   console.log(req.body.moduleId)
   //var data = req.body.moduleId ;
 
   db.featureName.find({  "moduleId" : req.body.moduleId,"projectId" : req.body.projectId},function(err,featureNames){
     res.json(featureNames);
     //   console.log(doc)
   })
 })
 
 app.post('/postFeat',function(req,res){
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 123")
   console.log(req.body)
   console.log("feature id  iddd "+req.body.featureId)
   var  finalArray = [];
   var count = 0;
   db.type.find({ },function(err,typeData){
   db.priority.find({ },function(err,   priorityData){
     
   db.testScript.find({  "moduleId" : req.body.moduleId,"projectId" : req.body.projectId, "featureId" :req.body.featureId},function(err,testScriptData){
    // res.json(doc);
    console.log(testScriptData.length+"          len")
    console.log(testScriptData[0].priorityId)
    console.log(testScriptData)
    if(testScriptData[0].priorityId != undefined){
     testScriptData.forEach(function(data) {
         console.log(data);
         
         // if(testScriptDetail.moduleId === moduleDetails[j].moduleId && testScriptDetail.featureId ===featureDetails[l].featureId){
         // console.log(module[j].moduleName);
         obj = {}
        // obj['moduleName']= data.moduleName;
         //obj['featureName']= featureDetails[0].featureName;
        // obj['lineNum']= testScriptDetail.lineNum;
         obj['scriptName']=data.scriptName;
         obj['time']=data.time;
         priorityData.forEach(function(priority) {
           if(priority.priorityId === data.priorityId ){
             obj['priorityName']= priority.priorityName;
           }
         })
         typeData.forEach(function(type) {
           if(type.typeId === data.typeId ){
             obj['typeName']= type.typeName;
             console.log(typeof  obj.time)
             finalArray.push(obj);
            console.log( finalArray)
           }
         })
         //obj['typeName']=;
         
         //obj['projectSelection']=projectDetails[0].projectSelection;
        
         //console.log(newArray)
         //count++;
         if(count === ( testScriptData.length - 1)){
         console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
         res.json(finalArray);
         }else{
           count++;
         }
     
        // }
         
         }); 
       }else{
         console.log("else  loop ")
         res.json(testScriptData);
       }
 
 
 
 
 
 
 
 
       })
     })
   
    // console.log(doc)
   })
 
 })
 
 app.get('/importType',function(req,res){
 
   console.log("kkkkkkkkkkkkkkkkkkkkk")
   db.type.find({},function(err,doc){ 
   res.json(doc);
   //console.log(doc)
   })
   })
 
   app.get('/importPriority',function(req,res){  
   db.priority.find({},function(err,doc){ 
   res.json(doc);
   // console.log("mm"+doc)
   })
   })
   
   app.get('/getIds:ss1',function(req,res){
     console.log("jjjjjjjjjjjjjrrrrrrrrrrrrrrrrrr 34") 
     var data = req.params.ss1;
    // var data = req.params.ss1;
   console.log(data)
   var data_Array = data.split(",");
   //var projectId = data_Array[0];
   //projectId= parseInt(projectId)
   var scriptName =data_Array[0];
   var typeName = data_Array[1];
   //moduleId= parseInt(moduleId)
   
   var priorityname = data_Array[2]; 
   //featureId= parseInt(featureId)
    console.log(typeName)
   var time = data_Array[3]; 
     var projectId = data_Array[4]; 
 
   db.testScript.find({"scriptName":scriptName,"projectId":projectId},function(err,doc1){ 
     console.log("sssshhhhhiiiiivvvvvvaaaaa     "  + doc1[0].scriptId)
   db.type.find({"typeName":typeName},function(err,doc2){ 
         console.log("sssshhhhhiiiiivvvvvvaaaaa")
         console.log(doc2[0].typeId)
   db.priority.find({"priorityName":priorityname},function(err,doc3){
     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%vvvvvvaaaaa")
     console.log(doc3[0].priorityId)
 
     var scriptId=doc1[0].scriptId
   var typeId =doc2[0].typeId;
   var priorityId =doc3[0].priorityId
  // })
   
 
     console.log(data);
     db.testScript.update({"scriptId":scriptId,"projectId":projectId},{$set:{ "priorityId" : priorityId, "typeId" : typeId, "time" : Number(data_Array[3])}},function(err,doc){ 
       res.json(doc);
        console.log(" updates sdhasddhs     ")
       })
   })
 })
 })
   })
 
   /////////////////////testLinkTCUpdateCall//////////
 
 
 
 app.post('/testLinkTCUpdateCall',function(req,res){
   console.log("req.body")
   tc.reportTCResult(req.body,function(callback){ console.log(callback); res.json(callback)});
   })
 
   /////////////////////////////////////////////////////
   
 require('./server/reportServer')(app)
 require('./server/dbsServer')(app)
 require('./server/mobileServer')(app)       
 require('./server/searchTestExecutionServer')(app)  
 require('./server/runTestExecutionServer')(app) 
 require('./server/testPlaningGitNpmServer')(app)
       
 // =======
 // //require('./server/serverTestExecution')(app)
 // >>>>>>> f40691273c2e1609e48105331b3acaacee43b64b
 // app.get('*',(req, res)=> {
 
 // res.sendFile(path.join(__dirname,'dist/index.html'));
 // });
  const port=2111;
 app.listen(port,function() {
   console.log("server running on port"+port);
   // body...
 });
 
 app.get('/loginDetails',function(req,res){
 
   // console.log("ooooooooooooooooooo")
   db.loginDetails.find({"userName":"Admin"},function(err,doc){ 
   res.json(doc);
   // console.log("kkkkkkkkkkkkkkk"+doc)
   })
   })
 
 