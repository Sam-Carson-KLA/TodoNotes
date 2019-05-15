import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

    private noteUrl = 'api/todo-list';

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    constructor(private http: HttpClient) { }


    addNote(note: List): Observable<List> {
        console.log(note);

        return this.http.post<List>(this.noteUrl, note, this.httpOptions).pipe(
          catchError(this.handleError<any>('addNote'))
        );
    }

    delete(list: List | number): Observable<List> {
        const id = typeof list === 'number' ? list : list.id;
        const url = `${this.noteUrl}/${id}`;

        return this.http.delete<List>(url, this.httpOptions).pipe(
          catchError(this.handleError<List>('delete'))  
        );
    }

    update (list: List | number): Observable<List> {
      const id = typeof list === 'number' ? list : list.id;
      const url = `${this.noteUrl}/${id}`;

      return this.http.put(url, list, this.httpOptions).pipe(
        catchError(this.handleError<any>('update'))
      );
    }

    //updateCompletion(item: TodoItem): Observable<TodoItem> {
    //    return this.http.put(this.todoUrl + "/" + item.id, item, this.httpOptions).pipe(
    //        catchError(this.handleError<any>('updateCompletion'))
    //    );
    //}

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

interface List {
    id: number;
    name: string;
    colorHex: string;
}
