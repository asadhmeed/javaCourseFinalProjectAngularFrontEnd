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
     logInId:number;
  constructor(private adminHttpServic :AdminHttpService) {
    this.logInId =null; }


  // logIn variables
    logInModel = new LogInData(this.logInId,"","");
  logInSuccess=false;
  logInResponseMassege="";
  logInBtnClickedDisabled=false;
  
  // company variables
  company = new Company("","","");
  companies:{};
  timpcompany={};
  updatedCompany= new Company("","","");
  creatCompanyResponseMassege:"";
  companiesListed=false;
  creatCompanyMassegeError=false;
  creatCompanyBtnClickedDisabled=false;
  updateCompanyBtnClickedDisabled=false;


// customer variables
  customer= new Customer("","");
  timpCustomer:{};
  customersList:{};
  customersListed=false;
  updatedCustomer= new Customer("","");
  updateCustomerBtnClickedDisabled=false;
  creatCustomerBtnClickedDisabled=false;


  // income variables
  companyIncomeList={};
  companyIncomeListed=false;


  customerIncomeList={};
  customerIncomeListed=false;

  allIncomelist={}
  allIncomelisted=false;

  ngOnInit() {
  }
  

  // Login functions 
  onSubmit(){
    this.logInBtnClickedDisabled=true;
    console.log(this.logInId);
 this.adminHttpServic.adminLogIn(this.logInModel)
 .subscribe(data =>  this.logInResponseData(data)
 , error => console.log("error" ,error));
 // console.log(this.logInModel);

 
  }
  logInResponseData(data){
    this.logInResponseMassege= data.response.logInResponseMassege;
    if (this.logInId===null || this.logInId!==0) {
      this.logInId = data.response.id;
      
    } 
    if (this.logInResponseMassege==="LOGINSUCCESS") {
      this.logInSuccess = true;
      
    }
    console.log(this.logInResponseMassege);
    console.log(data.response.id);
    this.logInBtnClickedDisabled=false;
    
  }




  //////////////////////////////////////////////
  adminLogOut(){
    let requestData={
      clientId:this.logInId
    }
    this.adminHttpServic.adminLogOut(requestData)
    .subscribe(data =>this.logOutResponseData(data) ,
    error =>console.log(error)
    )
  }

  logOutResponseData(data){
    console.log(data)
    this.logInSuccess =false;
  }

// companies function 
  /////////////////////////////////////////
  onCreatCompany(){
    this.creatCompanyBtnClickedDisabled=true;
  let requestData={
    
    clientId:this.logInId,
    company:this.company
  }
  this.adminHttpServic.creatCompany(requestData)
    .subscribe(data =>this.onCreatCompanyData(data)
     ,
    error =>console.log(error)
    )


  }
  private onCreatCompanyData(data){
    console.log(data)
    if (data.responseMassege) {
      this.creatCompanyResponseMassege =data.responseMassege;
      this.creatCompanyMassegeError=true;
    } 
    this.creatCompanyBtnClickedDisabled=false;
  }

  listAllCompany(){
    this.companiesListed=false
    let requestData ={
      clientId:this.logInId
    }
    this.adminHttpServic.listAllCompanies(requestData)
    .subscribe(data=> this.listAllCompaniesTrue(data),
    error=>console.log(error)
  )
}

private listAllCompaniesTrue(data){
  this.companies=data.response;
  this.companiesListed=true;
  console.log(this.companies);
  
  }

  
  deleteCompnay(){
    console.log(this.timpcompany);
    
let requestData={
  clientId:this.logInId,
  company:this.timpcompany
}
    this.adminHttpServic.deleteCompany(requestData).subscribe(
      data=>this.deletCompanydata(data) 
      ,
      error => console.log(error)
      
      
    )
  }
  private deletCompanydata(data){
    console.log(data)
    this.listAllCompany();

  }

  saveCompanyForDelete(company){
    console.log(company);
    
    this.timpcompany=company;
    this.updatedCompany=company;
    }



    onUpdateCompany(){
      this.updateCompanyBtnClickedDisabled=true;
           console.log(this.updatedCompany);
        let requestData={
          clientId:this.logInId,
          company:this.updatedCompany
        }    
      this.adminHttpServic.updateCompany(requestData).
      subscribe(data =>this.updateComapnyData(data)
      )
    }
    private updateComapnyData(data){
      console.log(data);
       this.listAllCompany();
      this.updateCompanyBtnClickedDisabled=false;
    }



    // customers functions
    onCreatCustomer(){

      this.creatCustomerBtnClickedDisabled=true;
      let requestData={

        clientId:this.logInId,
        customer:this.customer
      }
      this.adminHttpServic.creatCustomer(requestData)
      .subscribe(data => this.creatCustomerData(data)
      )

    }

    private creatCustomerData(data){
      console.log(data);
      this.creatCustomerBtnClickedDisabled=false;
    }


    onDeleteCustomer(){
      let requestData={
        clientId:this.logInId,
        customer:this.timpCustomer
      }
      this.adminHttpServic.deleteCustomer(requestData)
      .subscribe(data=> this.deleteCustomerData(data)
      
      )
        
    }
    private deleteCustomerData(data){
      console.log(data)
      
      this.listAllCustomers();
    }

     saveCustomerForDeleteOrUpdate(customer){
      this.timpCustomer=customer;
      this.updatedCustomer=customer;
    }

    onUpdateCustomer(){
      this.updateCustomerBtnClickedDisabled=true;
      let requestData={
        clientId:this.logInId,
        customer:this.updatedCustomer
      }

      this.adminHttpServic.updateCustomer(requestData)
      .subscribe(data=>this.updateCustomerData(data)
      )
    }
    private updateCustomerData(data)
    {
      console.log(data);
      this.updateCustomerBtnClickedDisabled=false;
      this.listAllCustomers();
    }

    listAllCustomers(){
      let requestData={
        clientId:this.logInId
      }
      this.adminHttpServic.listAllCustomers(requestData)
      .subscribe(data=> this.listAllCustomersTrue(data))
    }
    private listAllCustomersTrue(data){
      this.customersList=data.response
      this.customersListed=true;
      console.log(data);
      
      }


      // income function


      listCompanyIncome(company){
        
        let requestData={
          clientId:this.logInId,
          company:company
        }
        this.adminHttpServic.getCompanyIncome(requestData)
        .subscribe(data=>this.listCompanyIncomeData(data))
      }
      listCompanyIncomeData(data){
        this.companyIncomeList=data.response;
        this.companyIncomeListed =true;
      }
    

      listCustomerIncome(customer){
        
        let requestData={
          clientId:this.logInId,
          customer:customer
        }
        this.adminHttpServic.getCustomerIncome(requestData)
        .subscribe(data=>this.listCustomerIncomeData(data))
      }
      listCustomerIncomeData(data){
        this.customerIncomeList=data.response;
        this.customerIncomeListed =true;
      }

      listAllIncome(){
        let requestData={
          clientId:this.logInId,

        }
        this.adminHttpServic.getAllIncome(requestData)
        .subscribe(data=> this.getAllIncomeData(data))


      }
      getAllIncomeData(data){
        this.allIncomelist=data.response;
        this.allIncomelisted=true;
      }

}
