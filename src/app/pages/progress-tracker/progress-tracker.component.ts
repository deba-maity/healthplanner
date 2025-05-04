import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-tracker',
  imports: [CommonModule, FormsModule],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.scss'
})
export class ProgressTrackerComponent {

  userId!: number;
  userGoals: any;
  targetWeightGain: number | null = null;
  targetWeeks: number | null = null;
  startWeight: number | null = null;
  newWeight: number | null = null;
  currentWeight: number | null = null;
  weightProgressPercent = 0;
  timeProgressPercent = 0;
  weeksPassed = 0;
  startDate: Date | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('loggedInUser')!);
    if (user) {
      this.userId = user.id;
      this.loadUserGoals();
    }
  }

  startGoalTracking() {
    this.startDate = new Date();
    this.calculateProgress();
  }
  
  loadUserGoals() {
    this.http.get<any[]>('http://localhost:3000/userGoals').subscribe(goals => {
      const goal = goals.find(g => g.userId === this.userId);
      if (goal) {
        this.userGoals = goal;
        this.startWeight = goal.startWeight;
        this.currentWeight = goal.currentWeight;
        this.targetWeightGain = goal.targetWeightGain;
        this.targetWeeks = goal.targetWeeks;
        this.calculateProgress();
      }
    });
  }

  saveGoals() {
    const goalData = {
      userId: this.userId,
      targetWeightGain: this.targetWeightGain,
      targetWeeks: this.targetWeeks,
      startWeight: this.startWeight,
      currentWeight: this.startWeight,
      startDate: new Date().toISOString().split('T')[0],
      progressUpdates: []
    };
    this.http.post('http://localhost:3000/userGoals', goalData).subscribe(() => {
      this.userGoals = goalData;
      this.calculateProgress();
    });
  }

  calculateProgress() {
    if (this.startDate) {

    if (this.startWeight !== null && this.currentWeight !== null && this.targetWeightGain !== null && this.targetWeeks !== null) {
      const weightGained = this.currentWeight - this.startWeight;
      this.weightProgressPercent = Math.min((weightGained / this.targetWeightGain) * 100, 100);
  
      const today = new Date();
      const weeksSinceStart = Math.floor(
        (today.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
      );
    
      this.weeksPassed = weeksSinceStart;
      this.timeProgressPercent = Math.min((weeksSinceStart / this.targetWeeks) * 100, 100);
    }
  }
}

  updateWeight() {
    this.userGoals.currentWeight = this.newWeight;
    this.userGoals.progressUpdates.push({ week: this.weeksPassed + 1, weight: this.newWeight });
    this.http.put(`http://localhost:3000/userGoals/${this.userGoals.id}`, this.userGoals).subscribe(() => {
      this.currentWeight = this.newWeight;
      this.calculateProgress();
      this.newWeight = 0;
    });
  }
}
