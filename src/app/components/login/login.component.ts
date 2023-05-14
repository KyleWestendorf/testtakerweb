import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/testing']);
    }
  }

  onSubmit(): void {
    const {username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate(['/testing']); 
      } else {
        alert('Invalid credentials. Please try again.');
      }
    });
  }

}
