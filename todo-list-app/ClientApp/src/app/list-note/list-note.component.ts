import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ListItemService } from '../list-item.service';
import { Event } from '../../../node_modules/@angular/router';
import { TagContentType } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.css'],
})
export class ListNoteComponent implements OnInit {

    @Input() list: List;
    @Output() noteDeleted = new EventEmitter();
  
    public todoList: TodoItem[];
    value = "";

    changeColor(): void {
        console.log("change color");
    }

    deleteNote(): void {
        console.log("Delete Note Items: " + this.list.name);

        //Loop through todoList and remove associated items
        for (let item of this.todoList) {
            if (item.listId == this.list.id) {
                console.log("removed: " + item.name);
                this.listItemService.delete(item).subscribe();
            }
        }

        //Emit value change for deleting note
        //This notifies the todo-list component to delete this list
        this.noteDeleted.emit(this.list);

    }

    deleteItem(item: TodoItem):void {
        this.listItemService.delete(item).subscribe();
        let index = this.todoList.indexOf(item);
        this.todoList.splice(index, 1);
    }
  
    keyDownFunction(event) {
        if (event.keyCode == 13) {
            console.log("you hit enter");
            console.log("Form value: " + this.value );
            console.log("Note List: " + this.list.id);

            this.addItem(this.value, this.list.id, false);
            this.value = "";

        }
    }

    addItem(name: string, listId: number, isComplete: boolean): void {
        name = name.trim();
        if (!name) { return; }
        this.listItemService.addItem({name, listId, isComplete} as TodoItem)
            .subscribe(item => {
                this.todoList.push(item);
            })
    }

    updateCompletion(e):void {
        console.log(e);

        let updateItem;

        for (let item of this.todoList) {
            if (item.id == e.source.id) {
                updateItem = item;
            }
        }

        updateItem.isComplete = !updateItem.isComplete;

        this.listItemService.updateCompletion(updateItem)
            .subscribe(item => {
                
            })
    }
    

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private listItemService: ListItemService) {
      http.get<TodoItem[]>(baseUrl + 'api/todo/').subscribe(result => {
          this.todoList = result;
          console.log(this.todoList);
      }, error => console.error(error));
    }

    ngOnInit() {
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
}


