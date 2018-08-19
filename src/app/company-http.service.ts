import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LogInData } from './log-in-data';

@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService {

  constructor(private companyHttp:HttpClient) { }

  private baseUrl:string="companyRest";


// sends the log in data to the server to check if the log in success or not 
// return (LOGINSUCCESS  OR ALREADYLOGGEDIN) with authorization id OR LOGINFAILED
  companyLogIn(logIn:LogInData){
    return this.companyHttp.post<any>(this.baseUrl +"/companylogIn",logIn);

 }
//  sends authorization id to log out 
 companyLogOut(logInIdData){
 return this.companyHttp.post<any>(this.baseUrl+"/companyLogOut",logInIdData);
 }
//  sends coupon data with authorization id to creat coupon
 creatCoupon(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/creatCoupon",couponData);
 }
 //  sends coupon data with authorization id to delete coupon
 deleteCoupon(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/deleteCoupon",couponData);
 }
 //  sends coupon data with authorization id to update coupon
 updateCoupon(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/updateCoupon",couponData);
 }

//  sends the specificCouponData to the server to get list of coupons depends 
// on the type or price or endDate
 getSpecificCoupons(couponTypeOrPriceOrEndDateData){
 return this.companyHttp.post<any>(this.baseUrl+"/getSpecificCoupons",couponTypeOrPriceOrEndDateData);
 }
//  sends the authorization id to get list of all company coupons
 listAllCoupons(logInIdData){
 return this.companyHttp.post<any>(this.baseUrl+"/listAllCoupons",logInIdData);
 }
//  sends the authorization id to get list of all company income
getCompanyIncome(couponData){
 return this.companyHttp.post<any>(this.baseUrl+"/getCompanyIncome",couponData);
 }





}
