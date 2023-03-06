import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDoc } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Represents a task in the todo list.
 */
interface Task {
  /**
   * The title of the task.
   */
  title: string;
  /**
   * Whether the task is completed or not.
   */
  completed: boolean;
}

/**
 * The TodoListComponent displays a list of tasks and allows the user to
 * add, remove, and complete tasks.
 */

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(public firestore: Firestore) {
    const coll = collection(this.firestore, 'items');
  }

  /**
   * The list of tasks that are not yet completed.
   */
  tasks: Task[] = [];

  /**
   * The list of tasks that have been completed.
   */
  finishedTasks: Task[] = [];

  /**
   * The title of the new task that the user wants to add.
   */
  newTask: string = '';

  /**
   * Called when the component is initialized.
   */
  ngOnInit(): void {
    this.downloadFirebase();
  }

  /**
   * Adds a new task to the list of tasks.
   */

  addTask = () => {
    if (this.newTask.trim().length === 0) {
      return;
    }
    // adds a new task to the list of tasks and sets the new task title to an empty string
    this.tasks.push({ title: this.newTask, completed: false });
    this.newTask = '';
    // updates the tasks and finished tasks in Firestore
    this.updateFirestore();
  };

  /**
   * Add the task to finishedTasks and remove the current task from the list of tasks.
   */

  tickOff = (task: Task) => {
    let i = this.tasks.indexOf(task);
    let finishedTaskTitle = this.tasks[i].title;
    // moves a task from the tasks list to the finishedTasks list
    this.finishedTasks.push({ title: finishedTaskTitle, completed: true });
    // removes the task from the tasks list
    this.deleteTask(task, this.tasks);
    // updates the tasks and finished tasks in Firestore
    this.updateFirestore();
  };

    /**
   * Add the task to tasks list and remove the current task from the list of fishedTasks.
   */

  restoreTask = (task: Task) => {
    let i = this.finishedTasks.indexOf(task);
    let taskTitle = this.finishedTasks[i].title;
    // moves a task from the finishedTasks list to the tasks list
    this.tasks.push({ title: taskTitle, completed: false });
    // removes the task from the finishedTasks list
    this.deleteTask(task, this.finishedTasks);
    // updates the tasks and finished tasks in Firestore
    this.updateFirestore();
  };

      /**
   * Removes the current task from tasks or finishedTasks list.
   */

  deleteTask = (task: Task, currentTask: any) => {
    let i = currentTask.indexOf(task);
    if (i > -1) {
      // removes a task from a given list
      currentTask.splice(i, 1);
    }
    // updates the tasks and finished tasks in Firestore
    this.updateFirestore();
  };

/**
 * Fetches tasks and finished tasks from Firestore
 */

  downloadFirebase() {
    this.downloadTasks();
    this.downloadFinishedTasks();
  }

  /**
   * Update the tasks and finished tasks in Firestore.
   */
  async updateFirestore() {
    // Set the 'tasks' collection in Firestore to the current list of tasks
    await setDoc(doc(this.firestore, 'todolist', 'tasks'), {
      tasks: this.tasks,
    });

    // Set the 'finishedTasks' collection in Firestore to the current list of finished tasks
    await setDoc(doc(this.firestore, 'todolist', 'finishedTasks'), {
      finishedTasks: this.finishedTasks,
    });
  }

  async downloadTasks() {
    // Get a reference to the 'tasks' document in the 'todolist' collection
    const tasksRef = doc(this.firestore, 'todolist', 'tasks');
    // Get the snapshot of the 'tasks' document
    const tasksSnap = await getDoc(tasksRef);

    if (tasksSnap.exists()) {
      // If the 'tasks' document exists, update the tasks array with the tasks data from Firestore
      this.tasks = tasksSnap.data()['tasks'];
    } else {
      // If the 'tasks' document does not exist, log an error message to the console
      console.log('No such document!');
    }
  }

  async downloadFinishedTasks() {
    // Get a reference to the 'finishedTasks' document in the 'todolist' collection
    const finishedTaskRef = doc(this.firestore, 'todolist', 'finishedTasks');
    // Get the snapshot of the 'finishedTasks' document
    const finishedTaskSnap = await getDoc(finishedTaskRef);

    if (finishedTaskSnap.exists()) {
      // If the 'finishedTasks' document exists, update the finishedTasks array with the finished tasks data from Firestore
      this.finishedTasks = finishedTaskSnap.data()['finishedTasks'];
    } else {
      // If the 'finishedTasks' document does not exist, log an error message to the console
      console.log('No such document!');
    }
  }
}
