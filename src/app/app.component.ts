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

  todoArr: ITodoModel[];
  todoInputVal: string;

  constructor(private service: TodoCrudService) {

  }

  ngOnInit(): void {
    this.service.getAll()
      .then((response) => {
        this.todoArr = response;
      });
  }

  onDelete(todo: ITodoModel) {

  }

  onComplete(todo: ITodoModel) {

  }

  onSubmit() {
    if (this.todoInputVal.trim()) {
      console.log('New to do ', this.todoInputVal);
      const todo = { title: this.todoInputVal, completed: false, isDelete: false };
      this.service.create(todo);
    }
  }
}
