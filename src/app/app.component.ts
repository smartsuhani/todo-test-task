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

  constructor(private service: TodoCrudService) {

  }

  ngOnInit(): void {
    this.service.getAll()
      .then((response) => {
        this.todoArr = response;
        this.todoArrBkup = response;
      });
  }

  onDelete(todo: ITodoModel) {

  }

  onComplete(todo: ITodoModel) {

  }

  onSubmit() {
    if (this.todoInputVal.trim()) {
      const todo = { title: this.todoInputVal, completed: false, isDelete: false };
      this.service.create(todo);
    }
  }

  onAllClick() {
    this.todoArr = this.todoArrBkup;
  }

  onActiveClick() {
    this.todoArr = this.filterTodo(false);
  }

  onCompletedClick() {
    this.todoArr = this.filterTodo(true);
  }

  private filterTodo(completedFlag: boolean): ITodoModel[] {
    if (!(this.todoArrBkup && this.todoArrBkup.length)) {
      return [];
    }
    const todos = this.todoArrBkup.filter((todo: ITodoModel) => {
        return todo.completed === completedFlag;
      });
    return todos;
  }
}
