import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./page/home-page/dashboard/dashboard.component";
import {AuthGuard} from './service/auth.guard';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {FormulaireInscriptionComponent} from "./page/website/formulaire-inscription/formulaire-inscription.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'inscription', component: FormulaireInscriptionComponent},

  // Last Path
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
