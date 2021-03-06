import {Reimbursements} from '../models/reimbursements';
import { PoolClient } from 'pg';
import { connectionPool } from '../index.js';
import { InternalServerError } from '../errors/errors.js';
import { mapReimbursementResultSet } from '../util/result-set-mapper.js';

export class ReimbursementRepository {

    async getAll(): Promise<Reimbursements[]> {

        let client: PoolClient;

        try{
            client = await connectionPool.connect();
            let sql = 'select * from reimbursements';
            let rs = await client.query(sql);
            return rs.rows.map(mapReimbursementResultSet);
        } catch(e){
            throw new InternalServerError('Server error happened when trying to get all reimbursements');
        } finally{
            client && client.release();
        }

    }

    async getById(id: number): Promise<Reimbursements>{

        let client: PoolClient;

        try{
            client = await connectionPool.connect();
            let sql = 'select * from reimbursements where reimb_id = $1';
            let rs = await client.query(sql, [id]);
            return mapReimbursementResultSet(rs.rows[0]);
        } catch (e){
            throw new InternalServerError('Server error happened when trying to get reimbursement by ID');
        } finally{
            client && client.release();
        }

    }

    async getByUniqueKey(key: string, val: string): Promise<Reimbursements> {

        let client: PoolClient;

        try{
            client = await connectionPool.connect();
            let sql = `select * from reimbursements where ${key} = $1`;
            let rs =  await client.query(sql, [val]);
            return mapReimbursementResultSet(rs.rows[0]); 
        } catch(e){
            throw new InternalServerError('Server error happened when trying to get reimbursements by unique key');
        } finally{
            client && client.release();
        }

    }

    async save(newReimbursment: Reimbursements): Promise<Boolean>{

        let client:PoolClient;

        let timeSubmitted = new Date();
        
        try{
            client = await connectionPool.connect();
            let sql = `
                insert into reimbursements (amount, submitted, resolved, description, author_id, resolver_id, reimb_status_id, reimb_type_id)
                values
                    ($1,$2,$3,$4,$5,$6,$7,$8)
            `;
            await client.query(sql, [
                newReimbursment.amount,
                timeSubmitted,
                null,
                newReimbursment.description,
                newReimbursment.authorId,
                null,
                1,
                newReimbursment.reimbTypeId
            ]);
            return true;
        } catch(e){
            throw new InternalServerError('Server error happened when trying to add new reimbursement');
        } finally{
            client && client.release();
        }

    }

    async update(updatedReimbursment: Reimbursements): Promise<boolean>{

        let client: PoolClient;

        try{
            client = await connectionPool.connect();
            let sql = `
                update reimbursements
                    set
                        amount = $2,
                        description = $3,
                        reimb_type_id = $4
                    where reimb_id = $1
            `;
            await client.query(sql, [updatedReimbursment.id, updatedReimbursment.amount, updatedReimbursment.description, updatedReimbursment.reimbTypeId]);
            return true;
        } catch(e){
            console.log(e);
            throw new InternalServerError('Server error happened when trying to update a reimbursement');
        } finally{
            client && client.release();
        }

    }

    async resolveReimbursement(updatedReimb: Reimbursements): Promise<boolean>{

        let client: PoolClient;

        let resolvedTime = new Date();

        try{
            client = await connectionPool.connect();
            let sql = `
                update reimbursements
                set
                    resolved = $2,
                    resolver_id = $3,
                    reimb_status_id = $4
                where reimb_id = $1
            `;
            await client.query(sql, [updatedReimb.id, resolvedTime, updatedReimb.resolverId, updatedReimb.reimbStatusId]);
            return true;
        } catch(e){
            throw new InternalServerError('Server error happened when resolving a reimb');
        }

    }

}