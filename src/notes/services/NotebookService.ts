import { Notebook } from '../../lib/notebook';
import { NotebookStub  } from '../../lib/NotebookStub';
import { Note  } from '../../lib/Note';


import {Injectable} from '@angular/core';
//import {HTTP_PROVIDERS} from '@angulars/http';

const ipc = require('electron').ipcRenderer;


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
