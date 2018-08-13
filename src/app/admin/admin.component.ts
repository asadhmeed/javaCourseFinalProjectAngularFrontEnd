import { Component, OnInit } from '@angular/core';
import { LogInData } from '../log-in-data';
import { AdminHttpService } from '../admin-http.service';
import { Company } from '../company';
import { Customer } from '../customer';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  logInId: number;
  constructor(private adminHttpServic: AdminHttpService) {
    this.logInId = null;
  }


  // logIn variables
  logInModel = new LogInData(this.logInId, "", "");
  logInSuccess = false;
  logInResponseMassege = "";
  logInBtnClickedDisabled = false;
  logInFailed = false;

  // company variables
  company = new Company("", "", "");
  companies: {};
  timpcompany = {};
  updatedCompany = new Company("", "", "");
  companiesListed = false;
  creatCompanyBtnClickedDisabled = false;
  updateCompanyBtnClickedDisabled = false;
  companyCreatedFailed = false;
  companyCreatedSuccess = false;




  // customer variables
  customer = new Customer("", "");
  timpCustomer: {};
  customersList: {};
  customersListed = false;
  updatedCustomer = new Customer("", "");
  updateCustomerBtnClickedDisabled = false;
  creatCustomerBtnClickedDisabled = false;
  customerCreatedFailed = false;
  customerCreatedSuccess = false;


  // income variables
  companyIncomeList = {};
  companyIncomeListed = false;


  customerIncomeList = {};
  customerIncomeListed = false;

  allIncomelist = {}
  allIncomelisted = false;

  ngOnInit() {
  }


  // Login functions 
  // sends the log in data to the server
  onSubmit() {
    this.logInBtnClickedDisabled = true;
    console.log(this.logInId);
    this.adminHttpServic.adminLogIn(this.logInModel)
      .subscribe(data => this.logInResponseData(data)
        , error => console.log("error", error));



  }
  //receive log in response data from the server
  // if the log in Succeeded the admin work space well appear and the log in form well disappear
  // if the log in failed a massage well appear for the client explaining what happened
  logInResponseData(data) {
    this.logInResponseMassege = data.response.logInResponseMassege;
    if (this.logInId === null || this.logInId !== 0) {
      this.logInId = data.response.id;

    }
    if (this.logInResponseMassege === "LOGINSUCCESS") {
      this.logInSuccess = true;
      this.logInFailed = false;

    } else {
      this.logInFailed = true;
      this.logInSuccess = false;
    }

    this.logInBtnClickedDisabled = false;

  }





  // sends the client authorization id to log out from the server
  adminLogOut() {
    let requestData = {
      clientId: this.logInId
    }
    this.adminHttpServic.adminLogOut(requestData)
      .subscribe(data => this.logOutResponseData(data),
        error => console.log(error)
      )
  }
  // receive the data from the server response 
  // hide the admin work space
  logOutResponseData(data) {
    console.log(data)
    this.logInSuccess = false;
  }

  // companies function 
  /////////////////////////////////////////
  // send the company data to the server to be created
  onCreatCompany() {
    this.creatCompanyBtnClickedDisabled = true;
    let requestData = {

      clientId: this.logInId,
      company: this.company
    }
    this.adminHttpServic.creatCompany(requestData)
      .subscribe(data => this.onCreatCompanyData(data)
        ,
        error => console.log(error)
      )


  }
  // receives the server response 
  // if the coupon  created successfully a massage well appear explains that it success 
  // if the server faild to creat the company a massage well appear explains that it failed
  private onCreatCompanyData(data) {



    if (data.response === "COMPANYCREATED") {
      this.companyCreatedSuccess = true;
      this.companyCreatedFailed = false;
    } if (data.responseMessage === "COMPANYNAMEISUSED") {
      this.companyCreatedSuccess = false;
      this.companyCreatedFailed = true;
    }
    this.creatCompanyBtnClickedDisabled = false;
  }
  //sends the Authorization id to get list of all the companies
  listAllCompany() {
    this.companiesListed = false
    let requestData = {
      clientId: this.logInId
    }
    this.adminHttpServic.listAllCompanies(requestData)
      .subscribe(data => this.listAllCompaniesTrue(data),
        error => console.log(error)
      )
  }
  // receive the response from the server
  // save the list of the companies to local variable
  // shows the companies list in the work space
  private listAllCompaniesTrue(data) {
    this.companies = data.response;
    this.companiesListed = true;


  }

  // sends the authorization id and the company data
  // from the temporary variable to the srver to delete it
  deleteCompnay() {
    console.log(this.timpcompany);

    let requestData = {
      clientId: this.logInId,
      company: this.timpcompany
    }
    this.adminHttpServic.deleteCompany(requestData).subscribe(
      data => this.deletCompanydata(data)
      ,
      error => console.log(error)


    )
  }
  // receives the response from the server and change the companies list 
  // in the work space
  private deletCompanydata(data) {

    this.listAllCompany();


  }
  // saves the company in a temporary variable before update of delete
  saveCompanyForDelete(company) {
    this.timpcompany = company;
    this.updatedCompany = company;
  }


  // sends the company data from the temporary variable 
  // and the authorization id to the server to update the company
  onUpdateCompany() {
    this.updateCompanyBtnClickedDisabled = true;
    console.log(this.updatedCompany);
    let requestData = {
      clientId: this.logInId,
      company: this.updatedCompany
    }
    this.adminHttpServic.updateCompany(requestData).
      subscribe(data => this.updateComapnyData(data)
      )
  }
  private updateComapnyData(data) {

    this.listAllCompany();
    this.updateCompanyBtnClickedDisabled = false;
  }



  // customers functions

  //sends the customer data to creat new customer on the server 
  onCreatCustomer() {

    this.creatCustomerBtnClickedDisabled = true;
    let requestData = {

      clientId: this.logInId,
      customer: this.customer
    }
    this.adminHttpServic.creatCustomer(requestData)
      .subscribe(data => this.creatCustomerData(data)
      )

  }
  // receives the server response 
  // if the customer  created successfully a massage well appear explains that it success 
  // if the server faild to creat the customer a massage well appear explains that it failed

  private creatCustomerData(data) {
    console.log(data);
    this.creatCustomerBtnClickedDisabled = false;
    if (data.response === "CUSTOMERCREATED") {
      this.customerCreatedFailed = false;
      this.customerCreatedSuccess = true;
    }
    if (data.responseMessage === "CUSTOMERNAMEISUSED") {
      this.customerCreatedFailed = true;
      this.customerCreatedSuccess = false;
    }
  }

  // sends the authorization id and the customer data
  // from the temporary variable to the srver to delete it
  onDeleteCustomer() {
    let requestData = {
      clientId: this.logInId,
      customer: this.timpCustomer
    }
    this.adminHttpServic.deleteCustomer(requestData)
      .subscribe(data => this.deleteCustomerData(data)

      )

  }
  // receives the response from the server and change the list 
  // of the customers in the work space
  private deleteCustomerData(data) {
    console.log(data)

    this.listAllCustomers();
  }
  // saves the customer data in a temporary variable before update of delete
  saveCustomerForDeleteOrUpdate(customer) {
    this.timpCustomer = customer;
    this.updatedCustomer = customer;
  }
  // sends the customer data from the temporary variable 
  // and the authorization id to the server to update the customer
  onUpdateCustomer() {
    this.updateCustomerBtnClickedDisabled = true;
    let requestData = {
      clientId: this.logInId,
      customer: this.updatedCustomer
    }

    this.adminHttpServic.updateCustomer(requestData)
      .subscribe(data => this.updateCustomerData(data)
      )
  }
  // receives the response from the server
  //  update the customers list in the work space

  private updateCustomerData(data) {

    this.updateCustomerBtnClickedDisabled = false;
    this.listAllCustomers();

  }
  // sends the Authorization id to get list of all the customers 
  listAllCustomers() {
    let requestData = {
      clientId: this.logInId
    }
    this.adminHttpServic.listAllCustomers(requestData)
      .subscribe(data => this.listAllCustomersTrue(data))
  }
  // receive the response from the server
  // save the list of the customers to local variable
  // shows the customers list in the work space
  private listAllCustomersTrue(data) {
    this.customersList = data.response
    this.customersListed = true;


  }


  // income function

  // sends the authorization id and the company data to the server 
  // to get list of company income
  listCompanyIncome(company) {

    let requestData = {
      clientId: this.logInId,
      company: company
    }
    this.adminHttpServic.getCompanyIncome(requestData)
      .subscribe(data => this.listCompanyIncomeData(data))
  }
  // receives the response from the data base 
  // saves list of the income in local variable 
  // show the list in the admin work space 
  listCompanyIncomeData(data) {
    this.companyIncomeList = data.response;
    this.companyIncomeListed = true;
  }

  // sends the authorization id and the customer data to the server 
  // to get list of customer income
  listCustomerIncome(customer) {

    let requestData = {
      clientId: this.logInId,
      customer: customer
    }
    this.adminHttpServic.getCustomerIncome(requestData)
      .subscribe(data => this.listCustomerIncomeData(data))
  }
  // receives the response from the data base 
  // saves list of the income in local variable 
  // show the list in the admin work space
  listCustomerIncomeData(data) {
    this.customerIncomeList = data.response;
    this.customerIncomeListed = true;
  }
  // sends the authorization id to the server 
  // to get list of customers and companies income
  listAllIncome() {
    let requestData = {
      clientId: this.logInId,

    }
    this.adminHttpServic.getAllIncome(requestData)
      .subscribe(data => this.getAllIncomeData(data))


  }
  // receives the response from the data base 
  // saves list of the income in local variable 
  // show the list in the admin work space
  getAllIncomeData(data) {
    this.allIncomelist = data.response;
    this.allIncomelisted = true;
  }

}
