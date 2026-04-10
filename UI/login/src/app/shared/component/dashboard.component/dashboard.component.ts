import { Component } from '@angular/core';
import { AuthService } from '../../../features/auth/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-dashboard.component',
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  user: any;
  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void{
    this.auth?.getUserProfile().subscribe(data=>{
      console.log(data);
      this.user = data;
      console.log(this.user)
    })
  }

  logout():void{
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}


