import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { CartItemService } from '../../Services/cart-item.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  categoriesD: any[] = [];
  selectedCategory: string = 'All';
  displayAddProductDialog: boolean = false;
  productForm!: FormGroup;
  productId: string = '';
  userId: string = '';
  role: any = '';
  currentSubmit: string = 'add';
  constructor(
    private fb: FormBuilder,
    private _ProductService: ProductService,
    private _cartItemService: CartItemService,
    private _auth: AuthService,
    private  _router: Router
      
    
  ) {}

  ngOnInit(): void {
   this.role=  this._auth.getRole();
    this.initProductForm();
    this.loadProducts();
    this.loadCategories();
    this.userId = this._auth.getuserId() || '';
  }

  // Initialize the product form
  initProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
    });
  }

  // Load products (mock data for now)
  loadProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.loadCategories();
      },
    });
  }

  loadCategories() {
    const uniqueCategoriesMap = new Map<string, string>();

    this.products.forEach((product) => {
      if (!uniqueCategoriesMap.has(product.categoryId)) {
        uniqueCategoriesMap.set(product.categoryId, product.categoryName);
      }
    });

    this.categories = Array.from(uniqueCategoriesMap.entries()).map(
      ([id, name]) => ({
        label: name,
        value: id,
      })
    );

    this.categories = this.products.map((product) => ({
      label: product.categoryName,
      value: product.categoryId,
    }));

    this.categoriesD = [{ label: 'All', value: null }, ...this.categories];

    this.categories = ['All', ...new Set(this.products.map(product => product.categoryName))];
  }
  logout() {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

  getFilteredProducts() {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(
      (product) => product.categoryName === this.selectedCategory
    );
  }

  openAddProductDialog() {
    this.displayAddProductDialog = true;
    this.productForm.reset();
    this.currentSubmit = 'add';
  }

  addProduct() {
    this.currentSubmit = 'add';
    if (this.productForm.valid) {
      const newProduct = {
        id: this.products.length + 1,
        ...this.productForm.value,
      };
      this.products.push(newProduct);
      this._ProductService
        .createProduct({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          stock: newProduct.stock,
          categoryId: newProduct.categoryId,
        })
        .subscribe({
          next: (response) => {
            console.log('Product added successfully', response);

          },
          error: (error) => {
            console.error('Error adding product', error);
          },
        });
        this.loadProducts();
      this.loadCategories();
      this.displayAddProductDialog = false;
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  addProductToCart(product: any) {
    this.productId = product.id;
    console.log('Product ID:', this.productId);
 
  }

  updateProduct(product: any) {
    this.currentSubmit = 'update';
    this.productId = product.id;
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
    });
    // this.productId = product.id;
    this.displayAddProductDialog = true;
  }

  saveUpdate() {
    this._ProductService.updateProduct({id: this.productId,...this.productForm.value}).subscribe({
      next: (response) => {
        console.log('Product updated successfully', response);
    this.displayAddProductDialog = false;
        
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error updating product', error);
      },
    });
    this.productId = '0';
    this.productId = this.productForm.value.id;
  }

  deleteProduct(product: any) {
    this._ProductService.deleteProduct(product.id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully', response);
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product', error);
      },
    });
  }
  isCratShowen: boolean = false;

  hideCart() {
    this.isCratShowen = false;
  }

  showCart() {
    this.isCratShowen = true;
  }
}
