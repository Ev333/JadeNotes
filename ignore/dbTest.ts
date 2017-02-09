
import { Note, ContentType } from './note';
import { DbManager } from './database';

function dbTest1() {
  var db = new DbManager( 'C:/Users/Evan/db', 'db1.jdb', true );

  console.log('dbmanager created');
  var list1 : Array<Note> = new Array<Note>();

  var concepts : Note = new Note( 'Concept', ContentType.HTML, 'My Concepts', null ),
      characters : Note = new Note( 'Characters', ContentType.HTML, 'My Concepts', null ),
      story : Note = new Note( 'Story', ContentType.HTML, 'My Concepts', null ),
      john : Note = new Note( 'John', ContentType.HTML, 'Info about John', characters.id ),
      sue : Note = new Note('Sue', ContentType.HTML, 'Info about Sue', characters.id);

  console.log('notes created');


  db.addNote(concepts);
  db.addNote(characters);
  db.addNote(story);
  db.addNote(john);
  db.addNote(sue);

  console.log('notes added');

}

dbTest1();
