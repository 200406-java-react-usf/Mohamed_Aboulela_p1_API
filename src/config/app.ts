import { UserRepository } from "../repos/user-repo";
import { UserService } from "../services/user-service";
import { ReimbursementRepository } from "../repos/reimbursement-repo";
import { ReimbursementServices } from "../services/reimbursement-service";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

const reimbursementRepo = new ReimbursementRepository();
const reimbursementService = new ReimbursementServices(reimbursementRepo);

export default {
    userService,
    reimbursementService
}