import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ListNoteComponent } from './list-note/list-note.component';
import { TextNoteComponent } from './text-note/text-note.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatCheckboxModule, MatInputModule, MatIconModule, 
    MatListModule, MatButtonModule, MatMenuModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TodoListComponent,
    ListNoteComponent,
    TextNoteComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'todo-list', component: TodoListComponent }
      ]),
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
