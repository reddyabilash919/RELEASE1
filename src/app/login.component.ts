import { Component,OnInit } from '@angular/core';
//import { NgZone } from '@angular/core';

import { Router } from '@angular/router';
import {LoginServiceComponent} from './login.service';

@Component({
  selector: 'app-login',
 
  templateUrl:'./html/login.component.html',
            
           
 providers: [LoginServiceComponent],

         })//componrnt  closing

export class LoginComponent implements OnInit {
  
    userNameDetails:string ;
    passwordDetails:string ;
   
    loginUserDetails:any[];
    constructor(private getData:LoginServiceComponent,private router: Router){

    }

       ngOnInit(){



           this.getData.getLoginDetails().subscribe(allData => this.loginUserDetails=allData);
      
          // this.checkLoginDetails()




       }

            checkLoginDetails(){
                 if(this.userNameDetails==undefined || this.passwordDetails==undefined){
               alert("Please Fill Mandetatory Fields")

             }
      
               if( this.userNameDetails ==this.loginUserDetails[0].userName &&this.passwordDetails==this.loginUserDetails[0].password){
                
                  this.router.navigate(['/projectSelection']); 

               }
                 else{
                   this.userNameDetails="";
                   this.passwordDetails="";
                   alert("Invalid Password")
                   
                 }

           }
           clearData(){
             //alert("ll")
             //alert(this.loginUserDetails.length)
             if(this.userNameDetails==undefined || this.passwordDetails==undefined){
               alert("Please Fill Mandetatory Fields")

             }
             this.userNameDetails="";
                   this.passwordDetails="";

           }

}
