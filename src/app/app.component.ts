import { Component, OnInit } from '@angular/core';
import { TodoCrudService } from './service/todo-crud.service';
import { ITodoModel } from './model/todo.mdel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo';

  todoArr: ITodoModel[];

  constructor(private service: TodoCrudService) {

  }

  ngOnInit(): void {
    this.service.getAll()
      .then((response) => {
        this.todoArr = response;
      });
  }
}
