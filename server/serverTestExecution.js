module.exports=function(app){

console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
var mongojs=require('mongojs');

var db=mongojs('Platform',['loginDetails','projectSelection','mobileApps'])

app.get('/selectionProject',function(req,res){
      
   
    db.projectSelection.find({},function(err,doc){        
        res.json(doc);
        // console.log("mm"+doc)
    })
})

app.get('/featureName',function(req,res){       
    db.featureName.find({},function(err,doc){        
        res.json(doc);
        //console.log(doc)
    })
})

app.get('/getTestScriptDetails',function(req,res){
    console.log("getTestScriptDetails")      
    db.testScript.find({},function(err,doc){
    res.json(doc);
    console.log(doc);
    })
})


app.post('/testScript:ss',function(req,res){
    console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
    var data = req.params.ss;
    //console.log(data);
    var data_Array = data.split(",");
    var lineNum = data_Array[0];
    var featureName = data_Array[1];
    var projectId = data_Array[2];
    var projectNamePath = "/"+projectId;
    console.log(featureName+'.'+lineNum+'.'+projectNamePath);

const Filehound = require('filehound');
Filehound.create()
  .ext('java')
  .match('*TestRunnerNew.java*')  //  .match('*TestRunnerNew.java*')
  .paths("./uploads/"+projectNamePath)
  
  .find((err, htmlFiles) => {
    if (err) return console.error("handle err", err);
        console.log(projectNamePath)
        console.log(featureName+'.'+lineNum);
   
    var lineString = "\"Features/"+featureName+".feature:"+lineNum+"\"";
    console.log(lineString);
    console.log(htmlFiles);
    var fs = require('fs');
 var stream = fs.createWriteStream(htmlFiles[0]);
 stream.once('open', function(fd) {
    
   stream.write("package com.zephyr.testrunner;\n\n");
   stream.write("import org.junit.runner.RunWith;\n\n");
   stream.write("import cucumber.api.CucumberOptions;\n");
   stream.write("import cucumber.api.junit.Cucumber;\n");
   stream.write("import cucumber.api.testng.AbstractTestNGCucumberTests;\n\n");
   stream.write("@RunWith(Cucumber.class)\n");

   stream.write("@CucumberOptions(features="+"{"+lineString+"},"+"\n\n");

   stream.write("//tags={"+"@Import1,@Export11,@Map1,@search1,@Edit1,@DND1"+"},\n\n");
   stream.write("glue={\"com.zephyr.stepdefinition\"},\n");
   stream.write("plugin = {\"html:target/cucumber-html-report\",\n");
   stream.write("\"pretty:target/cucumber-pretty.txt\",\n")
   stream.write("\"json:target/cucumber6.json\"},\n")
   stream.write("monochrome = false)\n\n")
   stream.write("public class TestRunnerNew extends AbstractTestNGCucumberTests\n")
   stream.write("{\n")
   stream.write("}\n")
   stream.end();
   console.log("Replaced");
  execTestRunner( projectNamePath)
   
 });
  });    
    })
    // var execTest = function(projectNamePath){
    //     console.log("execTestttttttttttttttttttttttttttttttttttttttttttttt");
    //     console.log("./uploads/"+projectNamePath);
    //     var fs = require('fs');
    //    var data = fs.readFile("./uploads/"+projectNamePath).toString().split("\n");
    //    data.splice(lineNumber, 23);
    //    var text = data.join("\n");
       
    //    fs.writeFile("./uploads/"+projectNamePath, text, function (err) {
    //      if (err) return console.log(err);
    //      console.log("Replaced");
    //    });
    // }
    // execTest("projectjava/Sample1/src/test/java/com/zephyr/testrunner/TestRunnerNew.java");

    // var execTest1 = function(projectNamePath){
    //     console.log("execTesttt1");
    //     var fs = require('fs');
    //     var testPath = "./uploads/"+projectNamePath; 
    //     console.log(testPath);
    //    var data = fs.readFile(testPath,function(err,data){
    //    console.log(data);
    //    })
    //    .toString().split("\n");
    //    data.splice(lineNumber, 23);
    //    var text = data.join("\n");
    //    fs.writeFile("./uploads/"+projectNamePath, text, function (err) {
    //      if (err) return console.log(err);
    //      console.log("Replaced");
    //    });
    }
    //execTest1("projectjava/Sample1/src/test/java/com/zephyr/testrunner/TestRunnerNew.java")
    
    var execTestRunner = function( projectName){
        const Filehound = require('filehound');
        console.log(" i am ready ")
        console.log(__dirname)
        
        var fs = require('fs');    
        var requiredPath = __dirname+"\\trial.bat";         
        var projectNamePath = "/"+projectName;
    Filehound.create()
    .ext('xml')
    .match('*pom.xml*')
    .paths( "./uploads/"+projectNamePath)
    .find((err, htmlFiles) => {
        if (err) return console.error("handle err", err);
        var stream = fs.createWriteStream(requiredPath);
            console.log(htmlFiles);
            
           
            let latest = htmlFiles[0].slice(0,(htmlFiles[0].length - 8));
            
              console.log(latest);
            stream.write("@echo off\n");
            stream.write("cd .\\"+latest+" && mvn clean install");
            console.log(latest)
            finalExecution()      
        })              
}    


var finalExecution = function(){

    console.log(" final executryeriuyteriu "+__dirname)
   
        require('child_process').exec(__dirname+"/trial.bat", (err, stdout, stderr) => {
            if (err) throw err;
              
            console.log(stdout, stderr);       
          });   
}      
 //finalExecution()        TestRunnerNew_TPE          


// var a = function(){

//     const Filehound = require('filehound')
//     console.log(__dirname)
//     Filehound.create()
//       .ext('java')
//       .match('*TestRunnerNew.java*')
//       .paths("D:\\vickyopal\\charancode\\code3107\\uploads"+"\\Batch5_Development")
//       .find((err, htmlFiles) => {
//         if (err) return console.error("handle err", err);
//         console.log("error   "+htmlFiles[0])
        
//       })
// }

// a()





//module exports