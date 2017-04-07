
// import {NotebookStub}           from 'lib/NotebookStub';

// import {Injectable, NgZone}     from '@angular/core';
// import {Observable}             from 'rxjs/Observable';
// import {Observer}               from 'rxjs/Observer';
// import 'rxjs/add/operator/map';

// const ipc = require('electron').ipcRenderer;


// @Injectable()
// export class SettingService {

//   public ready: boolean = false;

//   //public mgr : iSettingsManager;

//   public notebooks : NotebookStub[];

//   public notebooks$ : Observable<NotebookStub[]>;
//   private notebookObserver : Observer<NotebookStub[]>;

//   constructor(private zone: NgZone) {
//     console.log('SettingService: constructor');

//     this.notebooks$ = new Observable<NotebookStub[]>(
//       observer =>
//           this.notebookObserver = observer
//       ).map( data => {
//         return data;
//       });

//     this.notebooks$.subscribe(
//       notebooks => console.log('initial subscription'),
//       error => console.log(error)
//     );

//     ipc.on('UpdatedNotebooks', (event, data : Array<NotebookStub> ) => {
//       console.log(`SettingService - UpdateNotebooks`);
//       //this.notebooks = data;
//       //this.zone.run(() => {
//         //ng has no native awareness of electron Ipcs, so we have to
//         //run this code in a zone
//         this.notebookObserver.next(data);
//       //});
//     });
//   }

//   //public onInit() {}

//   public AddExistingNotebook( stub : NotebookStub ) {
//     console.log('SettingService: AddExistingNotebook()');
//   }

//   public CreateNewNotebook( stub : NotebookStub ) {
//     console.log('SettingService: CreateNewNotebook');
//     ipc.send('NewNotebook', stub);
//   }

//   public DeleteNotebook( title : string ) {
//     console.log('SettingService: DeleteNotebook');
//     ipc.send('DeleteNotebook', title);
//   }

//   public Destroy() {
//       console.log('SettingsManagerDesktop: destroy()');
//       ipc.removeAllListeners();
//   }

//   public RefreshNotebooks() {
//       console.log('SettingService: RefreshNotebooks');
//       ipc.send('GetNotebooks', {}, function() {
//         console.log('sent GetNotebooks IPC call');
//       });
//   }

// /*  private getStubs() : Array<NotebookStub> {
//     console.log('SettingsManagerDesktop: getStubs()');
//     return [  new NotebookStub('notebook1', 'path1'),
//               new NotebookStub('notebook2', 'path2'),
//               new NotebookStub('notebook3', 'path3') ];
//   }*/

// }
