import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./core/error/error.component";
import {HomeComponent} from "./main/modules/home/home.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' }
    ]

    // path: '',
    // loadChildren: () => import('./main/modules/home/home.module').then(mod => mod.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/private.module').then(mod => mod.PrivateModule),
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
