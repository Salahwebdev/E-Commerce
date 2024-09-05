import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { authGuard } from './Core/guards/auth.guard';
import { logedGuard } from './Core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./Components/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./Components/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'forget',
        loadComponent: () => import('./Components/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent),
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'brands',
        loadComponent: () => import('./Components/barnds/barnds.component').then(m => m.BarndsComponent),
      },
      {
        path: 'cart',
        loadComponent: () => import('./Components/cart/cart.component').then(m => m.CartComponent),
      },
      {
        path: 'product',
        loadComponent: () => import('./Components/product/product.component').then(m => m.ProductComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./Components/whishlist/whishlist.component').then(m => m.WhishlistComponent),
      },
      {
        path: 'catogries',
        loadComponent: () => import('./Components/catogries/catogries.component').then(m => m.CatogriesComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./Components/details/details.component').then(m => m.DetailsComponent),
      },
      {
        path: 'allorders',
        loadComponent: () => import('./Components/allorders/allorders.component').then(m => m.AllordersComponent),
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./Components/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'specificcategory/:id',
        loadComponent: () => import('./Components/specifccategory/specifccategory.component').then(m => m.SpecifccategoryComponent),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
