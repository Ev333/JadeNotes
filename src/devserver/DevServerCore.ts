// import { Express, Request, Router, Response, NextFunction } from 'express'

import * as express from 'express';
import * as path from 'path';

import {NotebookStub} from '../lib/NoteBookStub';

export class DevServerCore {
    private Notebooks : Array<NotebookStub>;
    
    constructor() {

         
    }

    public getRouter() {
        var router = express.Router();

        router.get('/', this.home);
        
        router.get('/notebooks', this.getNotebooks);
        router.put('/notebooks', this.putNotebooks);
        router.patch('/notebooks/:id', this.patchNotebooks);

        return router;
    }

    public home(req,res,next) {
        var file = path.join(__dirname, 'build', 'index.html');
        res.sendFile(file);
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

    public putNotebooks(req,res,next) {
        next();
    }

    public patchNotebooks(req,res,next) {
        next();
    }

}