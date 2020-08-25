import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminLandingComponent } from './admin/admin-landing/admin-landing.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ErrorComponent } from './shared/error/error.component';
import { reducers } from './store';
import { LandingComponent } from './shared/landing/landing.component';
import { TaskBaseComponent } from './tasks/task-base/task-base.component';
import { FamilyBaseComponent } from './admin/family/family-base/family-base.component';
import { FamilyListComponent } from './admin/family/family-list/family-list.component';
import { MinorBaseComponent } from './admin/minor/minor-base/minor-base.component';
import { MinorControlComponent } from './admin/minor/minor-control/minor-control.component';
import { TaskDisplayComponent } from './tasks/task-display/task-display.component';
import { FamilyEditComponent } from './admin/family/family-edit/family-edit.component';
import { FamilyCreateComponent } from './admin/family/family-create/family-create.component'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminLandingComponent,
    ToolbarComponent,
    FooterComponent,
    ErrorComponent,
    LandingComponent,
    TaskBaseComponent,
    FamilyBaseComponent,
    FamilyListComponent,
    MinorBaseComponent,
    MinorControlComponent,
    TaskDisplayComponent,
    FamilyEditComponent,
    FamilyCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
