import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./shared/components/error/error.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
