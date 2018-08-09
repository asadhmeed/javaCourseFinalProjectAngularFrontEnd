import { Component, OnInit} from '@angular/core';
import { LogInData } from '../log-in-data';
import { CompanyHttpService } from '../company-http.service';
import { Coupon } from '../coupon';
import { SerchDataForCoupons } from '../serch-data-for-coupons';

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
    specificByTypeCouponsList={};
    specificByTypeCouponsListed=false;



    timpCoupon={};
    updatedCoupon={};
    updataCouponBtnDisabled=false;
    serchDataForCoupons=new SerchDataForCoupons(null,null,null)
    serchDataForCouponsByPrice=new SerchDataForCoupons(null,null,null)
    serchDataForCouponsByEndDate=new SerchDataForCoupons(null,null,null)
    specificByPriceCouponsList={};
    specificByPriceCouponsListed=false;
    specificByEndDateCouponsList={};
    specificByEndDateCouponsListed=false;
    activateGetCouponByPriceTab=false;
    activateGetCouponByTypeTab=false;
    activateGetCouponByEndDateTab=false;

   // company income
   companyIncomeList={};
   companyIncomeListed=false;
   

  // log in function
  onSubmit(){
    this.logInBtnClickedDisabled=true;
    console.log(this.logInId);
 this.companyHttpServic.companyLogIn(this.logInModel)
 .subscribe(data =>  this.logInResponseData(data)
 , error => console.log("error" ,error));
    
  }

  private logInResponseData(data){
    
    
    this.logInResponseMassege= data.response.logInResponseMassege;
    
    if (this.logInResponseMassege==="LOGINSUCCESS" || this.logInResponseMassege==="ALREADYLOGGEDIN") {
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
private onUpdateCouponData(data){
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
private listAllCompanyIncomeData(data){
  console.log(data);
  
  this.companyIncomeList=data.response;
  this.companyIncomeListed=true;
}

// get spicific coupon TODO
listSpecificCouponsByType(){
  
  
  let requestData={
    clientId:this.logInId,
    specificCouponData:this.serchDataForCoupons
  }
  this.companyHttpServic.getSpecificCoupons(requestData)
  .subscribe(data=>this.listSpecificCouponsData(data));
}
private listSpecificCouponsData(data){
  this.specificByTypeCouponsList=data.response;
   this.specificByTypeCouponsListed=true;
}

listSpecificCoouponsByPrice(){
  
  let requestData={
    clientId:this.logInId,
    specificCouponData:this.serchDataForCouponsByPrice
  }
  this.companyHttpServic.getSpecificCoupons(requestData)
  .subscribe(data=>this.listSpecificCouponsByPriceData(data));
}
private listSpecificCouponsByPriceData(data){
  this.specificByPriceCouponsList=data.response;
   this.specificByPriceCouponsListed=true;
}
listSpecificCoouponsByEndDate(){
  this.activateSearchTabs(false,false,true);
  let requestData={
    clientId:this.logInId,
    specificCouponData:this.serchDataForCouponsByEndDate
  }
  this.companyHttpServic.getSpecificCoupons(requestData)
  .subscribe(data=>this.listSpecificCouponsByEndDateData(data));
}
private listSpecificCouponsByEndDateData(data){
  this.specificByEndDateCouponsList=data.response;
   this.specificByEndDateCouponsListed=true;
}

activateSearchByType(){
  this.activateSearchTabs(true,false,false);
}
activateSearchByPrice(){
  this.activateSearchTabs(false,true,false);
}
activateSearchByEndDate(){
  this.activateSearchTabs(false,false,true);
}

activateSearchTabs(isByTypeSearch:boolean,isByPriceSearch:boolean,isByEndDateSearch:boolean){
  this.activateGetCouponByPriceTab=isByPriceSearch;
    this.activateGetCouponByTypeTab=isByTypeSearch;
    this.activateGetCouponByEndDateTab=isByEndDateSearch;

}
}
