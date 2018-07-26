import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CompanyComponent } from './company/company.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
    {path:'customerService',component:CustomerComponent},
    {path:'companyService',component:CompanyComponent},
    {path:'adminService',component:AdminComponent},
    
] ;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

        }
export const routingComponents = [CustomerComponent,CompanyComponent,AdminComponent];