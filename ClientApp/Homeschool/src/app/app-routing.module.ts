import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'admin', component: AdminLandingComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
