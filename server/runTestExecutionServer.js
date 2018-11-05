module.exports=function(app){
    var mongojs=require('mongojs');
    
    var db=mongojs('collections',[])
    const Filehound=require('filehound');
    var fs = require('fs')
    var rimraf = require('rimraf');
    const path=require('path');
    app.post('/testScript',function(req,res){
   
     
     var totalTime = 0;
      var required=[]
      var filesPath = []
      // console.log(req.body[0].featureName[0].scriptName[0].scriptName)
        var runData = req.body ;
        var runDataLength = req.body.length ;
        console.log("   run data ")
        console.log(req.body[0].featureName[0].scriptName[0].lineNum)
       // console.log( runDataLength  +"  oout  runDataLength ")
       runData.forEach((module)=>{
           runDataLength -- ;
           //  console.log( runDataLength  +"  f runDataLength ")
        
           var featureLength = module.featureName.length ;
        module.featureName.forEach((feature) =>{
        
           //console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
          
            featureLength -- ;
          var scriptLength = feature.scriptName.length ;
           feature.scriptName.forEach((script,index) =>{
            totalTime = totalTime+ Number(script.time);
            console.log(totalTime )
            scriptLength --;
            if (index == 0 ) {
                // console.log(module.moduleName+"/"+feature.featureName+".js" +"            featureLength")
             //  filesPath.push(module.moduleName+"/"+feature.featureName+".js")
                 filesPath.push(feature.featureName+".js")
        
            }
            //console.log(script.scriptName )
            required.push(script.scriptName)
             // console.log( scriptLength +"   scriptLength  ", featureLength,runDataLength)
            if ( runDataLength == 0 &&  featureLength == 0 && scriptLength == 0  ) {
               console.log("  iam completed  " )
               console.log(filesPath)
               skipMethod(required,filesPath)
            }
               
           })
          
        })
    
     })
    
    function  skipMethod(required,filesPathData) {
      // body...
      console.log(required)
      console.log(filesPathData)
    var filesPathDataLength = filesPathData.length -1;
    var requiredLength = required.length -1;
    
    filesPathData.forEach((file,index )=>{
       // file = "./"+"uploads/"+req.body[0].projectSelection+"/endToEndTests/node_modules/.bin/cypress/integration/"+file;
         
        Filehound.create()
          .ext('.js')
          .match(file) //data[0].featureName.featureName+".js"
          .path("./uploads/"+req.body[0].projectSelection)
          .find((err,htmlFiles)=>{
          
          var   file1 = ".\\"+htmlFiles[0];
              console.log(file1   +"  here is file ")
              var binFolder = file1.split("\\").reverse().join("/").split("cypress/").pop().split("/").reverse().join("\\")
             // console.log(c +"   cccc  ")//.split("cypress/").pop()
             // console.log(c.pop() )
          
        //  })
    
         // file = "./"+"uploads/"+req.body[0].projectSelection+"/endToEndTests/node_modules/.bin/cypress/integration/"+file;
     
    
    var lineNumber = 1;
    
    var LineByLineReader = require('line-by-line');
    // lr = new LineByLineReader("./uploads/projectjavatriall756/Sample1/Features/abc.feature")
    // lr = new LineByLineReader("uploads/projectjavatriall7564/Sample1/Features/abc.feature")
    lr = new LineByLineReader(file1)
    //console.log(lr)
    var newCss = '';
    lr.on('error', function (err) {
    // 'err' contains error object
    console.log(" error rr rr rr "+file)
    });
    
    lr.on('line', function (line) {
      console.log(file1+"  lineNumber   lineNumber  lineNumber       "+lineNumber++)
    var conditionChek = false;
    required.forEach((element,index) =>{
    
    if(line.includes(element) == true ){
    var compString = line;
    console.log(" compString "+compString.split("(")[1].split(",")[0]+" "+element);
    if(compString.split("(")[1].split(",")[0] == "'"+element+"'" ){ 
    conditionChek = true;
    newCss += line.toString().replace("it.skip", "it")+"\n";
    
    console.log(" required ");
    }else{
    if(line.includes(!"it.skip")){
    newCss += line.toString().replace("it", "it.skip")+"\n";
    }
    
    
    }
    }
    if( conditionChek == false && line.includes(element) == false && requiredLength == index){
    // it skip
    // line.split("(")[1].split(",")[0];
    //console.log("sssssssssssssssssss")
    // if(line.includes("cy.") == false && line.includes("it") == true && line.includes(",") == true && line.includes("it.skip") == false && line.includes("describe") == false && line.includes("function") == false ){
    if(line.includes("cy.") == false && line.includes("it") == true && line.includes(",") == true && line.includes("it.skip") == false && line.includes("function") === true){
    console.log("yytttttttttttt")
    // console.log(line)
    newCss += line.toString().replace("it", "it.skip")+"\n";
    }else{
    //console.log(" no no no ")
    newCss += line+"\n"; 
    }
    
    }
    })
    
    
    });
    lr.on('end', function () {
    console.log(" end end Scenario true ")
    fs.writeFile(file1, newCss, function(err) {
              if (err) {
              return console.log(err);
              } else {
              console.log('Updated!');
                          if (filesPathDataLength === index) {
                              //cypressBatFile(req.body,binFolder)
                              //console.log(req.body.data)
                              console.log(req.body.binFolder)
                              res.json({"data":req.body,
                              "binFolder":binFolder,
                              "status":"Setting environment",
                              "timeRequired":totalTime
                              })
                          }
    
              }
    });
    // All lines are read, file is closed now.
    });
    
    })//filehoundcloser
    })//foreach close
    }//skipmethod end
    
      
      
      })
      app.post('/testRunDirectory',function(req,res) {
          console.log(" testRunDirectory testRunDirectory ")
          console.log(req.body.data)
          console.log(req.body.binFolder)
         
     var cypressBatFile = function(data,binFolder,timeRequired)
    {
      if(!fs.existsSync(binFolder+"\\reports")){
        console.log(" make dir");
        fs.mkdirSync(binFolder+"\\reports", function(err){
            if(err){
                console.log(err);
                //lineRead()
                // echo the result back
               // response.send("ERROR! Can't make the directory! \n");
            }
        });
    }
    
    
    if(!fs.existsSync(binFolder+"\\trial.bat")){
        console.log(" make dir");
      //  fs.writeFile(binFolder+"\\trial.bat","")
      //  fs.appendFileSync(binFolder+"\\trial.bat","");
        generateBatchFile(data,binFolder,timeRequired)
        
    }else{
      console.log("  iam exists ")
      generateBatchFile(data,binFolder,timeRequired)
    }
    }//cypressBatFile
    // console.log(req.body.data)
    //console.log(req.body.binFolder)
    cypressBatFile(req.body.data,req.body.binFolder,req.body.timeRequired)
    function generateBatchFile(data,binFolder,timeRequired){ 
      var  newLine ='';
      var jsonFile ="10.json";
      var Path = binFolder+"\\trial.bat";
      console.log("Path     "+Path)
      
      var binPath = path.dirname(Path);
      var Path2 =binPath;
      
      console.log(binPath)
      console.log(Path2 +"path2 ")
      
      
 
      newLine += "@echo off\n";
     var firstCheck = true;
      data.forEach((data1,i)=>{
      
      data1.featureName.forEach(( feature,j)=>{
      Filehound.create()
      .ext('.js')
      .match(feature.featureName+".js") //data[0].featureName.featureName+".js"
      .path(".\\"+binPath+"\\cypress\\integration\\")
      .find((err,htmlFiles)=>
      {
      console.log(" required "+htmlFiles[0])
      console.log(" required222 "+htmlFiles[0].split(".bin/"))
      var c = htmlFiles[0].split(".bin\\").pop()
      
      console.log(c)
      if(firstCheck === true)
      {
      firstCheck = false;
      //__dirname+"\\"+
      //var array = "C:\\Users\\user\\Desktop\\platform\\releaseint12\\uploads\\Agility-Cypress-Tests-master\\endToEndTests\\node_modules\\.bin";
      //stream.write("cd "+binPath.split(".\\").pop()+" && cypress run --spec " +htmlFiles[0].split(".bin\\").pop());
      //stream.write("cd "+array+" && cypress run --spec " +htmlFiles[0].split(".bin\\").pop());
       var c = "cd "+binPath.split(".\\").pop()+" && cypress run --spec " +htmlFiles[0].split(".bin\\").pop();
      newLine += c
       //fs.appendFileSync(Path,c, 'utf8');
      }else{
      
      console.log("better luck next time")
      //stream.write(","+htmlFiles[0].split(".bin\\").pop()); 
    var c1 = ","+htmlFiles[0].split(".bin\\").pop();
    newLine += c1
         //fs.appendFileSync(Path,c1, 'utf8');
      
      }
      if(i === data.length -1 && j=== data1.featureName.length -1 ){
      //stream.write(" --reporter json > reports/"+jsonFile);
      var c2 = " --reporter json > reports/"+jsonFile;
      // fs.appendFileSync(Path,c2, 'utf8')
      newLine += c2
            fs.writeFile(binFolder+"\\trial1.bat", newLine, function(err) {
              console.log(" go to child    ")
              fs.copyFileSync(binFolder+"\\trial1.bat", binFolder+"\\trial.bat");
              console.log('source.txt was copied to destination.txt');
                  if (err) {
                            return console.log(err);
                            res.json({"Path":Path,
                              "jsonFile":jsonFile,
                              "binFolder":binFolder,
                              "status":"started execution....",
                              "timeRequired":timeRequired
                             })
                       }else{
    
                              res.json({"Path":Path,
                              "jsonFile":jsonFile,
                              "binFolder":binFolder,
                              "status":"started execution....",
                              "timeRequired":timeRequired
                             })
    
                       }
    
    
    
        })
  
      
    }
      
      })
      
      // stream.write("cd "+Path2+" && cypress run --spec cypress\\integration\\"+data[i].moduleName+"\\"+data[i].featureName[j].featureName+".js");
      
      })
      // 
      
      })
      } // generatebatch file
    })//  app.post('/testRunDirectory'






    app.post('/testRunFinalExecution',function(req,res) {
      var count = 0;
   // function  finalExecution(Path,jsonFile,folder) {
  console.log("  iammmmmm        seeeeeeeeeeeeeee ");
  
  var Path = req.body.Path;
  var jsonFile = req.body.jsonFile;
  var folder = req.body.binFolder;
  var checkForCompleteFalse = false;
  res.json({"jsonFile":jsonFile,
                "folder":folder,
                "status":"Time remaining (seconds) : ",
                "timeRequired":req.body.timeRequired
                });
  
  return new Promise((resolve, reject) => {
    console.log(" promise iammmmmm        seeeeeeeeeeeeeee ");
  var nrc = require('node-run-cmd');
    nrc.run(Path).then(function(err) {
        console.log(' pass 2345 ',err);
    console.log(' pass 2345 ',err.length);
     console.log(' pass 2345 array',err[0]);
  
     
    }, function(err) {
    console.log('Command failed to run with error: ', err);
   // res.end()
    });
  
  
  
  });
  
    
    })
  app.post('/testRunReportDataChecking',function(req,res) {
  //  function checkCall() {
    var jsonFile = req.body.jsonFile;
  var folder = req.body.folder;
      console.log(" testRunReportDataChecking check call  promise iammmmmm        seeeeeeeeeeeeeee ");
    // var checkForComplete = ".\\uploads\\OPALCypressProject\\endToEndTests\\node_modules\\.bin"+"\\reports\\"+"10.json";
  //finalExecution(".\\uploads\\OPALCypressProject\\endToEndTests\\node_modules\\.bin\\trial.bat", "10.json", ".\\uploads\\OPALCypressProject\\endToEndTests\\node_modules\\.bin")
   var checkForComplete= folder+"\\reports\\"+jsonFile;
  var   checkForCompleteFalse1 = false;
            var LineByLineReader = require('line-by-line');
              
            lr = new LineByLineReader(checkForComplete)
  
  
            lr.on('error', function (err) {
              console.log(err+" lineread()")
            });
  
            lr.on('line', function (line) {
            
  
            if(line.includes("Run Finished") == true ){
                checkForCompleteFalse1 = true;
            }
  
        
  
            });
  
            lr.on('end', function () {
                if (checkForCompleteFalse1 == true) {
                  console.log(" checker completed   ")
                //     var b =({
                // "status":true
                // })
                //  // resolve(b); 
                //  res.json(b);
                 res.json({"jsonFile":jsonFile,
                "folder":folder,
                "status":"generating report ",
                "finished":true,
                
                });
  
                // return true
                }else{
                  console.log("checker vijay  not completed   ")
                    res.json({"jsonFile":jsonFile,
                "folder":folder,
                "status":"Time remaining (seconds) : ",
                "finished":false,
                "timeRequired":req.body.timeRequired
                });
                  //return false
                }
            });
  
  
  })
  
  
  app.post('/testRunReportDataGeneration',function(req,res) {
  
  
  
  console.log("   '/testRunReportDataGeneration'   entered ")
  
  
  
  
  
  var reportDataGeneration = function(jsonFile,folder){
    console.log(" iam jsonFile started "); 
  
  
    var reportJson = folder+"\\reports\\"+jsonFile;
   var convertedJson = folder+"\\reports\\"+"record.json";
  
  var stream = fs.createWriteStream(convertedJson);
  var todayDate= Date.now();
  var dates = new Date(((new Date(todayDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
  var a = dates.split("T");
  var date = a[0];
  function runCountFetch(){
    console.log("calllllllllllllllll");
    db.runCount.find({},function(err,doc){console.log(doc[0].runNumber)
        lineRead(doc[0].runNumber)
    })
    
  }
  runCountFetch();
  
  function lineRead(run){
            console.log(" lineRead ");
            var count = 1;
            var lineData = [];
            var conditionCheck = false;
            var run =run;
  
            screenshotsConditionTrue = false;
            videoConditionTrue = false;
  
            var LineByLineReader = require('line-by-line');
  
            lr = new LineByLineReader(reportJson)
  
  
            lr.on('error', function (err) {
              console.log(err+" lineread()")
            });
  
            lr.on('line', function (line) {
            if(count === 1 ){
            fs.appendFileSync(convertedJson,"\n"+"[", 'utf8');
  
            }
  
            if(line.includes("Spec Ran") == true ){
  
            var c = line.replace("\\", "/").substr(1).slice(0, -1);
            var z =","+"{"+ "\""+"Spec Ran"+"\""+":"+"\""+c.slice(15, -1)+"\""+","+"\""+"run"+"\""+":"+"\""+run+"\""+","+"\""+"Date"+"\""+":"+"\""+date+"\""+"}"+",";
  
  
            fs.appendFileSync(convertedJson,z, 'utf8');
            }
            if(line.includes("(Screenshots)") === true ){
            screenshotsConditionTrue = true;
            videoConditionTrue = false;
  
            }
            if(screenshotsConditionTrue == true){
  
            if(line.includes(":") === true ){
            var z1 ="{"+ "\""+"Screenshot"+"\""+":"+"\""+line+"\""+"}"+",";
            fs.appendFileSync(convertedJson,"\n"+z1, 'utf8');
            }
            }
            if(line.includes("(Video)") === true ){
            screenshotsConditionTrue = false;
            videoConditionTrue = true;
  
            }
            if( videoConditionTrue == true){
  
            if(line.includes(":") === true && line.includes("======") !== true && line.includes("Running:") !== true ){
  
            var z2 ="{"+ "\""+"Video"+"\""+":"+"\""+line+"\""+"}"+",";
            fs.appendFileSync(convertedJson,"\n"+z2, 'utf8');
            }
            if(line.includes("======") == true ){
            videoConditionTrue = false; 
            }
            }
            if(line.includes("Running") == true ){
            videoConditionTrue = false;
            screenshotsConditionTrue = false;
  
            conditionCheck = true;
            }else{
            count++
            }
  
            if (conditionCheck == true) {
            if(line.includes("Results") == true ){
  
  
            conditionCheck = false;
  
            }else
            {
            if(line.includes("Running") != true ){
            fs.appendFileSync(convertedJson,"\n"+line, 'utf8');
  
            }
            }
  
            };
  
  
  
  
  
  
            });
  
            lr.on('end', function () {
            fs.appendFileSync(convertedJson,"\n"+"{}]", 'utf8');
              console.log("    db call avtive")
             dbCall(run)
            });
  
  }
  
  //lineRead()
  
  
  function dbCall(Run){
      console.log("  enter the call  ")
  fs.readFile(convertedJson, 'utf8', function (err, data) {
  if (err) throw err;
  var newStr = data.replace(/\\/g, "/");;
  
  obj = JSON.parse(newStr);
  var num = 1;
  var arr = [];
  var arrPush = 0;
  var conditionActivate = false;
  obj.forEach(element => {
  num++;
  if(element.hasOwnProperty("Spec Ran")){
  conditionActivate = true;
  arr[arrPush-1].otherData = [];
  }
  if (element.hasOwnProperty("stats")){
  conditionActivate = false;
  }
  if(element.hasOwnProperty("Screenshot")){
  }
  if(conditionActivate){
  arr[arrPush-1].otherData.push(element);
  }else{
  arr.push(element);
  arrPush++;
  }
  });
  console.log(" insert dadad")
  console.log(arr)
  db.Json.insert(arr,function(error,info){
      var incrementedrun = parseInt(info[0].otherData[0].run)+1;
      var runNumnber = incrementedrun;
      db.runCount.update({"cypressReport" : "cypress"},{$set:{"runNumber":runNumnber}},function(err,doc){})
  // collectingData();
      res.json({  "status":"Completed please check the report #"+Run})
  })
  
  
  })
  }
  
  
  }//reportDataGeneration
  reportDataGeneration(req.body.jsonFile,req.body.folder)
  
  })//testrunreportDataGeneration
  

}//end module