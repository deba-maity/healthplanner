import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  // login() {    
  //   this.http
  //     .get<any[]>(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
  //     .subscribe(users => {
  //       if (users.length) {
  //         localStorage.setItem('user', JSON.stringify(users[0]));
  //         this.router.navigate(['/progress']);
  //       } else {
  //         this.errorMessage = 'Invalid credentials';
  //       }
  //     });
  // }

  login() {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
      } else {
        alert('Invalid credentials');
      }
    });
  }
  
}
