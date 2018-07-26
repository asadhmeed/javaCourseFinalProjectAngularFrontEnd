import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LogInData } from './log-in-data'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpService {

  constructor(private customerHttp:HttpClient) { }

  private baseUrl:string="customerRest";



  companyLogIn(logIn:LogInData){
    return this.customerHttp.post<any>(this.baseUrl +"/customerlogIn",logIn);

 }
 
 companyLogOut(logInIdData){
 return this.customerHttp.post<any>(this.baseUrl+"/customerLogOut",logInIdData);
 }
}
