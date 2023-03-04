import { Component } from '@angular/core';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  tasks: Task[] = [
    { title: 'Call Adam', completed: false },
    { title: 'Buy flowers', completed: false },
    { title: 'Send email to John', completed: false }
  ];

  finishedTasks: Task[] = [
    { title: 'Buy concert tickets', completed: true },
    { title: 'Call Dad', completed: true },
  ]

  newTask: string = '';

  addTask() {
    if (this.newTask.trim().length === 0) {
      return;
    }
    this.tasks.push({ title: this.newTask, completed: false });
    this.newTask = '';
  }

  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
