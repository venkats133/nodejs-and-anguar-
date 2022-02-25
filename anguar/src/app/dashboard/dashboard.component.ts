import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  pageMode:any = 0;
  updateid:any = ""
  UserDetail:any = [];
  userForm:any = {}
  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getuserdetail();
  }

  newForm(){
    
    this.userForm = { 
      "name": "",
      "dob": "", 
      "gender":"", 
      "email":"", 
      "phone":"",
      "Address":"" 
     };

     this.pageMode = 1;
  }

  add(){
    if(this.pageMode==2)
     this.update();
    else
    this.addUser();
  }

  edit(user){
     this.updateid = user._id
     this.pageMode = 2;
     this.userForm = user;
  }

  getuserdetail(){
    this.auth.getService('/users').subscribe(res=>{
      if(res!== null){
        if(res.status==111){
          this.UserDetail =  res.UserDetail;
        }
      }
    })
  }


  addUser(){
    let data = {
      "name": this.userForm.name,
      "dob": "", 
      "gender": this.userForm.gender, 
      "email": this.userForm.email, 
      "phone": this.userForm.phone,
      "Address": this.userForm.Address 
     };
    this.auth.postService('/users', data).subscribe(res=>{
      if(res.status==111){
        this.pageMode = 0;
        this.toastr.success(res.message);
        this.getuserdetail();
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  update(){
    let data = {
      "name": this.userForm.name,
      "dob": "", 
      "gender": this.userForm.gender, 
      "email": this.userForm.email, 
      "phone": this.userForm.phone,
      "Address": this.userForm.Address 
     };
    this.auth.updateService('/users/'+this.updateid, data).subscribe(res=>{
      if(res.status==111){
        this.pageMode = 0;
        this.toastr.success(res.message);
        this.getuserdetail();
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  deleteService(id){
    this.auth.deleteService('/users/'+id).subscribe(res=>{
      if(res.status==111){
        this.toastr.success(res.message);
        this.getuserdetail();
      } else {
        this.toastr.error(res.message);
      }
      
    },err=>{
      console.log(err);
    });
  }



}
