import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListItemService {

    private todoUrl = 'api/todo';

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    constructor(private http: HttpClient) { }


    addItem(item: TodoItem): Observable<TodoItem> {
        console.log(item);

        return this.http.post<TodoItem>(this.todoUrl, item, this.httpOptions).pipe(
          catchError(this.handleError<any>('addItem'))
        );
    }

    updateCompletion(item: TodoItem): Observable<TodoItem> {
        return this.http.put(this.todoUrl + "/" + item.id, item, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateCompletion'))
        );
    }

    delete(item: TodoItem | number): Observable<TodoItem> {
        const id = typeof item === 'number' ? item : item.id;
        const url = `${this.todoUrl}/${id}`;

        return this.http.delete<TodoItem>(url, this.httpOptions).pipe(
          catchError(this.handleError<TodoItem>('delete'))  
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        console.error(error); // log to console 
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

}


interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
  listId: number;
}
