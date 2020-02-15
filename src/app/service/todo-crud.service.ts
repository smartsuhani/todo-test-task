import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoCrudService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiUrl = `${ environment.todo }`;
      this.httpClient.get(apiUrl).toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }

  create(todo: {title: string}): Promise<any> {
    return new Promise((resolve, reject) => {
      const apiUrl = `${ environment.todo }`;
      this.httpClient.post(apiUrl, todo).toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }

  complete(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.patch(url, { completed: true })
        .toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }

  delete(url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.delete(url)
        .toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }

  deleteCompleted(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const apiUrl = `${ environment.todo }/completed`;
      this.httpClient.delete(apiUrl)
        .toPromise()
        .then((response) => { resolve(response); })
        .catch((error) => {
          console.error('Error occurred : ', error);
          alert('Some Error Occurred');
          reject();
        });
    });
  }
}
