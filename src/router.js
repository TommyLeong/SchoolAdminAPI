import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import RegistrationController from './controllers/RegistrationController';
import GenerateReportController from './controllers/GenerateReportController';

const router = Express.Router();

router.use('/', HealthcheckController);
router.use('/', RegistrationController);
router.use('/', GenerateReportController);

export default router;
