module.exports=function(app){
    const express=require('express');
    const path=require('path');
    var mongo = require('mongodb');
    const bodyParser=require('body-parser');
    var mongojs=require('mongojs');
    var mongoose = require('mongoose');
    var db=mongojs('collections',[])
    function createDefaultCollections () {
        db.countInc.find(function(err,count){
          if (count.length == 0) {
            console.log("zero")
            var obj =   ({"projectID" : "pID",
          "pCount" : 1,
          "mCount" : 1,
          "fCount" : 1,
          "sCount" : 1,
          "moduleID" : "mID",
          "featureID" : "fID",
          "scriptID" : "sID"})
          // console.log(obj)
          
          db.countInc.insert(obj)
          }else{
            console.log(" not zero")
             }
      
        })
        db.runCount.find(function(err,run){
          if (run.length == 0) {
            var obj1 =   ({
              "cypressReport" : "cypress",
              "runNumber" : 1,
            })
          
          db.runCount.insert(obj1)
          }else{
            console.log(" not zero")
             }
      
        })
        db.projectSelection.find(function(err,project){
          if (project.length == 0) {
            var obj1 =   ({
              "projectSelection" : "Create New Project",
              "projectId" : "pID0",
              "framework" : "Cypress"
            })
          
          db.projectSelection.insert(obj1)
          }else{
            console.log(" not zero")
             }
      
        })
        // for login 
        db.loginDetails.find(function(err,login){
          if (login.length == 0) {
            var obj2 =   ({
              "userName" : "Admin",
              "password" : "Admin",
            })
          
          db.loginDetails.insert(obj2)
          }else{
            console.log(" not zero")
             }
      
        })
         // for login 
         db.priority.find(function(err,priority){
          if (priority.length == 0) {
            var obj2 = [{
              "priorityId" : "p04",
          "priorityName" : "P4"
            },{
              "priorityId" : "p03",
              "priorityName" : "P3"
      
            },{
              "priorityId" : "p02",
              "priorityName" : "P2"
            },{
              "priorityId" : "p01",
              "priorityName" : "P1"
      
            }
          ]  
          console.log(" lennn "+obj2.length)
          for(var i = 0;i<obj2.length;i++){
            console.log(obj2[i])
            db.priority.insert(obj2[i])
          }
          
          
          }else{
            console.log(" not zero")
             }
      
        })
        // for login 
        db.type.find(function(err,type){
          if (type.length == 0) {
            var obj3 =   [{
              "typeId" : "t02",
          "typeName" : "Negative"
            },{
              "typeId" : "t01",
          "typeName" : "Positive"
            }]
            for(var i = 0;i<obj3.length;i++){
             // console.log(obj2[i])
              db.type.insert(obj3[i])
            }
         
          }else{
            console.log(" not zero")
             }
      
        })
        
      }
      createDefaultCollections ()


}