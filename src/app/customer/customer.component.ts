import { Component, OnInit } from '@angular/core';
import { LogInData } from '../log-in-data';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }
  logInModel = new LogInData(0,"","");
  ngOnInit() {
  }
  onSubmit(){
    
  }
}
