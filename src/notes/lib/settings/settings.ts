///<reference path="../../../../typings/main/ambient/electron-json-storage/index.d.ts" />

import {Notebook, NotebookStub} from '../../lib/notebook';


interface iSettingsAdapter {
  getNotebooks() : Array<Notebook>; //getNotebooks
  //getNotebookByName(name:string) : Notebook;
  //getNotebookById(id:string) : Notebook;
  //removeNotebook(id: string);
  //removeAllNotebooks();
}

class SettingsManagerElectron implements iSettingsAdapter {
  //private settings

  constructor() {

  }

  public getNotebooks() : Array<Notebook> {
    //electron-json-storage.
    return null;
  }

}
