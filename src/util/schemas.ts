/**
 * 
 */
export interface UserSchema {
    ers_user_id: number,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    role: string
}

/**
 * 
 */
export interface ReimbursementSchema {
    id: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;
    author: number;
    resolver: number;
    reimb_status_id: string;
    reimb_type_id: string;
}