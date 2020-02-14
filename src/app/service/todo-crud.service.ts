import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodoModel } from '../model/todo.mdel';

@Injectable({
  providedIn: 'root'
})
export class TodoCrudService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiUrl = `assets/data/list-todo.json`;
      this.httpClient.get(apiUrl).toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }

  create(todo: ITodoModel): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiUrl = ``;
      this.httpClient.post(apiUrl, todo).toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }
}