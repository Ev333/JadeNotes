import {NotebookStub} from '../lib/notebook';

import {Injectable}     from '@angular/core';




@Injectable()
export class StateService {

  public currentState : StatesEnum;

  public setState( newState : StatesEnum) {
    this.currentState = newState;
  }
}

export enum StatesEnum {
  ShelfState,
  HtmlEditorState
}
