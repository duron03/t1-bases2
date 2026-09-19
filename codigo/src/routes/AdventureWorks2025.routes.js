import { Router } from 'express';
import {
    getSingleEmployees,
    getSubcategoryProductsName,
    createPhoneNumberType,
    updatePhoneNumberType,
    deletePhoneNumberType
} from '../controllers/AdventureWorks2025.controller.js';

/**
 * Define los endpoints de AdventureWorks y delega el acceso a datos en los
 * controladores. Las rutas de actualización y eliminación reciben el ID en :id.
 */
const router = Router();

router.get('/getSingleEmployees', getSingleEmployees);

router.get('/getSubcategoryProductsName', getSubcategoryProductsName);

router.post('/createPhoneNumberType', createPhoneNumberType);

router.put('/updatePhoneNumberType/:id', updatePhoneNumberType);

router.delete('/deletePhoneNumberType/:id', deletePhoneNumberType);

export default router;
