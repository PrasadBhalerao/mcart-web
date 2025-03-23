import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Your login route
    { path: 'products', component: ProductListComponent }, // Your product route
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
];
export const appRoutingModule = RouterModule.forRoot(routes);
