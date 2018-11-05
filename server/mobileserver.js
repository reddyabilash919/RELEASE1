module.exports=function(app)
{
  var mongojs=require('mongojs');
  var bodyParser = require("body-parser");
  var mongoose  = require('mongoose');
  var multer = require('multer');
  var db=mongojs('collections',['loginDetails','projectSelection','mobileApps'])

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  console.log("mobile_lab_server Running");
  var Promise = require('bluebird')
  var adb = require('adbkit')
  var client = adb.createClient()
  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  })
  //////////////////////////////////////////
  var storage = multer.diskStorage({

    filename: function (req, file, cb) {
    cb(null, file.originalname);
    },
    destination: function (req, file, cb) {
    var newDestination = __dirname+'/appFolder/'
      cb(null, newDestination);
      }
    });

  var upload = multer(
    { 
        dest: "appFolder/",
        limits: {
            fieldNameSize: 100,
            fileSize: 60000000
        },
        storage: storage
        });

  app.post("/shivaa", upload.any(),function(req, res) {
    res.send(req.files);
});


  client.trackDevices()
  .then(function(tracker) {
  tracker.on('add', function(device) {
  console.log('Device %s was plugged in', device.id)
  })
  tracker.on('remove', function(device) {
  console.log('Device %s was unplugged', device.id);
  db.Devices.remove({"DevicesId":device.id},{function(err,doc){
  console.log(doc);
  }})
  })
  tracker.on('end', function() {
  console.log('Tracking stopped')
  })
  })
  .catch(function(err) {
  console.error('Something went wrong:', err.stack)
  })//client.trackDevices()

  app.get('/mobileAppsDetails',function(req,res){
  db.Devices.find({},function(err,doc){
  if(doc.length !== 0)
  {
    res.json(doc);
    // runBatchFile();
  }
  })
  })

  function runBatchFile(){
  console.log("batch fileeeeeeeeeeee")
  require('child_process').exec("C:/Users/Opal/Desktop/finalreleasevicky/batchFiles/scrcpy.bat", function (err, stdout, stderr) {
  
    if (err) 
    {
    return console.log(err);
    }
    });
  
  }
  
  app.get('/checkBlockedDevice:blockeDtails',function(req,res){
    var blockDevice=req.params.blockeDtails;
    var blockDevice=blockDevice.split(',')
    var DevicesId=blockDevice[0];
    var CurrentTime=blockDevice[1];
    var ToTime=blockDevice[2];
    db.blockDevices.find({
      $and:[
        {"DevicesId":DevicesId},
        {"FromTime":{$gte:CurrentTime}}, 
        {"ToTime":{$lte:ToTime}}]},function(err,doc){
        if(doc.length != 0){

          res.json(doc)
        }
        
      })
  })
  app.post('/blockDevice',function(req,res){
    console.log(req.body);
    db.blockDevices.insert(req.body,function(err,doc){
    console.log(doc);
    if(doc.length !=0){
      res.json(doc);
    }
   
    })
    });

  app.post('/postDevicesName',function(req,res)
  {
      listDevices();
  })

  function listDevices()
  {

    client.listDevices()
    .then(function(devices) {
    return Promise.map(devices, function(device) {
    return client.shell(device.id, 'getprop ro.product.model')
    .then(adb.util.readAll)
    .then(function(output) {
    var devicesname=output.toString().trim()
    console.log(devicesname+" "+"hurry i got devices name");
    return insert(device.id,devicesname)
    console.log(devices)
    })
    })
    })
    .then(function() {
    console.log('Details of all connected devices')
    })
    .catch(function(err) {
    console.error('Something went wrong:', err.stack)
    }) 

  }//function listDevices()

  function insert(devicesid,devicesname)
  {
    db.Devices.findAndModify({
      query: {"DevicesId":devicesid},
      update: {$setOnInsert: {"DevicesName":devicesname}},
      new: true,
      upsert: true},
      function(error,doc){
    console.log(doc)
    });
  }

    app.post('/installapk',function(req,res){
      var devicesId = req.body.deviceId;
      var apkpath = req.body.apkPath;
      console.log(devicesId+"devicesId")
      console.log(apkpath+"newapknewapk")
      client.install(devicesId, apkpath)
      .then(function() {
      console.log('Installed %s on all connected devices', apkpath)
      res.json(devicesId)
      })
      .catch(function(err) {
      console.error('Something went wrong:', err.stack)
    })
    
    })//installapk

  



}//module exports