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
 
 customerLogOut(logInIdData){
 return this.customerHttp.post<any>(this.baseUrl+"/customerLogOut",logInIdData);
 }
 customerPurechasCoupon(requestData){
  return this.customerHttp.post<any>(this.baseUrl+"/purchaseCoupon",requestData);
  }
  listCustomrCoupon(requestData){
    return this.customerHttp.post<any>(this.baseUrl+"/listAllCustomerCoupons",requestData);
    }
    listCustomrSpecificCoupon(requestData){
      return this.customerHttp.post<any>(this.baseUrl+"/getCouponsByCouponTypeOrPrice",requestData);
      }
      getCoupons(){
        return this.customerHttp.get<any>(this.baseUrl+"/getAllCoupon");
      }
}
