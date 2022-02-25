import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = `${environment.apiUrl}/api`;
  constructor(private http: HttpClient) { }

  postService(Url,body){
    
    return this.http.post<any>(this.apiBaseUrl+Url,body).pipe(map(res=>{
      
      if (!res.hasOwnProperty("error")) {
        
      }
      return res
    }))
  }

  getService(Url){
    return this.http.get<any>(this.apiBaseUrl+Url).pipe(map(res=>{
      
      if (!res.hasOwnProperty("error")) {
        
      }
      return res
    }))
  }

  deleteService(Url){
    return this.http.delete<any>(this.apiBaseUrl+Url).pipe(map(res=>{
      
      if (!res.hasOwnProperty("error")) {
        
      }
      return res
    }))
  }

  updateService(Url,data){
    return this.http.put<any>(this.apiBaseUrl+Url,data).pipe(map(res=>{
      
      if (!res.hasOwnProperty("error")) {
        
      }
      return res
    }))
  }
  
}
