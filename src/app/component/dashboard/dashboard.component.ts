import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = ''; 
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.crudService
      .getAllTask()
      .subscribe(res => {
        this.taskArr = res;
      });
  }

  addTask() {
    if (this.addTaskValue.trim() === '') {
      alert('Please enter some text for the task.');
      return;
    }

    const newTask = new Task();
    newTask.task_name = this.addTaskValue;

    this.crudService.addTask(newTask);
    this.addTaskValue = '';
    this.getAllTask();
  }

  editTask() {
    if (this.editTaskValue.trim() === '') {
      alert('Please enter some text to edit the task.');
      return;
    }

    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj);
    this.editTaskValue = '';
    this.getAllTask();
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask);
    this.getAllTask();
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
