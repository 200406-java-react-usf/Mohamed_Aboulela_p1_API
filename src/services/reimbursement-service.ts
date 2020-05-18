import { ReimbursementRepository } from "../repos/reimbursement-repo";
import { Reimbursements } from "../models/reimbursements";
import { ResourceNotFoundError, InvalidInputError, ResourceConflictError } from "../errors/errors";
import { isValidId, isEmptyObject, isPropertyOf, isValidString, isValidObject } from "../util/validator";

export class ReimbursementServices{

    constructor(private reimbursementRepo: ReimbursementRepository){

        this.reimbursementRepo = reimbursementRepo;

    }

    async getAllReimbursements(): Promise<Reimbursements[]>{

        let result = await this.reimbursementRepo.getAll();

        if(result.length === 0){
            throw new ResourceNotFoundError('No Reimbursments found in the database');
        }

        return result;

    }

    async getReimbursementById(id: number): Promise<Reimbursements>{

        if (!isValidId(id)){
            throw new InvalidInputError('Invalid ID was input.');
        }

        let result = await this.reimbursementRepo.getById(id);

        if (!isEmptyObject(result)){
            throw new ResourceNotFoundError('No reimbursment with that ID was found');
        }

        return result;

    }

    async getReimbursementByUniqueKey(queryObj: any): Promise<Reimbursements>{

        try{

            let queryKeys = Object.keys(queryObj);

            if(!queryKeys.every(key => isPropertyOf(key, Reimbursements))){
                throw new InvalidInputError('Key is not a property of a Reimbursments');
            }

            let key = queryKeys[0];
            let val = queryObj[key];

            if(key === 'id'){
                return await this.getReimbursementById(val);
            }

            if(!isValidString(val)){
                throw new InvalidInputError('Value is not a string');
            }

            let reimbursement = await this.reimbursementRepo.getByUniqueKey(key, val);

            if(!isEmptyObject(reimbursement)){
                throw new ResourceNotFoundError('No reimbursment found with given properties');
            }

            return reimbursement;

        } catch(e){
            throw e;
        }

    }

    async addNewReimbursement(newReimbursment: Reimbursements): Promise<boolean>{

        try{

            if(!isValidObject(newReimbursment, 'id', 'submitted', 'resolved', 'resolverId', 'reimbursementStatusId')){
                throw new InvalidInputError('Invalid Reimbursment was input')
            }

            if(!isValidId(newReimbursment.authorId)){
                throw new InvalidInputError('Invalid author ID was input');
            }


            if(!isValidId(newReimbursment.reimbTypeId)){
                throw new InvalidInputError('Invalid type ID was input');
            }

            await this.reimbursementRepo.save(newReimbursment);

            return true;

        } catch(e){
            throw e;
        }

    }

    async updateReimbursement(updatedReimbursement: Reimbursements): Promise<boolean>{

        try{

            if(!isValidObject(updatedReimbursement, 'id', 'submitted', 'resolved', 'resolverId') || !isValidId(updatedReimbursement.id)){
                throw new InvalidInputError('Invalid Reimbursment was input');
            }

            let reimbursementToUpdate = await this.getReimbursementById(updatedReimbursement.id);

            if(updatedReimbursement.reimbStatusId !== 1){
                throw new ResourceConflictError('Cannot update a non-pending Reimbursment');
            }

            if(updatedReimbursement.authorId !== reimbursementToUpdate.authorId){
                throw new ResourceConflictError('Cannot update author ID');
            }

            if(updatedReimbursement.resolved){
                throw new ResourceConflictError('Cannot update resolved time');
            }

            if(updatedReimbursement.resolverId){
                throw new ResourceConflictError('Cannot update resolver');
            }

            if(updatedReimbursement.submitted){
                throw new ResourceConflictError('Cannot update submitted time');
            }

            await this.reimbursementRepo.update(updatedReimbursement);

            return true;

        } catch(e){
            throw e;
        }

    }

    async resolveReimbursement(updatedReimbursement: Reimbursements): Promise<boolean>{

        try{

            if(!isValidObject(updatedReimbursement, 'id', 'resolved') || !isValidId(updatedReimbursement.id)){
                throw new InvalidInputError('Invalid Reimbursment was input');
            }

            let reimbursementToUpdate = await this.getReimbursementById(updatedReimbursement.id);

            await this.reimbursementRepo.resolveReimbursement(updatedReimbursement);

            return true;

        } catch(e){
            throw e;
        }

    }

}