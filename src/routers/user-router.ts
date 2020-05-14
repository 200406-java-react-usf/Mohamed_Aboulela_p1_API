
import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middleware';


export const UserRouter = express.Router();

const userService = AppConfig.userService;


/**
 * 
 */
UserRouter.get('', adminGuard, async (req, resp) => {
    const id = +req.params.id;
    try {
        let payload = await userService.getUserById(id);
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(e.statusCode).json(e);
    }
});
/**
 * 
 */
UserRouter.post('', adminGuard, async (req, resp) => {

    console.log('USER POST REQUEST RECEIVED AT /users');
    console.log(req.body);
    try {
        let newUser = await userService.addNewUser(req.body);
        return resp.status(201).json(newUser).send();
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }
});

/**
 * 
 */
UserRouter.put('/:id', adminGuard, async (req, resp) => {
    const id = +req.params.id;

    console.log('USER UPDATE REQUEST RECEIVED AT /users');
    console.log(req.body);
    try {
        let status = await userService.updateUser(req.body);
        return resp.status(204).json(status).send();
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }
});

/**
 * 
 */
UserRouter.delete('/:id', adminGuard, async (req, resp) => {
    const id = +req.params.id;

    console.log('USER DELETE REQUEST RECEIVED AT /users');
    console.log(req.body);
    try {
        let status = await userService.deleteUserById(id);
        return resp.status(204).json(status).send();
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }
});