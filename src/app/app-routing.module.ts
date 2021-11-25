import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {HeaderPublicComponent} from './public/header-public/header-public.component';
import {ErrorComponent} from "./shared/error/error.component";

const routes: Routes = [
  {
    path: '', component: HeaderPublicComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./private/private.module').then(mod => mod.PrivateModule),
  },
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
