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
    getClientsWithDuePayments
} from '../controllers/clientController.js'

const router = express.Router();

router.post('/createClient', createClient);
router.get('/getClients', getClients);
router.get('/active', getActiveClients);
router.get('/birthday', getUpComingBirthdays);
router.get('/due-memberships', getUpcomingMembershipDue);
router.get('/due-payment', getClientsWithDuePayments);
router.get('/:id', getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;

