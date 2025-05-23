import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./page/home-page/dashboard/dashboard.component";
import {AuthGuard} from './service/auth/auth.guard';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {HomeComponent} from "./page/home-page/home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'dashboard/:id', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'home-page', component: HomeComponent},

  // Last Path
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
