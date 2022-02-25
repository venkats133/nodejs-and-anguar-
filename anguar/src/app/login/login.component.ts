import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = {
    "name": "",
    "password": ""
  };
  screen:any = 1;
  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    sessionStorage.clear();
  }

  newForm(){
    this.loginForm = {
      "name": "",
      "password": ""
    };
  }

  login(f){
    // console.log(f);
    let Url = this.screen==1?'/admin/signin': "/admin/signup";
    this.auth.postService(Url, {"name": this.loginForm.name,"password": this.loginForm.password}).subscribe((res) => {
      console.log(res);
      if(res.status==111){
        this.toastr.success(res.message);
        if(this.screen==1){
          sessionStorage.setItem('access_id',res._id);
          this.router.navigateByUrl('/dashboard');
        }else if(this.screen==2)
          this.screen=1;
          f.resetForm();
      } else {
        this.toastr.error('Username or password is incorrect')
      }
      
    },err=>{
      console.log(err);
    });
  }
  

}
