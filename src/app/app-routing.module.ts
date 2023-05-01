import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./page/home-page/dashboard/dashboard.component";
import {AuthGuard} from './service/auth.guard';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {HomePageComponent} from "./page/home-page/home-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  // Last Path
  {path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
