module.exports=function(app)
{
    const express=require('express');
    const path=require('path');
    var mongo = require('mongodb');
    const bodyParser=require('body-parser');
    var mongojs=require('mongojs');
    var mongoose = require('mongoose');
    var db=mongojs('collections',['asd'])
    var fs = require('fs');
    const exec = require('child_process');
    const insertLine = require('insert-line');
    console.log(__dirname)
    var todayDate= Date.now();
    var  dates  = new Date(((new Date(todayDate).toISOString().slice(0, 23))+"-05:30")).toISOString();
    var a = dates.split("T");
    var date = a[0];
    var ScreenShot=null;

    app.get('/getreportDetail:runNumber',function(req,res)
    {
        var arrFinal = [];
        var runNum = req.params.runNumber;
        var arrayPass = [];
        var arrayFail = [];
        
        db.Json.find({"otherData.run":runNum},function(err,doc)
        {
        var docLength = doc.length 
            doc.forEach(element=>
            {
                let inner = element.tests;
                var innerLength = inner.length ;
                docLength --;
                inner.forEach(element1=>
                {
                    innerLength--;
                    var TestCase = element1.title;
                    var Duration = element1.duration;
                    var ScenarioName = element1.fullTitle.slice(0,element1.fullTitle.length - element1.title.length);
                    if(element1.err.message !== undefined)
                    {
                        // var Error = element1.err.message;
                        var Error  = element1.err.stack;
                        // console.log(Error+Stack);
                        var testCase="Fail";
                        var Result = testCase;
                    }
                    else
                    {
                        var testCase="Pass";
                        var Result = testCase;
                    }
                    otherDataFun(TestCase,Duration,Result,ScenarioName,docLength,innerLength,Error)
                    })// inner.forEach(element1=>

                    function otherDataFun(TestCase,Duration,Result,ScenarioName,docLength,innerLength,Error)
                    {
                        var otherDataLength = element.otherData;
                        var x=0;
                        var len = otherDataLength.length-1 ;
                        var conditionCheck = false;
                        otherDataLength.forEach((element09,index) =>
                        {
                            if(element09.Screenshot)
                            {
                                conditionCheck = true;
                                ScreenShot = element09.Screenshot;
                                var s= ScreenShot.split("/")
                                var p = path.posix.basename(ScreenShot);
                                var x = p.split("-- ").pop().split(" ");
                                var screenshotname = x[0];
                                if(TestCase == screenshotname)
                                {
                                    ScreenShot = element09.Screenshot;
                                    var c = ScreenShot.split("/img").pop().split(".png")
                                    var path1 = "./img"+c[0]+".png";
                                    arrayFail.push(TestCase)
                                    objectpush(TestCase,Duration,Result,ScenarioName,docLength,innerLength,ScreenShot,Error,path1);                
                                }
                            }//if(element09.Screenshot)
                            if(len == index){
                            if(arrayFail.includes(TestCase)== false) {
                            path1 = null;
                            arrayPass.push(TestCase)
                            objectpush(TestCase,Duration,Result,ScenarioName,docLength,innerLength,ScreenShot,Error,path1);
                            console.log(arrayPass)
                            }  
                            }                    
                        })//otherDataLength.forEach              
                    }//function otherDataFun
                    function objectpush(TestCase,Duration,Result,ScenarioName,docLength,innerLength,ScreenShot,Error,path1)
                    {
                        var c= element.otherData[0];
                        var ModuleFolder = path.dirname(c["Spec Ran"]);
                        var FileName = path.posix.basename(c["Spec Ran"]);
                        var f = element.otherData;
                        var cc = f[f.length-2].Video;
                        console.log("  ccc     "+cc)
                        if(cc.includes("/video") == true)
                        {
                            console.log(" true")
                            var cc = f[f.length-2].Video;
                        }
                        else
                        {
                            console.log(" false") 
                            var cc = f[f.length-1].Video;
                        }
                        var path2 = cc.split(": ").pop().split("video").pop().split(".mp4");
                        var path3 = "./video"+path2[0]+".mp4";   
                        objectpush09(TestCase,Duration,Result,ScenarioName,ModuleFolder,FileName,docLength,innerLength,ScreenShot,Error,path1,path3)
                }//function objectpush
            })//doc.forEach(element=>  
        });//db.Json.find({"otherData.run":runNum},function(err,doc){
        function objectpush09(TestCase,Duration,Result,ScenarioName,ModuleFolder,FileName,docLength,innerLength,ScreenShot,Error,path1,path3)
        {
            var consolidateObj = {};
            consolidateObj["ModuleFolder"] = ModuleFolder;
            consolidateObj["FileName"] = FileName;
            consolidateObj["ScenarioName"] = ScenarioName;
            consolidateObj["TestCase"] = TestCase;
            consolidateObj["Result"] = Result;
            consolidateObj["Error"] = Error;
            consolidateObj["ScreenShot"] = path1;
            consolidateObj["Video"] = path3;
            consolidateObj["Duration"] = Duration;
            arrFinal.push(consolidateObj);
            if(innerLength === 0 && docLength === 0 )
            {
            res.json(arrFinal);	
            }
        }//function objectpush09
    })//getreportDetail

    app.get('/sarechDate:search',function(req,res)
    {

    var search=req.params.search;
    var search=search.split(',')
    var fromDate=search[0];
    var toDate=search[1];
    db.Json.aggregate(
    {$match:{"otherData.Date": { $gte:fromDate, $lte:toDate}}},
    {$project:{ "otherData.run":1}},
    {$group:{_id:{runNumber:"$otherData.run"}}},
    { $unwind: "$_id.runNumber" },
    function(err,doc){
    res.json(doc);
    });

    })//app.get('/sarechDate:search',f

}//module.exports=function(app)
  