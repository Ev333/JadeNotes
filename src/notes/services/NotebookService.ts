import { Notebook } from 'jadenotes/lib/notebook';
import { NotebookStub  } from 'jadenotes/lib/Notebook';
import { Note  } from 'jadenotes/lib/Note';


import {Injectable} from '@angular/core';
//import {HTTP_PROVIDERS} from '@angular/http';

//const ipc = require('electron').ipcRenderer;

@Injectable()
export class NotebookService {

  public currentNotebook: NotebookStub;

  constructor() {
    
  }

  

  public getNote( noteId: string ) {
    let notes : Array<Note>; 
  }

  public getChildren( noteId: string ) {
    
  }


}
