import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ProductComponent } from './Pages/Components/product/product.component';
import { CartItemComponent } from './Pages/Components/cart-item/cart-item.component';
import { CategoryComponent } from './Pages/Components/category/category.component';
import { authGuard } from './Pages/Gards/auth.guard';

const routes: Routes = [
  { path: '',  component: LoginComponent ,pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'Cart-Item', component: CartItemComponent, canActivate: [authGuard] },
  { path: 'Products', component: ProductComponent, canActivate: [authGuard], },
  { path: 'Categories', component: CategoryComponent, canActivate: [authGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
