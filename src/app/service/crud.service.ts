import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  addTask(task: Task): void {
    task.id = this.generateTaskId();
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  getAllTask(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  deleteTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  editTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.updateLocalStorage();
    }
  }

  private generateTaskId(): number {
    const existingIds = this.tasks.map(task => task.id);
    const maxId = Math.max(...existingIds, 0);
    return maxId + 1;
  }

  private updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.tasksSubject.next(this.tasks);
  }
}
