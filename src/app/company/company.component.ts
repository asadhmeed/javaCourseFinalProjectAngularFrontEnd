import { Component, OnInit} from '@angular/core';
import { LogInData } from '../log-in-data';
import { CompanyHttpService } from '../company-http.service';
import { Coupon } from '../coupon';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
   
  constructor(private companyHttpServic :CompanyHttpService) {
    
    
   }

  ngOnInit() {
  }

  
  
  
  // login
  logInId=null;
  logInModel = new LogInData(this.logInId,"","");
  logInSuccess=false;
  logInResponseMassege="";
  logInBtnClickedDisabled=false;

// coupons

    couponModel=new Coupon("",null,null,null,"","",null,"");
    creatCouponBtnClickedDisabled=false;
    
    creatCouponResponseMassege="";
    creatCouponMassegeError=false;
    couponsList={};
    couponsListed=false;
    timpCoupon={};
    updatedCoupon={};
    updataCouponBtnDisabled=false;

   // company income
   companyIncomeList={};
   companyIncomeListed=false;

  // log in function
  onSubmit(LogInData){
    this.logInBtnClickedDisabled=true;
    console.log(this.logInId);
 this.companyHttpServic.companyLogIn(this.logInModel)
 .subscribe(data =>  this.logInResponseData(data)
 , error => console.log("error" ,error));
    
  }

  private logInResponseData(data){
    
    
    this.logInResponseMassege= data.response.logInResponseMassege;
    
    if (this.logInResponseMassege==="LOGINSUCCESS" || this.logInResponseMassege==="ALREADYLOGINEDIN") {
      this.logInSuccess = true;
      this.logInId = data.response.id;
    }
    
    console.log(this.logInSuccess);
    
    console.log(this.logInResponseMassege);
    console.log(data.response.id);
    this.logInBtnClickedDisabled=false;
  }


  companyLogOut(){
    console.log(this.logInId);
    
    let requestData={
      clientId:this.logInId
    }
    this.companyHttpServic.companyLogOut(requestData)
    .subscribe(data =>this.logOutResponseData(data) ,
    error =>console.log(error)
    )
  }

  logOutResponseData(data){
    console.log(data)
    this.logInSuccess =false;
  }




  /////////////////////////////////////////////////////////////////////////////////////


  onCreatCoupon(){
    this.creatCouponBtnClickedDisabled=true;
    let requestData={
      
      clientId:this.logInId,
      coupon:this.couponModel
    }
    this.companyHttpServic.creatCoupon(requestData)
      .subscribe(data =>this.onCreatCouponData(data)
       ,
      error =>console.log(error)
      )
  
  
    }
    private onCreatCouponData(data){
      console.log(data)
      if (data.responseMassege) {
        this.creatCouponResponseMassege =data.responseMassege;
        this.creatCouponMassegeError=true;
      } 
      this.creatCouponBtnClickedDisabled=false;
    }

listAllCoupons(){
let requestData=
{
  clientId:this.logInId

}
this.companyHttpServic.listAllCoupons(requestData)
.subscribe(data=>this.listAllCouponsData(data));


}
listAllCouponsData(data){
console.log(data);
this.couponsList=data.response;
console.log(this.couponsList);

this.couponsListed=true;


}
saveCouponForDeleteOrUpdate(coupon){
  this.timpCoupon=coupon;
  this.updatedCoupon=coupon;
}
  
onUpdateCoupon(){
  this.updataCouponBtnDisabled =true;
  let requestData={
      
    clientId:this.logInId,
    coupon:this.updatedCoupon
  }

  this.companyHttpServic.updateCoupon(requestData)
  .subscribe(data => this.onUpdateCouponData(data))
}
onUpdateCouponData(data){
  console.log(data);
  this.updataCouponBtnDisabled=false
  
}


onDeleteCoupon(){
  let requestData={
    clientId:this.logInId,
    coupon: this.timpCoupon
  }

  this.companyHttpServic.deleteCoupon(requestData)
  .subscribe(data => this.deleteCouponData(data))
}
private deleteCouponData(data){

    console.log(data);
    this.listAllCoupons();
    

}

// company incom function

listAllCompanyIncome(){
  let requestData ={
    clientId: this.logInId
  }
  this.companyHttpServic.getCompanyIncome(requestData)
  .subscribe(data => this.listAllCompanyIncomeData(data))
}
listAllCompanyIncomeData(data){
  console.log(data);
  
  this.companyIncomeList=data.response;
  this.companyIncomeListed=true;
}

// get spicific coupon TODO
}
