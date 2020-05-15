export class Reimbursement {
    reimId: number;
    amount: number;
    submitted: Date;
    resolved: Date;
    description: string;
    author: string;
    resolver: string;
    status: string;
    reimType: string;

    constructor(id: number, amnt: number, subm: Date, resolved: Date, desc: string, author: string, resolver: string, status: string, reimtype: string){
        this.reimId = id;
        this.amount = amnt;
        this.submitted = subm;
        this.resolved = resolved;
        this.description = desc;
        this.author = author;
        this.resolver = resolver;
        this.status = status;
        this.reimType = reimtype; 
    }
}