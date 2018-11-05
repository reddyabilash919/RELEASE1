module.exports=function(app){
    var mongojs=require('mongojs');
    
    var db=mongojs('collections',[])

    app.get('/getTestScriptDetails:ss',function(req,res)
    {
    console.log("jjjjjjjjjjjjjrrrrrrrrrrrrrrrrrr") 
    
    var data = req.params.ss;
    //console.log(data)
    var data_Array = data.split(",");
    //var projectId = data_Array[0];
    //projectId= parseInt(projectId)
    
    var moduleId = data_Array[0];
    //moduleId= parseInt(moduleId)
    
    var featureId = data_Array[1]; 
    //featureId= parseInt(featureId)
    
    var projectSelection = data_Array[2]; 
     var type = data_Array[3];
      var priority = data_Array[4];
      //console.log(typeof(type)+"oo"+priority)
      var count = 0;
    if (moduleId=="All" && featureId=="All" && type=="All"&& priority=="All") {
  
  console.log("get All Data")
    db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    //db.moduleName.find({"projectId":projectDetails[0].projectId},function(err,moduleDetails){
    //db.featureName.find({"projectId":moduleDetails[0].projectId},function(err,featureDetails){
    // 
    
    db.testScript.find({"projectId":projectDetails[0].projectId
  
  }

  
  
  
  ,function(err,testScriptDetails)
    {
  //console.log(testScriptDetails)
  
    var newArray = [];
   
       if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
    testScriptDetails.forEach(function(testScriptDetail) {
    //console.log(testScriptDetail.featureId+"featureNNNNNNN")
  db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
  //console.log("1111111111")
    //console.log(featureDetails[0].featureName)
  
   
  
  db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
   
  obj={}
   obj['moduleName']=moduleDetails[0].moduleName;
  //})
  
   obj['featureName']=featureDetails[0].featureName;
    
    //obj['featureName']= featureDetails[0].featureName;
    obj['lineNum']= testScriptDetail.lineNum;
    obj['scriptName']=testScriptDetail.scriptName;
    obj['projectSelection']=projectDetails[0].projectSelection;
    obj['time']=testScriptDetail.time;
    // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
  //console.log(testScriptDetail.typeId)
  
  if(testScriptDetail.typeId=="t01"){
      //console.log(typeData[0].typeName)
    obj['type']="Positive"
    } 
    else if(testScriptDetail.typeId=="t02"){
   obj['type']="Negative"
    }
  
    if(testScriptDetail.priorityId=="p02"){
      //console.log(typeData[0].typeName)
    obj['priority']="P2"
    } 
    else if(testScriptDetail.priorityId=="p03"){
      //console.log(typeData[0].typeName)
    obj['priority']="P3"
    } 
     else if(testScriptDetail.priorityId=="p01"){
      //console.log(typeData[0].typeName)
    obj['priority']="P1"
    } 
     else if(testScriptDetail.priorityId=="p04"){
      //console.log(typeData[0].typeName)
    obj['priority']="P4"
    } 
  
    console.log(obj)
  
    newArray.push(obj)
    //console.log(newArray)
    //console.log(testScriptDetails.length-1)
  
    
    //console.log(count)
    if(count === ( testScriptDetails.length - 1)){
    //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
    res.json(newArray);
  
    }
    count++;
    // }
    
    }); 
  
    // }
    // } 
    // }
  })
    })
  
    //}
  
  
    }
  
  
  ) 
    //})
   // })
  })//moduleCllend
   
   
    
  }//if end  
    //}
  if (moduleId!="All" && featureId=="All" && type=="All"&& priority=="All") {
  
  console.log("get only moduleId")
    db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    
    
    // 
    
    db.testScript.find({"projectId":projectDetails[0].projectId,"moduleId":moduleId
  
  },function(err,testScriptDetails)
    {
  
    var newArray = [];
       if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
    testScriptDetails.forEach(function(testScriptDetail) {
   db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
   db.featureName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId,"featureId":testScriptDetail.featureId},function(err,featureDetails){
   
   obj = {}
    obj['moduleName']= moduleDetails[0].moduleName;
    obj['featureName']= featureDetails[0].featureName;
    obj['lineNum']= testScriptDetail.lineNum;
    obj['scriptName']=testScriptDetail.scriptName;
    obj['projectSelection']=projectDetails[0].projectSelection;
    obj['time']=testScriptDetail.time;
    // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
  //console.log(testScriptDetail.typeId)
  
  if(testScriptDetail.typeId=="t01"){
      //console.log(typeData[0].typeName)
    obj['type']="Positive"
    } 
    else if(testScriptDetail.typeId=="t02"){
   obj['type']="Negative"
    }
  
    if(testScriptDetail.priorityId=="p02"){
      //console.log(typeData[0].typeName)
    obj['priority']="P2"
    } 
    else if(testScriptDetail.priorityId=="p03"){
      //console.log(typeData[0].typeName)
    obj['priority']="P3"
    } 
     else if(testScriptDetail.priorityId=="p01"){
      //console.log(typeData[0].typeName)
    obj['priority']="P1"
    } 
     else if(testScriptDetail.priorityId=="p04"){
      //console.log(typeData[0].typeName)
    obj['priority']="P4"
    } 
  
    console.log(obj)
  
    newArray.push(obj)
    //console.log(newArray)
    //console.log(testScriptDetails.length-1)
  
    
    //console.log(count)
    if(count === ( testScriptDetails.length - 1)){
    //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
    res.json(newArray);
  
    }
    count++;
    // }
    
    }); 
   
    // }
    // } 
    // }
    
    }) 
    })
    })
    })//moduleCllend
   
   
    
  }//if end  
  if (moduleId=="All" && featureId=="All" && type=="All"&& priority!="All") {
  
  console.log("get only priority")
    db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    //db.moduleName.find({"projectId":projectDetails[0].projectId},function(err,moduleDetails){
   // db.featureName.find({"projectId":projectDetails[0].projectId},function(err,featureDetails){
    // 
    
    db.testScript.find({"projectId":projectDetails[0].projectId,"priorityId":priority
  
  },function(err,testScriptDetails)
    {
  
    var newArray = [];
       if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
    testScriptDetails.forEach(function(testScriptDetail) {
      db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
  
  
  db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
   
  
   obj = {}
    obj['moduleName']= moduleDetails[0].moduleName;
    obj['featureName']= featureDetails[0].featureName;
    obj['lineNum']= testScriptDetail.lineNum;
    obj['scriptName']=testScriptDetail.scriptName;
    obj['projectSelection']=projectDetails[0].projectSelection;
    obj['time']=testScriptDetail.time;
    // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
  //console.log(testScriptDetail.typeId)
  
  if(testScriptDetail.typeId=="t01"){
      //console.log(typeData[0].typeName)
    obj['type']="Positive"
    } 
    else if(testScriptDetail.typeId=="t02"){
   obj['type']="Negative"
    }
  
    if(testScriptDetail.priorityId=="p02"){
      //console.log(typeData[0].typeName)
    obj['priority']="P2"
    } 
    else if(testScriptDetail.priorityId=="p03"){
      //console.log(typeData[0].typeName)
    obj['priority']="P3"
    } 
     else if(testScriptDetail.priorityId=="p01"){
      //console.log(typeData[0].typeName)
    obj['priority']="P1"
    } 
     else if(testScriptDetail.priorityId=="p04"){
      //console.log(typeData[0].typeName)
    obj['priority']="P4"
    } 
  
    console.log(obj)
  
    newArray.push(obj)
    //console.log(newArray)
    //console.log(testScriptDetails.length-1)
  
    
    //console.log(count)
    if(count === ( testScriptDetails.length - 1)){
    //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
    res.json(newArray);
  
    }
    count++;
    // }
    
    }); 
   
    // }
    // } 
    // }
    
    }) 
    })
    })
    })//moduleCllend
   
   
    
  }//if end  
  if (moduleId=="All" && featureId=="All" && type!="All"&& priority=="All") {
  
  console.log("get only type")
    db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    // db.moduleName.find({"projectId":projectDetails[0].projectId},function(err,moduleDetails){
    // db.featureName.find({"projectId":projectDetails[0].projectId},function(err,featureDetails){
    // // 
    
    db.testScript.find({"projectId":projectDetails[0].projectId,"typeId":type
  
  },function(err,testScriptDetails)
    {
  
  console.log(testScriptDetails.length+"engthhhhhhhh")
    var newArray = [];
        if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
   
    testScriptDetails.forEach(function(testScriptDetail) {
      db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
  
  
  db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
   
  //console.log("testScriptDetail.typeIdjjjjjjjjjj")
   obj = {}
    obj['moduleName']= moduleDetails[0].moduleName;
    obj['featureName']= featureDetails[0].featureName;
    obj['lineNum']= testScriptDetail.lineNum;
    obj['scriptName']=testScriptDetail.scriptName;
    obj['projectSelection']=projectDetails[0].projectSelection;
    obj['time']=testScriptDetail.time;
    // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
  
  
  if(testScriptDetail.typeId=="t01"){
      //console.log(typeData[0].typeName)
    obj['type']="Positive"
    } 
    else if(testScriptDetail.typeId=="t02"){
   obj['type']="Negative"
    }
  
    if(testScriptDetail.priorityId=="p02"){
      //console.log(typeData[0].typeName)
    obj['priority']="P2"
    } 
    else if(testScriptDetail.priorityId=="p03"){
      //console.log(typeData[0].typeName)
    obj['priority']="P3"
    } 
     else if(testScriptDetail.priorityId=="p01"){
      //console.log(typeData[0].typeName)
    obj['priority']="P1"
    } 
     else if(testScriptDetail.priorityId=="p04"){
      //console.log(typeData[0].typeName)
    obj['priority']="P4"
    } 
  
    //console.log(obj)
  
    newArray.push(obj)
    //console.log(newArray)
    //console.log(testScriptDetails.length-1)
  
    
    //console.log(count)
    if(count === ( testScriptDetails.length - 1)){
    //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
    res.json(newArray);
  
    }
    count++;
    // }
    
    }); 
  //      if(testScriptDetails.length==0){
  //       console.log("rerrrrrrrrrrreeeeeee")
  //  res.json(newArray); 
  // }
    // }
    // } 
    // }
    
    }) 
    })
    })
    })//moduleCllend
   
   
    
  }//if end  
  
  if (moduleId=="All" && featureId!="All" && type=="All"&& priority=="All") {
  
    console.log("get only feature")
      db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
   
      
      db.testScript.find({"projectId":projectDetails[0].projectId,"featureId":featureId
    
    },function(err,testScriptDetails)
      {
    
      var newArray = [];
         if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
      testScriptDetails.forEach(function(testScriptDetail) {
           db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
      db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
  
     obj = {}
      obj['moduleName']= moduleDetails[0].moduleName;
      obj['featureName']= featureDetails[0].featureName;
      obj['lineNum']= testScriptDetail.lineNum;
      obj['scriptName']=testScriptDetail.scriptName;
      obj['projectSelection']=projectDetails[0].projectSelection;
      obj['time']=testScriptDetail.time;
      // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
    //console.log(testScriptDetail.typeId)
    
    if(testScriptDetail.typeId=="t01"){
        //console.log(typeData[0].typeName)
      obj['type']="Positive"
      } 
      else if(testScriptDetail.typeId=="t02"){
     obj['type']="Negative"
      }
    
      if(testScriptDetail.priorityId=="p02"){
        //console.log(typeData[0].typeName)
      obj['priority']="P2"
      } 
      else if(testScriptDetail.priorityId=="p03"){
        //console.log(typeData[0].typeName)
      obj['priority']="P3"
      } 
       else if(testScriptDetail.priorityId=="p01"){
        //console.log(typeData[0].typeName)
      obj['priority']="P1"
      } 
       else if(testScriptDetail.priorityId=="p04"){
        //console.log(typeData[0].typeName)
      obj['priority']="P4"
      } 
    
      console.log(obj)
    
      newArray.push(obj)
      //console.log(newArray)
      //console.log(testScriptDetails.length-1)
    
      
      //console.log(count)
      if(count === ( testScriptDetails.length - 1)){
      //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
      res.json(newArray);
    
      }
      count++;
      // }
      
      }); 
    //      if(testScriptDetails.length==0){
    //  res.json(newArray); 
    // }
      // }
      // } 
      // }
      
      }) 
      })
      })
      })//moduleCllend
     
     
      
    }//if end  
    if (moduleId=="All" && featureId=="All" && type!="All"&& priority!="All") {
    
    console.log("get type and priority")
      db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
     // db.moduleName.find({"projectId":projectDetails[0].projectId},function(err,moduleDetails){
     // db.featureName.find({"projectId":projectDetails[0].projectId},function(err,featureDetails){
      // 
      
      db.testScript.find({"projectId":projectDetails[0].projectId,"typeId":type,"priorityId":priority
    
    },function(err,testScriptDetails)
      {
    
      var newArray = [];
         if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
      testScriptDetails.forEach(function(testScriptDetail) {
      db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
  
  
  db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
   
    
     obj = {}
      obj['moduleName']= moduleDetails[0].moduleName;
      obj['featureName']= featureDetails[0].featureName;
      obj['lineNum']= testScriptDetail.lineNum;
      obj['scriptName']=testScriptDetail.scriptName;
      obj['projectSelection']=projectDetails[0].projectSelection;
      obj['time']=testScriptDetail.time;
      // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
    //console.log(testScriptDetail.typeId)
    
    if(testScriptDetail.typeId=="t01"){
        //console.log(typeData[0].typeName)
      obj['type']="Positive"
      } 
      else if(testScriptDetail.typeId=="t02"){
     obj['type']="Negative"
      }
    
      if(testScriptDetail.priorityId=="p02"){
        //console.log(typeData[0].typeName)
      obj['priority']="P2"
      } 
      else if(testScriptDetail.priorityId=="p03"){
        //console.log(typeData[0].typeName)
      obj['priority']="P3"
      } 
       else if(testScriptDetail.priorityId=="p01"){
        //console.log(typeData[0].typeName)
      obj['priority']="P1"
      } 
       else if(testScriptDetail.priorityId=="p04"){
        //console.log(typeData[0].typeName)
      obj['priority']="P4"
      } 
    
      console.log(obj)
    
      newArray.push(obj)
      //console.log(newArray)
      //console.log(testScriptDetails.length-1)
    
      
      //console.log(count)
      if(count === ( testScriptDetails.length - 1)){
      //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
      res.json(newArray);
    
      }
      count++;
      // }
      
      }); 
  
      // }
      // } 
      // }
      
      }) 
      })
      })
      })//moduleCllend
     
     
      
    }//if end  
    else if(moduleId!="All" && featureId!="All" && type=="All" && priority!="All"){
    
    console.log("get All type"+featureId)
     db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    
      console.log(projectDetails[0].projectId)
    
      
      db.testScript.find({"projectId":projectDetails[0].projectId,"featureId":featureId,"moduleId":moduleId,"priorityId":priority
     // ,"typeId":type,"priorityId":priority
    },function(err,testScriptDetails)
      {
   
      var newArray = [];
          if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
  
      testScriptDetails.forEach(function(testScriptDetail) {
          db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
      
      db.featureName.find({"featureId":testScriptDetail.featureId,"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,featureDetails){
  
     // console.log(testScriptDetail);
    obj = {}
      obj['moduleName']= moduleDetails[0].moduleName;
      obj['featureName']= featureDetails[0].featureName;
      obj['lineNum']= testScriptDetail.lineNum;
      obj['scriptName']=testScriptDetail.scriptName;
      obj['projectSelection']=projectDetails[0].projectSelection;
      obj['time']=testScriptDetail.time;
      // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
    //console.log(testScriptDetail.typeId)
    
    if(testScriptDetail.typeId=="t01"){
        //console.log(typeData[0].typeName)
      obj['type']="Positive"
      } 
      else if(testScriptDetail.typeId=="t02"){
     obj['type']="Negative"
      }
    
      if(testScriptDetail.priorityId=="p02"){
        //console.log(typeData[0].typeName)
      obj['priority']="P2"
      } 
      else if(testScriptDetail.priorityId=="p03"){
        //console.log(typeData[0].typeName)
      obj['priority']="P3"
      } 
       else if(testScriptDetail.priorityId=="p01"){
        //console.log(typeData[0].typeName)
      obj['priority']="P1"
      } 
       else if(testScriptDetail.priorityId=="p04"){
        //console.log(typeData[0].typeName)
      obj['priority']="P4"
      } 
    
      console.log(obj)
      newArray.push(obj)
      //console.log(newArray)
      //console.log(testScriptDetails.length-1)
    
      
      //console.log(count)
      if(count === ( testScriptDetails.length - 1)){
      //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
      res.json(newArray);
    
      }
      count++;
      // }
      
      }); 
      
  
      
      }) 
      })
      })
      })
      
      
    }//Else if end  
    else if(moduleId!="All" && featureId!="All" && type!="All" && priority=="All"){
    
    console.log("get All priority"+featureId)
     db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    
      console.log(projectDetails[0].projectId)
   
      
      db.testScript.find({"projectId":projectDetails[0].projectId,"featureId":featureId,"moduleId":moduleId,"typeId":type
     // ,"typeId":type,"priorityId":priority
    },function(err,testScriptDetails)
      {
   
      var newArray = [];
          if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
    testScriptDetails.forEach(function(testScriptDetail) {
         db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
      
      db.featureName.find({"featureId":testScriptDetail.featureId,"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,featureDetails){
      // 
    obj = {}
      obj['moduleName']= moduleDetails[0].moduleName;
      obj['featureName']= featureDetails[0].featureName;
      obj['lineNum']= testScriptDetail.lineNum;
      obj['scriptName']=testScriptDetail.scriptName;
      obj['projectSelection']=projectDetails[0].projectSelection;
      obj['time']=testScriptDetail.time;
      // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
    //console.log(testScriptDetail.typeId)
    
    if(testScriptDetail.typeId=="t01"){
        //console.log(typeData[0].typeName)
      obj['type']="Positive"
      } 
      else if(testScriptDetail.typeId=="t02"){
     obj['type']="Negative"
      }
    
      if(testScriptDetail.priorityId=="p02"){
        //console.log(typeData[0].typeName)
      obj['priority']="P2"
      } 
      else if(testScriptDetail.priorityId=="p03"){
        //console.log(typeData[0].typeName)
      obj['priority']="P3"
      } 
       else if(testScriptDetail.priorityId=="p01"){
        //console.log(typeData[0].typeName)
      obj['priority']="P1"
      } 
       else if(testScriptDetail.priorityId=="p04"){
        //console.log(typeData[0].typeName)
      obj['priority']="P4"
      } 
    
      console.log(obj)
      newArray.push(obj)
      //console.log(newArray)
      //console.log(testScriptDetails.length-1)
    
      
      //console.log(count)
      if(count === ( testScriptDetails.length - 1)){
      //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
      res.json(newArray);
    
      }
      count++;
      // }
      
      }); 
      
    
      
      }) 
      })
      })
      })
      
      
    }//Else if end 
    else if(moduleId=="All" && featureId!="All" && type!="All" && priority=="All"){
    
    console.log("get only featureId && type"+featureId)
     db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
    
      console.log(projectDetails[0].projectId)
   
      
      db.testScript.find({"projectId":projectDetails[0].projectId,"featureId":featureId,"typeId":type
     // ,"typeId":type,"priorityId":priority
    },function(err,testScriptDetails)
      {
    
      var newArray = [];
          if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
    testScriptDetails.forEach(function(testScriptDetail) {
     // console.log(testScriptDetail);
         db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
      
      db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
      // 
     obj = {}
      obj['moduleName']= moduleDetails[0].moduleName;
      obj['featureName']= featureDetails[0].featureName;
      obj['lineNum']= testScriptDetail.lineNum;
      obj['scriptName']=testScriptDetail.scriptName;
      obj['projectSelection']=projectDetails[0].projectSelection;
      obj['time']=testScriptDetail.time;
      // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
    //console.log(testScriptDetail.typeId)
    
    if(testScriptDetail.typeId=="t01"){
        //console.log(typeData[0].typeName)
      obj['type']="Positive"
      } 
      else if(testScriptDetail.typeId=="t02"){
     obj['type']="Negative"
      }
    
      if(testScriptDetail.priorityId=="p02"){
        //console.log(typeData[0].typeName)
      obj['priority']="P2"
      } 
      else if(testScriptDetail.priorityId=="p03"){
        //console.log(typeData[0].typeName)
      obj['priority']="P3"
      } 
       else if(testScriptDetail.priorityId=="p01"){
        //console.log(typeData[0].typeName)
      obj['priority']="P1"
      } 
       else if(testScriptDetail.priorityId=="p04"){
        //console.log(typeData[0].typeName)
      obj['priority']="P4"
      } 
    
      console.log(obj)
      newArray.push(obj)
      //console.log(newArray)
      //console.log(testScriptDetails.length-1)
    
      
      //console.log(count)
      if(count === ( testScriptDetails.length - 1)){
      //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
      res.json(newArray);
    
      }
      count++;
      // }
      
      }); 
      
     
    
      }) 
      })
      })
      })
      
      
    }//Else if end 
  
    else if(moduleId!="All" && featureId=="All" && type=="All" && priority!="All"){
  
      console.log("get only moduleId && priority"+featureId)
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId+"gggg"+moduleId+"gggg"+priority)
  
        
        db.testScript.find({"projectId":projectDetails[0].projectId,"moduleId":moduleId,"priorityId":priority
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
    //console.log(testScriptDetails.length)
        var newArray = [];
            if(testScriptDetails.length==0){
      console.log("777777777777rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
     testScriptDetails.forEach(function(testScriptDetail) {
    
      //console.log(testScriptDetail);
           db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
        
        db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
        // 
         //console.log("222222222222222222222222222222")    
      obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
      ///console.log(obj)
      
        newArray.push(obj) 
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
    console.log(newArray)
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
        
    
        
        }) 
        })
        })
        })
        
        
      }//Else if end 
      else if(moduleId=="All" && featureId!="All" && type=="All" && priority!="All"){
      
      console.log("get only featureId && priority"+featureId)
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId)
   
        
        db.testScript.find({"projectId":projectDetails[0].projectId,"featureId":featureId,"priorityId":priority
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
   
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
     testScriptDetails.forEach(function(testScriptDetail) {
       // console.log(testScriptDetail);
           db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
        
        db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
        //   
        obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
        console.log(obj)
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
   
        
        }) 
        })
        })
        })
        
        
      }//Else if end 
      else if(moduleId!="All" && featureId=="All" && type!="All" && priority=="All"){
      
      console.log("get only moduleId && type"+featureId)
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId)
       
        
       
        // 
        
        db.testScript.find({"projectId":projectDetails[0].projectId,"moduleId":moduleId,"typeId":type
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
     
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
  
     testScriptDetails.forEach(function(testScriptDetail) {
       // console.log(testScriptDetail);
    db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId,},function(err,moduleDetails){
  
    db.featureName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId,"featureId":testScriptDetail.featureId},function(err,featureDetails){     
       console.log(featureDetails[0].featureName+"feattttttt")
  
        obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
        console.log(obj)
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
        
   
        
        }) 
        })
        })
        })
        
        
      }//Else if end 
      else if(moduleId=="All" && featureId!="All" && type=="All" && priority=="All" ){
      
      console.log("get All Data Except feature"+featureId)
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId)
     
        
        db.testScript.find({"projectId":projectDetails[0].projectId,"featureId":featureId
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
       //   console.log("@@@@@@@@@@@@@@@@@@@@")
       console.log("@@@@@@@@@@@@@@@@@@@@"+testScriptDetails.length)
       //   console.log(testScriptDetails.length)
        // res.json(doc);
        //console.log(moduleDetails);
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
        // for(j = 0 ;j<moduleDetails.length;j++){
        
        // for(l = 0 ;l<featureDetails.length;l++){
        // console.log(doc[i].moduleId === module[j].moduleId );
        // for(i = 0 ;i<testScriptDetails.length;i++){
        testScriptDetails.forEach(function(testScriptDetail) {
       // console.log(testScriptDetail);
          db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
        
        db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
        //  
        obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
        console.log(obj)
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
        
    
        
        }) 
        })
        })
        })
        
        
      }//Else if end
      else if(moduleId!="All" && featureId!="All" && type=="All" && priority=="All" ){
      
      console.log("get module & feature"+featureId)
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId)
     
        
        db.testScript.find({"moduleId":moduleId,"projectId":projectDetails[0].projectId,"featureId":featureId
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
          console.log("@@@@@@@@@@@@@@@@@@@@"+testScriptDetails.length)
       //   console.log("@@@@@@@@@@@@@@@@@@@@")
       //   console.log(testScriptDetails.length)
        // res.json(doc);
        //console.log(moduleDetails);
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
        // for(j = 0 ;j<moduleDetails.length;j++){
        
        // for(l = 0 ;l<featureDetails.length;l++){
        // console.log(doc[i].moduleId === module[j].moduleId );
        // for(i = 0 ;i<testScriptDetails.length;i++){
        testScriptDetails.forEach(function(testScriptDetail) {
       // console.log(testScriptDetail);
         db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
        
        db.featureName.find({"featureId":testScriptDetail.featureId,"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,featureDetails){
        //   
        // if(testScriptDetail.moduleId === moduleDetails[j].moduleId && testScriptDetail.featureId ===featureDetails[l].featureId){
        // console.log(module[j].moduleName);
      obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
        console.log(obj)
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
        
    
        }) 
        })
        })
        })
        
        
      }//Else if end
      else if(moduleId=="All" && featureId!="All" && type!="All" && priority!="All"){
      
      console.log("get All Module Data")
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId)
    
        
        db.testScript.find({"projectId":projectDetails[0].projectId,"typeId":type, "priorityId" :priority ,"featureId":featureId
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
       //   console.log("@@@@@@@@@@@@@@@@@@@@")
       console.log("@@@@@@@@@@@@@@@@@@@@"+testScriptDetails.length)
       //   console.log(testScriptDetails.length)
        // res.json(doc);
        //console.log(moduleDetails);
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
        // for(j = 0 ;j<moduleDetails.length;j++){
        
        // for(l = 0 ;l<featureDetails.length;l++){
        // console.log(doc[i].moduleId === module[j].moduleId );
        // for(i = 0 ;i<testScriptDetails.length;i++){
        testScriptDetails.forEach(function(testScriptDetail) {
       // console.log(testScriptDetail);
            db.moduleName.find({"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,moduleDetails){
        
        db.featureName.find({"featureId":testScriptDetail.featureId,"moduleId":testScriptDetail.moduleId,"projectId":testScriptDetail.projectId},function(err,featureDetails){
        // 
        // if(testScriptDetail.moduleId === moduleDetails[j].moduleId && testScriptDetail.featureId ===featureDetails[l].featureId){
        // console.log(module[j].moduleName);
      obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
        console.log(obj)
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
        
    
        
        }) 
        })
        })
        })
        
        
      }//Else if end
      
      else if(moduleId!="All" && featureId=="All" && type!="All" && priority!="All"){
      
      console.log("Get All feature ")
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
      //console.log(priority+"")
      
        db.testScript.find({"projectId":projectDetails[0].projectId,"typeId":type, "priorityId" :priority ,"moduleId":moduleId
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
         //console.log("@@@@@@@@@@@@@@@@@@@@"+testScriptDetails.length)
        //console.log(testScriptDetails)
        // res.json(doc);
        //console.log(moduleDetails);
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
        // for(j = 0 ;j<moduleDetails.length;j++){
        
        // for(l = 0 ;l<featureDetails.length;l++){
        // console.log(doc[i].moduleId === module[j].moduleId );
        // for(i = 0 ;i<testScriptDetails.length;i++){
        testScriptDetails.forEach(function(testScriptDetail) {
          console.log("ooppppp")
     console.log(testScriptDetail);
      db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
        
        db.featureName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId,"featureId":testScriptDetail.featureId},function(err,featureDetails){
        // 
         console.log(featureDetails[0].featureName+"99999")
        // if(testScriptDetail.moduleId === moduleDetails[j].moduleId && testScriptDetail.featureId ===featureDetails[l].featureId){
        // console.log(module[j].moduleName);
      obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
         //obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
       // console.log(obj)
        //obj['scriptId']=testScriptDetail.scriptId;
        //obj['projectSelection']=projectDetails[0].projectSelection;
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        res.json(newArray);
      
        }
        count++;
        // }
        
        }); 
        
      
        
        }) 
        })
        })
        })
        
        
      }//else if end
      
      else if(moduleId!="All" && featureId!="All"  && priority!="All" && type!="All"){
      
      console.log("get not all data"+projectSelection)
       db.projectSelection.find({"projectSelection":projectSelection},function(err,projectDetails){
      
        console.log(projectDetails[0].projectId)
      
        console.log(projectDetails[0].projectId+","+priority+","+moduleId+","+featureId+","+type)
        db.testScript.find({"projectId":projectDetails[0].projectId, "priorityId" :priority ,"moduleId":moduleId,"featureId":featureId,"typeId":type
       // ,"typeId":type,"priorityId":priority
      },function(err,testScriptDetails)
        {
        console.log("@@@@@@@@@@@@@@@@@@@@"+testScriptDetails.length)
      
        //console.log(testScriptDetails)
        // res.json(doc);
        //console.log(moduleDetails);
        var newArray = [];
            if(testScriptDetails.length==0){
        console.log("rerrrrrrrrrrreeeeeee")
   res.json(newArray); 
  }
        // for(j = 0 ;j<moduleDetails.length;j++){
        
        // for(l = 0 ;l<featureDetails.length;l++){
        // console.log(doc[i].moduleId === module[j].moduleId );
        // for(i = 0 ;i<testScriptDetails.length;i++){
        testScriptDetails.forEach(function(testScriptDetail) {
        //console.log("testScriptDetaillllllllll");
        db.moduleName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId},function(err,moduleDetails){
        
        db.featureName.find({"projectId":testScriptDetail.projectId,"moduleId":testScriptDetail.moduleId,"featureId":testScriptDetail.featureId},function(err,featureDetails){
        //   
        // if(testScriptDetail.moduleId === moduleDetails[j].moduleId && testScriptDetail.featureId ===featureDetails[l].featureId){
        // console.log(module[j].moduleName);
        obj = {}
        obj['moduleName']= moduleDetails[0].moduleName;
        obj['featureName']= featureDetails[0].featureName;
        obj['lineNum']= testScriptDetail.lineNum;
        obj['scriptName']=testScriptDetail.scriptName;
        obj['projectSelection']=projectDetails[0].projectSelection;
        obj['time']=testScriptDetail.time;
        // db.type.find({"typeId":testScriptDetail.typeId},function(err,typeData){
      //console.log(testScriptDetail.typeId)
      
      if(testScriptDetail.typeId=="t01"){
          //console.log(typeData[0].typeName)
        obj['type']="Positive"
        } 
        else if(testScriptDetail.typeId=="t02"){
       obj['type']="Negative"
        }
      
        if(testScriptDetail.priorityId=="p02"){
          //console.log(typeData[0].typeName)
        obj['priority']="P2"
        } 
        else if(testScriptDetail.priorityId=="p03"){
          //console.log(typeData[0].typeName)
        obj['priority']="P3"
        } 
         else if(testScriptDetail.priorityId=="p01"){
          //console.log(typeData[0].typeName)
        obj['priority']="P1"
        } 
         else if(testScriptDetail.priorityId=="p04"){
          //console.log(typeData[0].typeName)
        obj['priority']="P4"
        } 
      
        console.log(obj)
        //obj['projectSelection']=projectDetails[0].projectSelection;
        newArray.push(obj)
        //console.log(newArray)
        //console.log(testScriptDetails.length-1)
      
        //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        //console.log(count)
        if(count === ( testScriptDetails.length - 1)){
      
        res.json(newArray);
      //console.log(" resend call eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee activate")
        }
      
        count++;
        // }
        
        }); 
        
  
        
        }) 
        })
        })
        })
        
        
      }//else if end
      
        
      
      
   })







}