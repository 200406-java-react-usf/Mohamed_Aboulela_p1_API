
import { Request, Response } from "express";
import { AuthenticationError, AuthorizationError } from "../errors/errors";

export const adminGuard = (request: Request, response: Response, next) => {
    if(!request.session.principal) {
        response.status(401).json(new AuthenticationError('No session found! Please provide valid login information.'));
    } else if(request.session.principal.role_name === 'Admin' ) {
        next();
    } else {
        response.status(403).json(new AuthorizationError());
    }
}

export const managerGuard = (req: Request, resp: Response, next) => {

    if (!req.session.principal) {
        resp.status(401).json(new AuthenticationError('No session found! Please login.'));
    } else if (req.session.principal.role === 'finance manager') {
        next();
    } else {
        resp.status(403).json(new AuthorizationError());
    }

}

export const UserGuard = (request: Request, response: Response, next) => {
    if(!request.session.principal) {
        response.status(401).json(new AuthenticationError('No session found! Please provide valid login information.'));
    } else if(request.session.principal.role_name === 'Admin' || request.session.principal.role_name === 'Staff') {
        next();
    } else {
        response.status(403).json(new AuthorizationError());
    }
};