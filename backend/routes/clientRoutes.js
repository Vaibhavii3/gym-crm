import express from 'express';

import { 
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    getActiveClients,
    getUpComingBirthdays,
    getUpcomingMembershipDue,
    getClientsWithDuePayments,
    getClientByMembershipType,
    getMonthlyJoinings,
    getMonthlyRevenue,
    markClientAsPaid
} from '../controllers/clientController.js';

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post('/createClient', createClient);
router.get('/getClients', getClients);
router.get('/active', getActiveClients);
router.get('/birthday', getUpComingBirthdays);
router.get('/due-memberships', getUpcomingMembershipDue);
router.get('/due-payment', getClientsWithDuePayments);
router.get('/group', getClientByMembershipType);
router.get('/joining', getMonthlyJoinings);
router.get('/revenue', getMonthlyRevenue);
router.get('/:id', getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
// router.patch("/:id/mark-paid", markClientAsPaid);
router.put("/mark-paid/:id", markClientAsPaid);

export default router;

