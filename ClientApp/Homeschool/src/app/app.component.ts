import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Homeschool';

  constructor(private auth: AuthService, private user: UserService, private router: Router,
    ) { }

  ngAfterViewInit(){
    setTimeout(() => this.router.navigate([`${window.location.pathname}`]),1000)
  }

}
