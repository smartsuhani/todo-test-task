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
        this.todoArrBkup = response;
        this.todoArr = this.todoArrBkup;
      });
  }

  onDelete(todo: ITodoModel) {

  }

  onComplete(todo: ITodoModel) {

  }

  onSubmit() {
    if (this.todoInputVal.trim()) {
      this.service.create({ title: this.todoInputVal })
        .then((response) => {
          this.todoArrBkup.push(response);
          this.todoArr = this.todoArrBkup;
        });
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
    return this.todoArrBkup.filter((todo: ITodoModel) => {
      return todo.completed === completedFlag;
    });
  }
}
