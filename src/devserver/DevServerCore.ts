// import { Express, Request, Router, Response, NextFunction } from 'express'



import * as express from 'express';

import {NotebookStub} from '../notes/lib/NoteBookStub';



class DevServerCore {
    private Notebooks : Array<NotebookStub>;
    
    constructor() {

         
    }

    public getRouter() {
        var router = express.Router();

        router.get('/', this.home);
        router.get('/notebooks/get', this.getNotebooks);

        return router;
    }

    public home(req,res,next) {
        res.sendFile('./build/index.html');
        next();
    }

    public getNotes(req,res,next) {

    }

    public getNotebooks(req,res,next)
    {
        var notebooks : Array<NotebookStub> = new Array<NotebookStub>();
        notebooks.push( new NotebookStub( "Notebook3", "1", "Notebook1Path" ) );
        notebooks.push( new NotebookStub( "Notebook3", "2", "Notebook2Path" ) );
        notebooks.push( new NotebookStub( "Notebook3", "3", "Notebook3Path" ) );
        
        res.render( JSON.stringify(notebooks) );
        next();
    }

}