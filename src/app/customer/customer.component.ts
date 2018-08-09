import { Component, OnInit } from '@angular/core';
import { LogInData } from '../log-in-data';
import { CustomerHttpService } from '../customer-http.service';
import { SerchDataForCoupons } from '../serch-data-for-coupons';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerHttpServic:CustomerHttpService) { }
  
  ngOnInit() {
  }
  


  // login
  logInId=null;
  logInModel = new LogInData(this.logInId,"","");
  logInSuccess=false;
  logInResponseMassege="";
  logInBtnClickedDisabled=false;

  //coupons
  coupon={};
  couponList={};
  couponsListed=false;
  myCouponsList={}
  myCouponsListed=false;
  typeOfTheCoupon=new SerchDataForCoupons(null,null,null);
  priceOfTheCoupon=new SerchDataForCoupons(null,null,null);
  myCouponsListByType={};
  myCouponsListedByType=false;
  myCouponsListByPrice={};
  myCouponsListedByPrice=false;
  getMyCouponByTypeActivate=false;
  getMyCouponByPriceActivate=false;
  getMyCouponActivate=false;







  onCustomerLogIn(){
    this.logInBtnClickedDisabled=true;
    console.log(this.logInId);
 this.customerHttpServic.companyLogIn(this.logInModel)
 .subscribe(data =>  this.logInResponseData(data)
 , error => console.log("error" ,error));
  }


  private logInResponseData(data){
  
      this.logInResponseMassege= data.response.logInResponseMassege;
      console.log(data);
      if (this.logInResponseMassege==="LOGINSUCCESS" || this.logInResponseMassege==="ALREADYLOGGEDIN") {
        this.logInSuccess = true;
        this.logInId = data.response.id;
      }
      
      
      this.logInBtnClickedDisabled=false;
  }

  customerLogOut(){
    let requestData={
      clientId:this.logInId
    }

    this.customerHttpServic.customerLogOut(requestData)
    .subscribe(data=> this.customerLogOutData(data));
  }

  customerLogOutData(data){
console.log(data);
this.logInSuccess=false;
  }


  listAllCoupons(){
    this.customerHttpServic.getCoupons().
    subscribe(data => this.listAllCouponData(data));
  }

  private listAllCouponData(data){
this.couponList=data.response;
this.couponsListed=true;
console.log(data);

  }

  listMyCoupons(){
    let requestData={
      clientId:this.logInId
    }
    this.customerHttpServic.listCustomrCoupon(requestData)
    .subscribe(data=>this.listMyCouponsData(data));
  }
  listMyCouponsData(data){
    console.log(data);
 this.myCouponsList=data.response;
    this.myCouponsListed=true;
  }

  saveCouponForPurchase(coupon){
   this.coupon=coupon;
  }
  purchaseCoupon(){
    let requestData={
      clientId:this.logInId,
      coupon:this.coupon
    }

    this.customerHttpServic.customerPurechasCoupon(requestData)
    .subscribe(data =>this.purchaseCouponData(data))

  }
  purchaseCouponData(data){
    console.log(data);
    

  }

listMyCouponByType(){
let requestData ={
  clientId:this.logInId,
  specificCouponData:this.typeOfTheCoupon
}

this.customerHttpServic.listCustomrSpecificCoupon(requestData)
.subscribe(data=>this.listMyCouponByTypeData(data))
}

private listMyCouponByTypeData(data){
  this. myCouponsListByType=data.response;
  console.log(data);
  this.myCouponsListedByType=true;
  

}


listMyCouponByPrice(){
  let requestData ={
    clientId:this.logInId,
    specificCouponData:this.priceOfTheCoupon
  }

  this.customerHttpServic.listCustomrSpecificCoupon(requestData)
.subscribe(data=>this.listMyCouponByPriceData(data))
}

private listMyCouponByPriceData(data){
  this. myCouponsListByPrice=data.response;
  console.log(data);
  this.myCouponsListedByPrice=true;
  

}

activateGetMyCouponByType(){
  
  this.getMyCouponByTypeActivate=true;
  this.getMyCouponByPriceActivate=false;
  this.getMyCouponActivate=false;

}
activateGetMyCouponByPrice(){
  
  this.getMyCouponByTypeActivate=false;
  this.getMyCouponByPriceActivate=true;
  this.getMyCouponActivate=false;

}
activateGetMyCoupon(){
  
  this.getMyCouponByTypeActivate=false;
  this.getMyCouponByPriceActivate=false;
  this.getMyCouponActivate=true;

}

}




