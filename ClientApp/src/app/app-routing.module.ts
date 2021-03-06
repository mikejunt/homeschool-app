import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './shared/error/error.component';
import { LandingComponent } from './shared/landing/landing.component';
import { TaskBaseComponent } from './tasks/task-base/task-base.component';
import { MinorControlComponent } from './admin/minor/minor-control/minor-control.component';
import { ViewGuard } from './guards/view.guard';
import { ProfileComponent } from './admin/profile/profile.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'admin', component: LandingComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TaskBaseComponent, canActivate: [AuthGuard, ViewGuard] },
    { path: 'minors', component: MinorControlComponent, canActivate: [AuthGuard, ViewGuard] },
    { path: '', redirectTo: 'profile', pathMatch: 'prefix'}
  ] },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
