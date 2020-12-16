import Express from 'express';
import { OK } from 'http-status-codes';

const GenerateReportController = Express.Router();

const generateReportHandler = async (req, res) => {
  return res.sendStatus(200);
}

GenerateReportController.post('/reports/workload', generateReportHandler);

export default GenerateReportController;
