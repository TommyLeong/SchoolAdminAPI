import Express from 'express';
import { OK } from 'http-status-codes';

const RegistrationController = Express.Router();

const registrationHandler = async (req, res) => {
  var body = req.body;
  console.log(body);
  return res.sendStatus(200);
}

RegistrationController.post('/register', registrationHandler);

export default RegistrationController;
