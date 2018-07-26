import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LogInData } from './log-in-data';


@Injectable({
  providedIn: 'root'
})
export class AdminHttpService {
// TODO:chang the url before build
  private baseUrl:string="adminRest";

  constructor(private http:HttpClient ) { }

adminLogIn(logIn:LogInData){
   return this.http.post<any>(this.baseUrl +"/adminlogIn",logIn);
// return this.response;
}

adminLogOut(logInId){
return this.http.post<any>(this.baseUrl+"/adminLogout",logInId);
}


creatCompany(companyData){
  return this.http.post<any>(this.baseUrl+"/creatCompany",companyData);
  
}
deleteCompany(companyData){
  
  return this.http.post<any>(this.baseUrl+"/deleteCompany",companyData);
}
listAllCompanies(adminData){
return this.http.post(this.baseUrl+"/listAllCompany",adminData);
}

updateCompany(companyData){
  return this.http.post(this.baseUrl+"/updateCompany",companyData);
}

//customers

creatCustomer(requestData){
  return this.http.post(this.baseUrl+"/creatCustomer",requestData);
}
updateCustomer(customerData){
  return this.http.post(this.baseUrl+"/updateCustomer",customerData);
}
deleteCustomer(customerData){
  
  return this.http.post<any>(this.baseUrl+"/deleteCustomer",customerData);
}
listAllCustomers(adminData){
return this.http.post(this.baseUrl+"/listAllCustomers",adminData);
}

//incomes

getCustomerIncome(spicificCustomerData){
  return this.http.post(this.baseUrl+"/getCustomerIncome",spicificCustomerData);
}
getCompanyIncome(spicificCompanyData){
  return this.http.post(this.baseUrl+"/getCompanyIncome",spicificCompanyData);
}
getAllIncome(adminData){
  return this.http.post(this.baseUrl+"/getAllIncome",adminData);
}

}
