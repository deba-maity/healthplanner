import { Routes } from '@angular/router';
import { FitnessPlannerComponent } from './pages/fitness-planner/fitness-planner.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NutritionPlannerComponent } from './pages/nutrition-planner/nutrition-planner.component';
import { ProgressTrackerComponent } from './pages/progress-tracker/progress-tracker.component';
import { RegisterComponent } from './pages/register/register.component';
import { SingupComponent } from './pages/singup/singup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SingupComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'fitness-planner', component: FitnessPlannerComponent },
    { path: 'nutrition-planner', component: NutritionPlannerComponent },
    { path: 'progress', component: ProgressTrackerComponent },
  ];
  
