import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from './Pages/Components/product/product.component';
import { CartItemComponent } from './Pages/Components/cart-item/cart-item.component';
import { CategoryComponent } from './Pages/Components/category/category.component';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { RouterOutlet } from '@angular/router';
import { authInterceptor } from './Pages/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    CartItemComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    CardModule,
    DialogModule,
    RouterOutlet
  ],
  providers: [
    MessageService,
     provideAnimationsAsync(),
     providePrimeNG({
      theme: {
    preset: Aura,
      // Custom options        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
      }
    
      },
    }),
    provideHttpClient((withInterceptors([authInterceptor]))),
    
  ],
  bootstrap: [AppComponent ,]
})
export class AppModule { }
