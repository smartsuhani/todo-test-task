import { Component, OnInit } from '@angular/core';
import { TodoCrudService } from './service/todo-crud.service';
import { ITodoModel } from './model/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo';

  // -- this holds all the todos, after filteration need original copy of todos
  todoArrBkup: ITodoModel[];
  // -- this holds todos selected by user like active, completed
  todoArr: ITodoModel[];
  todoInputVal: string;
  possibleStates = { all: 'all', active: 'active', completed: 'completed' };
  activeState = this.possibleStates.all;

  constructor(private service: TodoCrudService) {

  }

  ngOnInit(): void {
    this.service.getAll()
      .then((response) => {
        this.todoArrBkup = response;
        this.todoArr = this.todoArrBkup;
      });
  }

  onDelete(todo: ITodoModel) {

  }

  onComplete(todo: ITodoModel) {
    this.service.complete(todo.url)
      .then(r => {
        // -- update in local copy
        // tslint:disable-next-line:variable-name
        this.todoArrBkup.forEach((_todo) => {
          // tslint:disable-next-line:no-unused-expression
          _todo.url === todo.url ? todo.completed = !todo.completed : '';
        });
        // -- reload the state
        this.reloadActiveState();
      });
  }

  onSubmit() {
    if (this.todoInputVal.trim()) {
      this.service.create({ title: this.todoInputVal })
        .then((response) => {
          this.todoArrBkup.push(response);
          this.todoArr = this.todoArrBkup;
          this.todoInputVal = null; // empty text box once submitted successfully
        });
    }
  }

  onAllClick() {
    this.todoArr = this.todoArrBkup;
  }

  onActiveClick() {
    this.todoArr = this.filterTodo(false);
    // -- update active state
    this.activeState = this.possibleStates.active;
  }

  onCompletedClick() {
    this.todoArr = this.filterTodo(true);
    // -- update active state
    this.activeState = this.possibleStates.completed;
  }

  private filterTodo(completedFlag: boolean): ITodoModel[] {
    if (!(this.todoArrBkup && this.todoArrBkup.length)) {
      return [];
    }
    return this.todoArrBkup.filter((todo: ITodoModel) => {
      return todo.completed === completedFlag;
    });
  }

  reloadActiveState() {
    if (this.activeState === this.possibleStates.all) {
      this.todoArr = this.todoArrBkup;
    } else if (this.activeState === this.possibleStates.active) {
      this.todoArr = this.filterTodo(false);
    } else if (this.activeState === this.possibleStates.completed) {
      this.todoArr = this.filterTodo(true);
    }
  }
}
