
const AdmZip = require('adm-zip');



enum FileAction {
  create,
  open
}


class JnFile {
  private version: string;
  private path: string;
  private zip: any;


  constructor(path:string, title?:string, action?: FileAction) {

    var zip;
    if (action === FileAction.open) {
      /*
        1) create temp folder
        2) open zip file
        3) extract database to temp folder
        4)
      */
      var zip = new AdmZip(path);

    }
    else if ( action === FileAction.create ) {
      /*
        1) create temp folder
        2) create database in temp folder
        3)
      */


      //zip = new AdmZip();
      //zip.

      //this.create(path);
    }


  }


  public static load(path:string) : JnFile {


    return new JnFile(path);
  }

  public static create(path:string) : JnFile {

    return new JnFile(path);
  }

}
