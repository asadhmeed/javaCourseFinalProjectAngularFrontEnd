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

  constructor(private customerHttpServic: CustomerHttpService) { }

  ngOnInit() {
  }



  // login
  logInId = null;
  logInModel = new LogInData(this.logInId, "", "");
  logInSuccess = false;
  logInResponseMassege = "";
  logInBtnClickedDisabled = false;
  logInFailed = false;

  //coupons
  coupon = {};
  couponList = {};
  couponsListed = false;
  myCouponsList = {}
  myCouponsListed = false;
  typeOfTheCoupon = new SerchDataForCoupons(null, null, null);
  priceOfTheCoupon = new SerchDataForCoupons(null, null, null);
  myCouponsListByType = {};
  myCouponsListedByType = false;
  myCouponsListByPrice = {};
  myCouponsListedByPrice = false;
  getMyCouponByTypeActivate = false;
  getMyCouponByPriceActivate = false;
  getMyCouponActivate = false;






  // when the customer press the log in button the function sendes the data to the server 
  onCustomerLogIn() {
    this.logInBtnClickedDisabled = true;
    this.customerHttpServic.companyLogIn(this.logInModel)
      .subscribe(data => this.logInResponseData(data)
        , error => console.log("error", error));
  }

  //this function receives the data from the server 
  //if the customer log in was successful(already logged in is successfully logged in) the customer work space we'll  appear and log in input we'll be hidden
  //if the customer log in was failed the client well show appropriate massage
  private logInResponseData(data) {
    // save the log in response massage from the data base
    this.logInResponseMassege = data.response.logInResponseMassege;

    if (this.logInResponseMassege === "LOGINSUCCESS" || this.logInResponseMassege === "ALREADYLOGGEDIN") {
      this.logInSuccess = true;
      this.logInId = data.response.id;
      this.logInFailed = false;
    }
    if (this.logInResponseMassege === "LOGINFAILED") {
      this.logInFailed = true;
      this.logInId = null;
    }


    this.logInBtnClickedDisabled = false;
  }

  // when the custmer presses the log out button sends the login id(authorization id ) to the server
  customerLogOut() {
    let requestData = {
      clientId: this.logInId
    }

    this.customerHttpServic.customerLogOut(requestData)
      .subscribe(data => this.customerLogOutData(data));
  }

  // receives the data from the server 
  // and logging out the user in the client
  // shows the log in input and hide the customer work space 
  customerLogOutData(data) {
    this.logInId = null;
    this.logInSuccess = false;
  }

  // sends the request to get all the coupons from the server 
  listAllCoupons() {
    this.customerHttpServic.getCoupons().
      subscribe(data => this.listAllCouponData(data));
  }
  // get the data of all the coupons from the server
  // and save it in array in the client 
  // show the coupon list in the html
  private listAllCouponData(data) {
    this.couponList = data.response;
    this.couponsListed = true;


  }
  // sendes the Authorization id to the server to get customer purchased coupons
  listMyCoupons() {
    let requestData = {
      clientId: this.logInId
    }
    this.customerHttpServic.listCustomrCoupon(requestData)
      .subscribe(data => this.listMyCouponsData(data));
  }
  // receives the data from the server 
  // saves the coupons in client array 
  // show the list in the customer work space
  listMyCouponsData(data) {
    console.log(data);
    this.myCouponsList = data.response;
    this.myCouponsListed = true;
  }

  // saves the customer from the html in order to purchase it
  saveCouponForPurchase(coupon) {
    this.coupon = coupon;
  }
  // sends the authorization id and coupon data for purchase
  // and saves the purchase data in income table in data base 
  purchaseCoupon() {
    let requestData = {
      clientId: this.logInId,
      coupon: this.coupon
    }

    this.customerHttpServic.customerPurechasCoupon(requestData)
      .subscribe(data => this.purchaseCouponData(data))

  }
  // receives data from the server
  purchaseCouponData(data) {
    console.log(data);


  }
  // sendes the Authorization id and specific coupon data to the server to get customer purchased coupons by type
  listMyCouponByType() {
    let requestData = {
      clientId: this.logInId,
      specificCouponData: this.typeOfTheCoupon
    }

    this.customerHttpServic.listCustomrSpecificCoupon(requestData)
      .subscribe(data => this.listMyCouponByTypeData(data))
  }
  // receives the data from the server 
  // saves the coupons in client array 
  // show the list in the customer work space
  private listMyCouponByTypeData(data) {
    this.myCouponsListByType = data.response;
    console.log(data);
    this.myCouponsListedByType = true;


  }

  // sendes the Authorization id and specific coupon data to the server to get customer purchased coupons by price
  listMyCouponByPrice() {
    let requestData = {
      clientId: this.logInId,
      specificCouponData: this.priceOfTheCoupon
    }

    this.customerHttpServic.listCustomrSpecificCoupon(requestData)
      .subscribe(data => this.listMyCouponByPriceData(data))
  }
  // receives the data from the server 
  // saves the coupons in client array 
  // show the list in the customer work space
  private listMyCouponByPriceData(data) {
    this.myCouponsListByPrice = data.response;
    console.log(data);
    this.myCouponsListedByPrice = true;


  }
  // show the customer list of coupons
  // hide the rest listes
  activateGetMyCouponByType() {

    this.getMyCouponByTypeActivate = true;
    this.getMyCouponByPriceActivate = false;
    this.getMyCouponActivate = false;

  }
  // show the customer list of coupons by type
  // hide the rest listes
  activateGetMyCouponByPrice() {

    this.getMyCouponByTypeActivate = false;
    this.getMyCouponByPriceActivate = true;
    this.getMyCouponActivate = false;

  }
  // show the customer list of coupons by price
  // hide the rest listes
  activateGetMyCoupon() {

    this.getMyCouponByTypeActivate = false;
    this.getMyCouponByPriceActivate = false;
    this.getMyCouponActivate = true;

  }

}




