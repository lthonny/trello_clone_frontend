import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./core/error/error.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/modules/home/home.module').then(mod => mod.HomeModule),
  },

  // {
  //   path: 'auth',
  //   loadChildren: () => import()
  // },

  {
    path: 'admin',
    loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
  },

  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
