import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nutrition-planner',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './nutrition-planner.component.html',
  styleUrls: ['./nutrition-planner.component.scss']
})
export class NutritionPlannerComponent implements OnInit {
  bodyType: 'lean' | 'bulky' | null = null;
  meals: string[] = [];
  water: string = '';
  today: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('hii');
    
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.today = weekdays[new Date().getDay()];
    console.log('Today:', this.today);
  }
  selectBodyType(type: 'lean' | 'bulky') {
    this.bodyType = type;
    console.log('BodyType selected:', this.bodyType);
    this.fetchNutritionPlan();
  }
  
  onTestButtonClick() {
    console.log('Inline button clicked!');
  }

  selectBodyType1() {
    console.log('aaya to');
    
    // this.bodyType = type;
    console.log('BodyType selected:', this.bodyType);
    this.fetchNutritionPlan();
  }

  test(){
    console.log('test');
    
  }
  selectBodyType2() {
    console.log('aaya to');
    
    // this.bodyType = type;
    console.log('BodyType selected:', this.bodyType);
    this.fetchNutritionPlan();
  }

  fetchNutritionPlan() {
    console.log('Fetching plan...');

    if (!this.bodyType) return;
    this.http.get<any[]>('https://dbhealth.onrender.com/nutritionPlans')
    .subscribe(plans => {
        const plan = plans.find(p => p.type === this.bodyType);
        console.log('Plan found:', !!plan);

        if (plan && plan.plans[this.today]) {
          this.meals = plan.plans[this.today].meals;
          this.water = plan.plans[this.today].water;
          console.log('Meals:', this.meals);
          console.log('Water:', this.water);
        }
      });
  }
}
