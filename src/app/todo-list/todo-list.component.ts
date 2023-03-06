import { Component } from '@angular/core';

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  tasks: Task[] = [
    { title: 'Call Adam', completed: false },
    { title: 'Buy flowers', completed: false },
    { title: 'Send email to John', completed: false },
  ];

  finishedTasks: Task[] = [
    { title: 'Buy concert tickets', completed: true },
    { title: 'Call Dad', completed: true },
  ];

  newTask: string = '';

  addTask = () => {
    if (this.newTask.trim().length === 0) {
      return;
    }
    this.tasks.push({ title: this.newTask, completed: false });
    this.newTask = '';
  };

  tickOff = (task: Task) => {
    let i = this.tasks.indexOf(task);
    let finishedTaskTitle = this.tasks[i].title;
    this.finishedTasks.push({ title: finishedTaskTitle, completed: true });
    this.deleteTask(task, this.tasks);
  };

  restoreTask = (task: Task) => {
    let i = this.finishedTasks.indexOf(task);
    let taskTitle = this.finishedTasks[i].title;
    this.tasks.push({ title: taskTitle, completed: false });
    this.deleteTask(task, this.finishedTasks);
  };

  deleteTask = (task: Task, currentTask: any) => {
    let i = currentTask.indexOf(task);
    if (i > -1) {
      currentTask.splice(i, 1);
    }
  };
}
