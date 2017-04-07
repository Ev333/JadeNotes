// import { Express, Request, Router, Response, NextFunction } from 'express'

import * as express from 'express';
import * as path from 'path';


import {NotebookStub} from 'lib/notebook';

export class DevServerCore {
    private notebooks : NotebookStub[];
    private basePath : string

    constructor(private path:string) {
        this.notebooks = new Array<NotebookStub>();
        this.basePath = path;         
    }

    public home(req,res,next) {
        var filePath = path.join(this.basePath, 'build', 'index.html');
        console.log(filePath);
        res.sendFile(filePath);
        next();
    }

    public getNotes = (req,res,next) => {

    }

    public getNotebooks = (req,res,next) => 
    {
        var notebooks : Array<NotebookStub> = new Array<NotebookStub>();
        this.notebooks.push( new NotebookStub( "Notebook3", "1", "Notebook1Path" ) );
        notebooks.push( new NotebookStub( "Notebook3", "2", "Notebook2Path" ) );
        notebooks.push( new NotebookStub( "Notebook3", "3", "Notebook3Path" ) );
        
        res.render( JSON.stringify(notebooks) );
        next();
    }

    public putNotebooks = (req,res,next) => {
        next();
    }

    public patchNotebooks = (req,res,next) => {
        next();
    }

}