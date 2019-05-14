import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

    public lists: List[]; 

    newNote = "";

    makeNote(): void {
        console.log("Make note: " + this.newNote);
        this.addNote(this.newNote);

        this.newNote = "";
    }

    addNote(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.noteService.addNote({name} as List)
            .subscribe(item => {
                this.lists.push(item);
            })
    }

    deleteNote(list): void {
        console.log("Delete Note: " + list.name);
        this.noteService.delete(list).subscribe();
        let index = this.lists.indexOf(list);
        this.lists.splice(index, 1);
    }
    

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private noteService: NoteService) {
      http.get<List[]>(baseUrl + 'api/todo-list/').subscribe(result => {
          this.lists = result;
          console.log("Lists to display: ");
          console.log(this.lists);
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


