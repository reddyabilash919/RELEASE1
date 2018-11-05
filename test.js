app.post("/projectSelection/:a",upload.any(),function(req, res) {

  let lengthCount = Number(req.body.totalLength-1);
  if( Number(req.body.currentLength) === Number(req.body.totalLength-1)){
    let projectName = req.files[0].fieldname.split("/");
      var trialCall = function() {
    
           var  lengthCount =1910;
           gfs.files.find({contentType:projectName[0]}).toArray(function (err, files) {
      
         
            let lengthCheck = files.length -1 ; 
 
            let i = 0;
      
                let m =0;
              var  trialcall1 =  function(m){
                    if(m=== lengthCheck){
                     }
                     else{
                        shell.mkdir('-p',"./"+files[m].metadata)
      
                        const stream = gfs.createReadStream(files[m].filename);
      
                        var eam = fs.createWriteStream(__dirname+"/"+files[m].metadata+"/"+files[m].filename);
      
      
                         stream.pipe(eam);
                         m++;
                         if(m==totalfiles-1){

                         res.json("kk")
                         }
           
                        trialcall1(m)
                    }
              }  
                trialcall1(0)
             
      
      
            })
    

      
  }
   
    trialCall();

  }   

res.json([]);

    
});

