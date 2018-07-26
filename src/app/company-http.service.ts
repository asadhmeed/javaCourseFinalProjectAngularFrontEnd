import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LogInData } from './log-in-data';

@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService {

  constructor(private companyHttp:HttpClient) { }

  private baseUrl:string="companyRest";



  companyLogIn(logIn:LogInData){
    return this.companyHttp.post<any>(this.baseUrl +"/companylogIn",logIn);

 }
 
 companyLogOut(logInIdData){
 return this.companyHttp.post<any>(this.baseUrl+"/companyLogOut",logInIdData);
 }
 creatCoupon(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/creatCoupon",couponData);
 }
 deleteCoupon(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/deleteCoupon",couponData);
 }
 updateCoupon(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/updateCoupon",couponData);
 }

 
 getSpecificCoupons(couponTypeOrPriceOrEndDateData){
 return this.companyHttp.post<any>(this.baseUrl+"/getSpecificCoupons",couponTypeOrPriceOrEndDateData);
 }
 listAllCoupons(logInIdData){
 return this.companyHttp.post<any>(this.baseUrl+"/listAllCoupons",logInIdData);
 }
 getCompanyIncome(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/getCompanyIncome",couponData);
 }





}
