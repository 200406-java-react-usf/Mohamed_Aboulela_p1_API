import express from 'express';
import appConfig from '../config/app';
import { financialManagerGaurd } from '../middleware/fm-middleware';

export const ReimbursementRouter = express.Router();

const reimbursementService = appConfig.reimbursementService;

ReimbursementRouter.get('',financialManagerGaurd, async (req, resp) =>{

    try{
        let pl = await reimbursementService.getAllReimbursements();
        resp.status(200).json(pl);
    } catch(e){
        resp.status(e.statusCode).json(e);
    }

});

ReimbursementRouter.get('/id/:id', financialManagerGaurd, async (req, resp) => {

    let id = +req.params.id;

    try{
        let pl = await reimbursementService.getReimbursementById(id);
        resp.status(200).json(pl);
    } catch(e){
        resp.status(e.statusCode).json(e);
    }

})

ReimbursementRouter.post('', async (req, resp) => {

    try{
        let pl = await reimbursementService.addNewReimbursement(req.body);
        resp.status(201).json(pl);
    } catch(e){
        resp.status(e.statusCode).json(e);
    }

});

ReimbursementRouter.put('', async (req, resp) => {

    try{
        let pl = await reimbursementService.updateReimbursement(req.body);
        resp.status(204).json(pl);
    } catch(e){
        resp.status(e.statusCode).json(e);
    }

});

ReimbursementRouter.put('/resolve', financialManagerGaurd, async (req, resp) => {

    try{
        let pl = await reimbursementService.resolveReimbursement(req.body);
        resp.status(204).json(pl);
    } catch(e){
        resp.status(e.statusCode).json(e);
    }

});
