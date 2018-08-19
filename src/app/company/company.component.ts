import { Component, OnInit } from '@angular/core';
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

  constructor(private companyHttpServic: CompanyHttpService) {


  }

  ngOnInit() {
  }




  // login
  logInId = null;
  logInFailed = false;
  logInModel = new LogInData(this.logInId, "", "");
  logInSuccess = false;
  logInResponseMassege = "";
  logInBtnClickedDisabled = false;

  // coupons

  couponModel = new Coupon("", null, null, null, "", "", null, "");
  creatCouponBtnClickedDisabled = false;

  creatCouponResponseMassege = "";
  creatCouponMassegeError = false;
  couponsList = new Array<Coupon>();
  couponsListed = false;
  specificByTypeCouponsList = new Array<Coupon>();
  specificByTypeCouponsListed = false;
  
  couponCreatedSuccessfully = false;
 
  couponCreatedFailed = false;


  timpCoupon = new Coupon("",null,null,null,null,null,null,null);
  updatedCoupon = new Coupon("",null,null,null,null,null,null,null);
  updataCouponBtnDisabled = false;
  serchDataForCoupons = new SerchDataForCoupons(null, null, null)
  serchDataForCouponsByPrice = new SerchDataForCoupons(null, null, null)
  serchDataForCouponsByEndDate = new SerchDataForCoupons(null, null, null)
  specificByPriceCouponsList = new Array<Coupon>();;
  specificByPriceCouponsListed = false;
  specificByEndDateCouponsList = new Array<Coupon>();;
  specificByEndDateCouponsListed = false;
  activateGetCouponByPriceTab = false;
  activateGetCouponByTypeTab = false;
  activateGetCouponByEndDateTab = false;

  // company income
  companyIncomeList = {};
  companyIncomeListed = false;


  // log in function
  // this function sends company log in data to the server
  onSubmit() {
    this.logInBtnClickedDisabled = true;
    
    this.companyHttpServic.companyLogIn(this.logInModel)
      .subscribe(data => this.logInResponseData(data)
        , error => console.log("error", error));

  }
  //receive log in response data from the server
  // if the log in Succeeded the company work space well appear and the log in form well disappear
  // if the log in failed a massage well appear for the client explaining what happened
  private logInResponseData(data) {


    this.logInResponseMassege = data.response.logInResponseMassege;

    if (this.logInResponseMassege === "LOGINSUCCESS" || this.logInResponseMassege === "ALREADYLOGGEDIN") {
      this.logInSuccess = true;
      this.logInId = data.response.id;
      this.logInFailed = false;
    }
    if (this.logInResponseMassege === "LOGINFAILED") {
      this.logInFailed = true;
    }
    this.logInBtnClickedDisabled = false;
  }

  // sends the client authorization id to log out from the server
  companyLogOut() {
    let requestData = {
      clientId: this.logInId
    }
    this.companyHttpServic.companyLogOut(requestData)
      .subscribe(data => this.logOutResponseData(data),
        error => console.log(error)
      )
  }
  // receive the data from the server response 
  // hide the company work space
  logOutResponseData(data) {

    this.logInSuccess = false;
  }




  /////////////////////////////////////////////////////////////////////////////////////

  //sends the coupon data to creat new coupon on the server 
  onCreatCoupon() {
    this.creatCouponBtnClickedDisabled = true;
    this.couponCreatedSuccessfully = false;
    let requestData = {

      clientId: this.logInId,
      coupon: this.couponModel
    }
    this.companyHttpServic.creatCoupon(requestData)
      .subscribe(data => this.onCreatCouponData(data)
        ,
        error => console.log(error)
      )


  }
  // receives the server response 
  // if the coupon  created successfully a massage well appear explains that it success 
  // if the server faild to creat the coupon a massage well appear explains that it failed
  private onCreatCouponData(data) {



    if (data.responseMessage === "COUPONISCREATED") {
      this.couponCreatedSuccessfully = true;
      this.couponCreatedFailed = false;
    }
    if (data.responseMessage === "COUPONAMEISALREADYUSED") {
      this.couponCreatedFailed = true;
      this.couponCreatedSuccessfully = false;
    }
    this.creatCouponBtnClickedDisabled = false;
  }

  // sends the company authorization id to get all the company coupons
  listAllCoupons() {
    let requestData =
    {
      clientId: this.logInId

    }

    this.companyHttpServic.listAllCoupons(requestData)
      .subscribe(data => this.listAllCouponsData(data));



  }
  // receive the response from the server
  // save the list of the company coupons to local variable
  // shows the company coupons in the work space
  listAllCouponsData(data) {
    this.couponsList = data.response;
    this.couponsListed = true;
  }
  // saves the coupon in a temporary variable before update of delete
  saveCouponForDeleteOrUpdate(coupon) {
    this.timpCoupon = coupon;
    this.updatedCoupon = coupon;
    
  }
  // sends the coupon data from the temporary variable 
  // and the authorization id to the server to update the coupon
  onUpdateCoupon() {
    this.updataCouponBtnDisabled = true;
    let requestData = {

      clientId: this.logInId,
      coupon: this.updatedCoupon
    }

    this.companyHttpServic.updateCoupon(requestData)
      .subscribe(data => this.onUpdateCouponData(data))
  }
  // receives the response from the server
  //  update the coupon list in the work space
  private onUpdateCouponData(data) {

    this.listAllCoupons();
    this.updataCouponBtnDisabled = false

  }

  // sends the authorization id and the coupon data
  // from the temporary variable to the srver to delete it
  onDeleteCoupon() {
    let requestData = {
      clientId: this.logInId,
      coupon: this.timpCoupon
    }

    this.companyHttpServic.deleteCoupon(requestData)
      .subscribe(data => this.deleteCouponData(data))
  }

  // receives the response from the server and change the list 
  // of the coumpany coupons
  private deleteCouponData(data) {


    this.listAllCoupons();


  }

  // company incom function
  //sends the coumpany authorization id to get the coumpany income list
  // list data
  listAllCompanyIncome() {
    let requestData = {
      clientId: this.logInId
    }
    this.companyHttpServic.getCompanyIncome(requestData)
      .subscribe(data => this.listAllCompanyIncomeData(data))
  }
  // receives the response data from the server 
  // saves the list of the company income to local variable 
  // shows the list of income in the work space
  private listAllCompanyIncomeData(data) {


    this.companyIncomeList = data.response;
    this.companyIncomeListed = true;
  }

  //sends the authorization id and coupon type to the srver 
  // to search for coupons with same type
  listSpecificCouponsByType() {


    let requestData = {
      clientId: this.logInId,
      specificCouponData: this.serchDataForCoupons
    }
    this.companyHttpServic.getSpecificCoupons(requestData)
      .subscribe(data => this.listSpecificCouponsData(data));
  }
  // receive list of the searched coupons from the server
  // save the list to local variable 
  // show the list in the company work space
  private listSpecificCouponsData(data) {
    this.specificByTypeCouponsList = data.response;
    this.specificByTypeCouponsListed = true;
  }
  //sends the authorization id and coupon price to the srver 
  // to search for coupons with same or less price
  listSpecificCoouponsByPrice() {

    let requestData = {
      clientId: this.logInId,
      specificCouponData: this.serchDataForCouponsByPrice
    }
    this.companyHttpServic.getSpecificCoupons(requestData)
      .subscribe(data => this.listSpecificCouponsByPriceData(data));
  }
  // receive list of the searched coupons from the server
  // save the list to local variable 
  // show the list in the company work space
  private listSpecificCouponsByPriceData(data) {
    this.specificByPriceCouponsList = data.response;
    this.specificByPriceCouponsListed = true;
  }
  //sends the authorization id and coupon endDate to the srver 
  // to search for coupons with same endDate
  listSpecificCoouponsByEndDate() {
    this.activateSearchTabs(false, false, true);
    let requestData = {
      clientId: this.logInId,
      specificCouponData: this.serchDataForCouponsByEndDate
    }
    this.companyHttpServic.getSpecificCoupons(requestData)
      .subscribe(data => this.listSpecificCouponsByEndDateData(data));
  }
  // receive list of the searched coupons from the server
  // save the list to local variable 
  // show the list in the company work space
  private listSpecificCouponsByEndDateData(data) {
    this.specificByEndDateCouponsList = data.response;
    this.specificByEndDateCouponsListed = true;
  }

  // show the search by type form 
  activateSearchByType() {
    this.activateSearchTabs(true, false, false);
  }
  // show the search by price form
  activateSearchByPrice() {
    this.activateSearchTabs(false, true, false);
  }
  // show the search by endDate form
  activateSearchByEndDate() {
    this.activateSearchTabs(false, false, true);
  }

  activateSearchTabs(isByTypeSearch: boolean, isByPriceSearch: boolean, isByEndDateSearch: boolean) {
    this.activateGetCouponByPriceTab = isByPriceSearch;
    this.activateGetCouponByTypeTab = isByTypeSearch;
    this.activateGetCouponByEndDateTab = isByEndDateSearch;

  }
}
