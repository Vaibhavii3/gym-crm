import express from 'express';

import { 
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    getActiveClients,
    getUpComing
} from '../controllers/clientController.js'

const router = express.Router();

router.post('/createClient', createClient);
router.get('/getClients', getClients);
router.get('/active', getActiveClients);
router.get("/upcoming", getUpComing);
router.get('/:id', getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;

