import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const weekdayMuscleMap: Record<string, string> = {
  Sunday: 'Shoulders',
  Monday: 'Abs and Lower Back',
  Tuesday: 'Chest',
  Wednesday: 'Legs',
  Thursday: 'Back',
  Friday: 'Arms',
  Saturday: 'Cardio & Core'
};

@Component({
  selector: 'app-fitness-planner',
  // standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './fitness-planner.component.html',
  styleUrls: ['./fitness-planner.component.scss']
})
export class FitnessPlannerComponent implements OnInit {
  currentDay = '';
  exercises: any[] = [];
  muscleGroup: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    this.currentDay = weekdays[today];
    this.muscleGroup = weekdayMuscleMap[this.currentDay];
console.log('hii');

const apiUrl = 'https://dbhealth.onrender.com';  // Update this to your Render backend URL
this.http.get<any[]>(`https://dbhealth.onrender.com/exercises?day=${this.currentDay}`)
  .subscribe(res => {
    this.exercises = res[0]?.exercises || [];
  });

  }
}
